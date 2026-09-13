import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useUiStore } from "../../../store/uiStore";
import { useAlertsStore } from "../../../store/alertsStore";
import { NAV_TREE, searchNav, type NavItem } from "./navTree";
import { TABULAR_CLASS } from "../../../design/tokens";

const SIDEBAR_WIDTH = "w-56"; // 224px — compact by design (mockup target)

/**
 * AppShell navigation sidebar (R2).
 *
 * - Categorized tree over every route (navTree.ts is the source of truth).
 * - Live filter box (keyboard: "/" focuses it, Escape clears).
 * - Collapsible categories, persisted in uiStore.
 * - Collapses to an icon rail (absorbs the old IconRail).
 * - Full keyboard navigation: ArrowUp/Down move focus, Enter navigates.
 */
export function AppShellSidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const collapsedCategories = useUiStore((s) => s.collapsedNavCategories);
  const toggleNavCategory = useUiStore((s) => s.toggleNavCategory);
  const setSidebarCollapsed = useUiStore((s) => s.setSidebarCollapsed);
  const unreadCount = useAlertsStore((s) => s.unreadCount);

  const location = useLocation();
  const [filter, setFilter] = useState("");
  const filterRef = useRef<HTMLInputElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const activePath = location.pathname;
  const filtering = filter.trim().length > 0;

  const categories = useMemo(() => {
    if (!filtering) return NAV_TREE;
    const needle = filter.trim();
    return NAV_TREE.map((category) => ({
      ...category,
      groups: category.groups
        .map((group) => ({ ...group, items: group.items.filter((item) => searchNav(needle).some((m) => m.id === item.id)) }))
        .filter((group) => group.items.length > 0),
    })).filter((category) => category.groups.length > 0);
  }, [filter, filtering]);

  // Auto-expand the category containing the active route (when not filtered).
  useEffect(() => {
    if (filtering || collapsed) return;
    const owning = NAV_TREE.find((category) =>
      category.groups.some((group) => group.items.some((item) => item.to === activePath)),
    );
    if (owning && collapsedCategories[owning.id]) {
      toggleNavCategory(owning.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on route change
  }, [activePath]);

  // "/" focuses the filter from anywhere in the sidebar.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        if (!collapsed) {
          event.preventDefault();
          filterRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [collapsed]);

  const flatItems = useMemo(
    () => categories.flatMap((category) => category.groups.flatMap((group) => group.items)),
    [categories],
  );

  const focusIndex = (index: number) => {
    if (!flatItems.length) return;
    const bounded = ((index % flatItems.length) + flatItems.length) % flatItems.length;
    linkRefs.current[bounded]?.focus();
  };

  const onTreeKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const focusedIndex = linkRefs.current.findIndex((el) => el === document.activeElement);
    if (focusedIndex < 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusIndex(focusedIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusIndex(focusedIndex - 1);
    }
  };

  // ------------------------------------------------------------------
  // Collapsed icon-rail mode (absorbs IconRail)
  // ------------------------------------------------------------------
  if (collapsed) {
    const activeCategory = NAV_TREE.find((category) =>
      category.groups.some((group) => group.items.some((item) => item.to === activePath)),
    );
    return (
      <nav
        aria-label="Primary navigation (collapsed)"
        className="flex h-full w-12 shrink-0 flex-col items-center gap-1 border-r border-terminal-border bg-terminal-panel py-2"
      >
        {NAV_TREE.map((category) => {
          const first = category.groups[0]?.items[0];
          if (!first) return null;
          const isActive = category.id === activeCategory?.id;
          return (
            <NavLink
              key={category.id}
              to={first.to}
              title={category.label}
              aria-label={category.label}
              className={`flex h-8 w-8 items-center justify-center rounded-sm border text-[10px] font-semibold ${
                isActive
                  ? "border-terminal-accent bg-terminal-accent/10 text-terminal-accent"
                  : "border-transparent text-terminal-muted hover:border-terminal-border hover:text-terminal-text"
              }`}
            >
              {category.glyph}
            </NavLink>
          );
        })}
        <button
          type="button"
          onClick={() => setSidebarCollapsed(false)}
          aria-label="Expand navigation sidebar"
          title="Expand sidebar"
          className="mt-auto flex h-8 w-8 items-center justify-center rounded-sm border border-terminal-border text-[11px] text-terminal-muted hover:border-terminal-accent/50 hover:text-terminal-text"
        >
          »
        </button>
      </nav>
    );
  }

  // ------------------------------------------------------------------
  // Full tree
  // ------------------------------------------------------------------
  let linkIndex = 0;

  return (
    <nav
      aria-label="Primary navigation"
      className={`${SIDEBAR_WIDTH} flex h-full shrink-0 flex-col border-r border-terminal-border bg-terminal-panel`}
    >
      <div className="flex items-center gap-1 border-b border-terminal-border px-2 py-1.5">
        <input
          ref={filterRef}
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setFilter("");
          }}
          placeholder="Filter…  /"
          aria-label="Filter navigation"
          className="h-6 w-full rounded-sm border border-terminal-border bg-terminal-bg px-2 text-[11px] text-terminal-text outline-none placeholder:text-terminal-muted/70 focus:border-terminal-accent"
        />
        <button
          type="button"
          onClick={() => setSidebarCollapsed(true)}
          aria-label="Collapse navigation sidebar"
          title="Collapse sidebar (Ctrl+B)"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-terminal-border text-[11px] text-terminal-muted hover:border-terminal-accent/50 hover:text-terminal-text"
        >
          «
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto py-1" onKeyDown={onTreeKeyDown}>
        {categories.length === 0 ? (
          <p className="px-3 py-2 text-[10px] text-terminal-muted" role="status">
            No pages match “{filter.trim()}”.
          </p>
        ) : (
          categories.map((category) => {
            const isCollapsed = Boolean(collapsedCategories[category.id]) && !filtering;
            return (
              <section key={category.id} aria-label={category.label}>
                <button
                  type="button"
                  onClick={() => toggleNavCategory(category.id)}
                  aria-expanded={!isCollapsed}
                  className="flex w-full items-center gap-1 px-2 py-1 text-left text-[9px] font-semibold uppercase tracking-[0.14em] text-terminal-muted/90 hover:text-terminal-text"
                >
                  <span aria-hidden="true" className={`transition-transform ${isCollapsed ? "" : "rotate-90"}`}>
                    ▸
                  </span>
                  {category.label}
                </button>
                {isCollapsed
                  ? null
                  : category.groups.map((group) => (
                      <div key={group.id}>
                        <div className="px-3 pt-1 pb-0.5 text-[9px] uppercase tracking-wide text-terminal-muted/60">
                          {group.label}
                        </div>
                        <ul>
                          {group.items.map((item: NavItem) => {
                            const idx = linkIndex++;
                            const showBadge = item.id === "alerts" && unreadCount > 0;
                            return (
                              <li key={item.id}>
                                <NavLink
                                  to={item.to}
                                  ref={(el) => {
                                    linkRefs.current[idx] = el;
                                  }}
                                  className={({ isActive }) =>
                                    `flex items-center gap-2 border-l-2 py-[var(--ot-density-pad-y)] pl-2.5 pr-2 text-[11px] ${
                                      isActive
                                        ? "border-terminal-accent bg-terminal-accent/10 text-terminal-text"
                                        : "border-transparent text-terminal-muted hover:border-terminal-border hover:bg-terminal-panel-hover hover:text-terminal-text"
                                    }`
                                  }
                                >
                                  <span className="truncate">{item.label}</span>
                                  {showBadge ? (
                                    <span
                                      className={`ml-auto rounded-full bg-terminal-accent/20 px-1.5 text-[9px] text-terminal-accent ${TABULAR_CLASS}`}
                                      aria-label={`${unreadCount} unread alerts`}
                                    >
                                      {unreadCount}
                                    </span>
                                  ) : item.hint ? (
                                    <span className="ml-auto shrink-0 text-[9px] text-terminal-muted/60">{item.hint}</span>
                                  ) : null}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
              </section>
            );
          })
        )}
      </div>
    </nav>
  );
}
