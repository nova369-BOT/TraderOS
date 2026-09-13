/**
 * Palette trigger bus (R2).
 *
 * The AppShell global bar opens the command palette through this event so the
 * palette stays the single owner of its open/close state (⌘K, "/", and now
 * every UI trigger share one path).
 */

export const OPEN_PALETTE_EVENT = "ot:open-palette";

export function openCommandPalette(): void {
  window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
}
