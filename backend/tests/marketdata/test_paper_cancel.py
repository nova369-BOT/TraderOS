"""Paper order cancellation route — ownership, state transitions, errors."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from backend.api.deps import get_db
from backend.api.routes.paper import router as paper_router
from backend.auth.deps import get_current_user
from backend.models import VirtualOrder, VirtualOrderStatus, VirtualPortfolio
from backend.shared.db import Base


def _build_app() -> tuple[TestClient, sessionmaker]:
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    app = FastAPI()
    app.include_router(paper_router, prefix="/api")

    def _db_override():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = _db_override

    current_user = {"id": "u_owner"}

    def _user_override():
        return type("FakeUser", (), current_user)()

    app.dependency_overrides[get_current_user] = _user_override
    return TestClient(app), SessionLocal


def _seed(SessionLocal, *, status: str = "pending", user_id: str = "u_owner") -> str:
    db = SessionLocal()
    try:
        portfolio = VirtualPortfolio(
            user_id=user_id, name="Book", initial_capital=100000.0, current_cash=100000.0
        )
        db.add(portfolio)
        db.commit()
        db.refresh(portfolio)
        order = VirtualOrder(
            portfolio_id=portfolio.id,
            symbol="NSE:RELIANCE",
            side="buy",
            order_type="market",
            quantity=10,
            status=status,
            slippage_bps=5.0,
            commission=0.0,
        )
        db.add(order)
        db.commit()
        db.refresh(order)
        return str(order.id)
    finally:
        db.close()


def test_cancel_pending_order() -> None:
    client, SessionLocal = _build_app()
    order_id = _seed(SessionLocal)
    resp = client.delete(f"/api/paper/orders/{order_id}")
    assert resp.status_code == 200
    payload = resp.json()
    assert payload["status"] == "cancelled"
    assert payload["symbol"] == "NSE:RELIANCE"


def test_cancel_twice_conflicts() -> None:
    client, SessionLocal = _build_app()
    order_id = _seed(SessionLocal)
    assert client.delete(f"/api/paper/orders/{order_id}").status_code == 200
    resp = client.delete(f"/api/paper/orders/{order_id}")
    assert resp.status_code == 409
    assert "already cancelled" in resp.json()["detail"]


def test_cancel_unknown_order_404() -> None:
    client, _ = _build_app()
    resp = client.delete("/api/paper/orders/does-not-exist")
    assert resp.status_code == 404


def test_cancel_rejects_foreign_users_order() -> None:
    client, SessionLocal = _build_app()
    order_id = _seed(SessionLocal, user_id="u_somebody_else")
    resp = client.delete(f"/api/paper/orders/{order_id}")
    assert resp.status_code == 404


def test_cancel_rejects_terminal_states() -> None:
    for terminal in (VirtualOrderStatus.FILLED.value, VirtualOrderStatus.CANCELLED.value, VirtualOrderStatus.REJECTED.value):
        client, SessionLocal = _build_app()
        order_id = _seed(SessionLocal, status=terminal)
        resp = client.delete(f"/api/paper/orders/{order_id}")
        assert resp.status_code == 409
