# Changelog

All notable changes to TradeOS are documented in this file.

## [Unreleased]

### Changed

- **Rebranded from OpenTerminalUI to TradeOS** — full rename of code, assets,
  docs, and configs:
  - Brand / display name: `TradeOS`; repo & package name: `tradeos`;
    kebab-case `trade-os`; snake_case `trade_os`; camelCase `tradeOS`.
  - Environment-variable / constants prefix is now `TRADEOS_`
    (previously `OPENTERMINALUI_`); `OTUI_*` variables are now `TOS_*`
    (e.g. `OTUI_MODE` → `TOS_MODE`).
  - API key prefix changed from `otui_` to `tos_`;
    the CSS class prefix is `tos-` where an `otui-` prefix existed.
  - Docker image is now `tradeos:latest`; PyInstaller bundle is `TradeOS`.
  - New TradeOS emblem and icon set (charcoal/gold brand palette:
    background `#0E1116`, surface `#14181D`, accent `#C9A227`,
    text `#F2EFE6`).
  - Tagline: **SEE EVERYTHING. EXECUTE ANYTHING.**

### Migration notes

- If you set `OPENTERMINALUI_*` or `OTUI_*` environment variables, rename them
  to `TRADEOS_*` / `TOS_*` (see `.env.example`).
- The default SQLite database path changed from `data/openterminal.db` to
  `data/tradeos.db`; move or rename existing data files as needed.
- Existing API keys with the `otui_` prefix remain valid; newly generated keys
  use the `tos_` prefix.
