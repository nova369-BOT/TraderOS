#!/usr/bin/env bash
# One-shot preview (re)builder for the sandbox environment.
# Restores everything the sandbox snapshot wipes between sessions:
# python venv, node_modules, .env, sqlite db + admin, and frontend/dist.
# Usage: bash scripts/preview-rebuild.sh
set -e
cd "$(dirname "$0")/.."

VENV=/tmp/tosvenv
echo "==> [1/4] Backend venv + deps"
if [ ! -x "$VENV/bin/python" ]; then
  python3 -m venv "$VENV"
  "$VENV/bin/pip" -q install --upgrade pip
fi
"$VENV/bin/pip" -q install -r backend/requirements.txt

echo "==> [2/4] Env file"
if [ ! -f .env ]; then
  SECRET=$(head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n')
  printf 'JWT_SECRET_KEY=%s\nBOOTSTRAP_ADMIN_EMAIL=admin@tradeos.local\nBOOTSTRAP_ADMIN_PASSWORD=tradeos-demo\n' "$SECRET" > .env
  echo "    .env created (admin: admin@tradeos.local / tradeos-demo)"
fi

echo "==> [3/4] Frontend install + build"
cd frontend
[ -d node_modules ] || npm ci --no-audit --no-fund
npm run build
cd ..

echo "==> [4/4] DB migrations + admin seed"
export PATH="$VENV/bin:$PATH"
alembic -c backend/alembic.ini upgrade head
"$VENV/bin/python" scripts/seed_admin.py || true

echo "DONE — start server with:"
echo "  PATH=$VENV/bin:\$PATH SKIP_MIGRATIONS=1 sh backend/entrypoint.sh"
