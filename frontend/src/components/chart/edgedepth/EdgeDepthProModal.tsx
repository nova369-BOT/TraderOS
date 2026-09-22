// EdgeDepthProModal.tsx — exact EdgeDepth upsell_modal.cpp replica with zinc palette
// Pro upsell for seconds PRO timeframe, RT mode locked, etc.
// Chrome zinc #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c

import React from 'react';

export function EdgeDepthProModal({ open, onClose, feature = 'SECONDS PRO' }: { open: boolean; onClose: () => void; feature?: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#262626] border border-[#3a3a3a] rounded shadow-2xl w-[380px] overflow-hidden">
        <div className="px-4 py-3 border-b border-[#3a3a3a] flex justify-between items-center">
          <span className="text-[11px] font-bold tracking-wider text-[#e8e8e8]">PRO — {feature}</span>
          <button onClick={onClose} className="text-[#b9b9b9] hover:text-[#e8e8e8] text-[16px]">×</button>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#d0d0d0] flex items-center justify-center text-[#1c1c1c] font-bold text-[14px]">D</div>
            <span className="text-[12px] font-semibold text-[#e8e8e8]">EdgeDepth Pro</span>
            <span className="text-[9px] px-1.5 py-0.5 bg-[#21b3a4]/20 text-[#21b3a4] rounded">UPGRADE</span>
          </div>
          <div className="text-[11px] text-[#b9b9b9] leading-relaxed">
            <p className="mb-2"><span className="text-[#e8e8e8] font-medium">{feature}</span> is locked behind Pro. Unlock:</p>
            <ul className="list-disc pl-4 space-y-1 text-[10px]">
              <li>Seconds timeframe 1s/5s/15s/30s — ultra-fast scalping</li>
              <li>Real-time DOM linked — follow-live streaming with live-edge dot</li>
              <li>Liquidation heatmap — 800 bands 0.05%, leverage tiers, reach cone</li>
              <li>Flow & Positioning — Exposure V2, Hyperliquid levels, Market structure</li>
              <li>VPVR + TPO + Footprint cluster/profile + Renko</li>
              <li>Volume Delta + Trade Intensity + VWAP Deviation</li>
              <li>VPIN Toxicity + Funding Rate + Open Interest</li>
              <li>1503 pairs watchlist with sparkline/score/type</li>
            </ul>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-2 bg-[#2a2a2a] border border-[#3a3a3a] text-[#b9b9b9] rounded text-[11px] hover:bg-[#343434]">Maybe later</button>
            <button onClick={onClose} className="flex-1 py-2 bg-[#d0d0d0] text-[#1c1c1c] rounded text-[11px] font-medium hover:bg-[#e8e8e8]">Upgrade to Pro</button>
          </div>
          <div className="text-[9px] text-[#b9b9b9]/60 text-center">Zinc palette #1c1c1c/#2a2a2a/#3a3a3a #e8e8e8/#b9b9b9 #21b3a4/#f0426c • Data colors exact EdgeDepth Ember/Viridis/Magma/Inferno</div>
        </div>
      </div>
    </div>
  );
}

export default EdgeDepthProModal;
