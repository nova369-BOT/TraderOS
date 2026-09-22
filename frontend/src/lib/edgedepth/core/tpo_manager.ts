// tpo_manager.h/.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original: https://github.com/edgedepthhq/edgedepth-terminal.git src/core/tpo_manager.h/.cpp
// TPO Market Profile from 30m candles, sessions 00:00 UTC, POC VAH VAL single prints poor high/low IB

export type TPOBlock = { period_idx:number; };
export type TPORow = { price_lo:number; price_hi:number; row_idx:number; blocks:TPOBlock[]; block_count:number; is_poc:boolean; is_value_area:boolean; is_single_print:boolean; is_initial_balance:boolean; };
export type TPOSession = {
  session_start_ms:number; session_end_ms:number; rows:TPORow[]; total_periods:number; total_blocks:number; max_block_count:number;
  poc_price:number; poc_row_idx:number; vah:number; val:number; session_high:number; session_low:number; ib_high:number; ib_low:number;
  has_poor_high:boolean; has_poor_low:boolean; tick_per_row:number; expanded:boolean;
};

export class TPOManager {
  private data = new Map<string, TPOSession[]>();
  private last_build_hash = new Map<string, number>();
  session_period_hours=24;
  ticks_per_row_setting=0;
  value_area_pct=0.70;
  show_poc_ray=true;
  show_vah_val_rays=true;
  show_single_prints=true;
  show_poor_high_low=true;
  show_initial_balance=false;
  show_session_header=true;
  highlight_start_end=true;
  profile_spacing=1;

  has_data(symbol:string){ return this.data.has(symbol) && this.data.get(symbol)!.length>0; }
  get_sessions(symbol:string){ return this.data.get(symbol) ?? null; }
  toggle_expand(symbol:string, idx:number){ const s=this.data.get(symbol); if (s && idx>=0 && idx<s.length) s[idx].expanded=!s[idx].expanded; }
  clear(symbol:string){ this.data.delete(symbol); this.last_build_hash.delete(symbol); }
  clear_all(){ this.data.clear(); this.last_build_hash.clear(); }

  build_sessions(symbol:string, timestamps:number[], highs:number[], lows:number[], candle_count:number, timeframe_sec:number, tick_per_row:number){
    if (!timestamps || !highs || !lows || !candle_count){ this.data.set(symbol, []); return; }
    const hash = (timestamps.slice(-10).join(',')+highs.slice(-10).join(',')+lows.slice(-10).join(',')+timeframe_sec+tick_per_row).length;
    if (this.last_build_hash.get(symbol)===hash && this.data.has(symbol)) return;
    this.last_build_hash.set(symbol, hash);
    const session_ms=this.session_period_hours*3600*1000;
    const sessions_dict=new Map<number, number[]>();
    for (let idx=0; idx<candle_count; idx++){
      const ts=timestamps[idx];
      const sess_start=Math.floor(ts/session_ms)*session_ms;
      if (!sessions_dict.has(sess_start)) sessions_dict.set(sess_start, []);
      sessions_dict.get(sess_start)!.push(idx);
    }
    const sessions:TPOSession[]=[];
    for (const sess_start of Array.from(sessions_dict.keys()).sort((a,b)=>a-b)){
      const indices=sessions_dict.get(sess_start)!;
      if (!indices.length) continue;
      const sess_end=sess_start+session_ms;
      const sess_highs=indices.map(i=>highs[i]);
      const sess_lows=indices.map(i=>lows[i]);
      const s_high=Math.max(...sess_highs);
      const s_low=Math.min(...sess_lows);
      if (s_high<=s_low) continue;
      let tpr=tick_per_row;
      if (tpr<=0){
        let prange=s_high-s_low;
        tpr=prange/40;
        if (tpr>0){
          const mag=Math.pow(10, Math.floor(Math.log10(tpr)));
          tpr=Math.round(tpr/mag)*mag;
          if (tpr===0) tpr=mag;
        } else tpr=1;
      }
      let row_count=Math.max(1, Math.ceil((s_high-s_low)/tpr));
      if (row_count>500){ tpr=(s_high-s_low)/500; row_count=500; }
      const rows:TPORow[]=[];
      for (let r_idx=0;r_idx<row_count;r_idx++){
        const lo=s_low+r_idx*tpr;
        const hi=lo+tpr;
        rows.push({price_lo:lo, price_hi:hi, row_idx:r_idx, blocks:[], block_count:0, is_poc:false, is_value_area:false, is_single_print:false, is_initial_balance:false});
      }
      for (let period_idx=0; period_idx<indices.length; period_idx++){
        const c_idx=indices[period_idx];
        const ch=highs[c_idx], cl=lows[c_idx];
        const start_row=Math.max(0, Math.floor((cl-s_low)/tpr));
        const end_row=Math.min(row_count-1, Math.floor((ch-s_low)/tpr));
        for (let r=start_row;r<=end_row;r++){ rows[r].blocks.push({period_idx}); rows[r].block_count=rows[r].blocks.length; }
      }
      const sess:TPOSession={
        session_start_ms:sess_start, session_end_ms:sess_end, rows, total_periods:indices.length, total_blocks:0, max_block_count:0,
        poc_price:0, poc_row_idx:-1, vah:0, val:0, session_high:s_high, session_low:s_low, ib_high:0, ib_low:0,
        has_poor_high:false, has_poor_low:false, tick_per_row:tpr, expanded:false
      };
      if (rows.length){
        let max_row=rows[0];
        for (const r of rows) if (r.block_count>max_row.block_count) max_row=r;
        sess.poc_price=(max_row.price_lo+max_row.price_hi)/2;
        sess.poc_row_idx=max_row.row_idx;
        max_row.is_poc=true;
        sess.max_block_count=max_row.block_count;
        sess.total_blocks=rows.reduce((s,r)=>s+r.block_count,0);
        const target=sess.total_blocks*this.value_area_pct;
        const sorted=Array.from(rows).sort((a,b)=>b.block_count-a.block_count);
        let va_vol=0; const va_prices:number[]=[];
        for (const r of sorted){ va_vol+=r.block_count; va_prices.push((r.price_lo+r.price_hi)/2); if (va_vol>=target) break; }
        if (va_prices.length){ sess.vah=Math.max(...va_prices); sess.val=Math.min(...va_prices); for (const r of rows){ const mid=(r.price_lo+r.price_hi)/2; if (mid>=sess.val && mid<=sess.vah) r.is_value_area=true; } }
        for (const r of rows) if (r.block_count===1) r.is_single_print=true;
        if (rows[0].block_count>=2) sess.has_poor_low=true;
        if (rows[rows.length-1].block_count>=2) sess.has_poor_high=true;
        if (indices.length>=2){
          const ib_high=Math.max(highs[indices[0]], highs[indices[1]]);
          const ib_low=Math.min(lows[indices[0]], lows[indices[1]]);
          sess.ib_high=ib_high; sess.ib_low=ib_low;
          const ib_start=Math.max(0, Math.floor((ib_low-s_low)/tpr));
          const ib_end=Math.min(row_count-1, Math.floor((ib_high-s_low)/tpr));
          for (let r=ib_start;r<=ib_end;r++) rows[r].is_initial_balance=true;
        }
      }
      sessions.push(sess);
    }
    this.data.set(symbol, sessions);
  }
}
