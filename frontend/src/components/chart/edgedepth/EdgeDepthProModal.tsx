// EdgeDepthProModal.tsx — REMOVED PAYWALL — exact EdgeDepth code is present, no upgrade needed
// Previously was upsell_modal.cpp replica with PRO lock for seconds/RT mode
// User correction: why add nonsense like need to upgrade to use RT mode? Code present in edgedepth terminal, should be free
// Now: all features free — seconds 1s/5s/15s/30s, RT MODE follow-live, liquidation heatmap, flow & positioning, VPVR, TPO, Footprint, Renko, VPIN, Funding, OI, 1503 watchlist — no paywall
// This component is kept for backward compat but returns null — no modal, no paywall

import React from 'react';

export function EdgeDepthProModal({ open, onClose, feature = 'SECONDS PRO' }: { open: boolean; onClose: () => void; feature?: string }) {
  // No paywall — all EdgeDepth features are free, code present
  // If somehow opened, auto-close and return null
  if (open) {
    try { onClose?.(); } catch {}
  }
  return null;
}

export default EdgeDepthProModal;
