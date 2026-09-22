// heatmap_manager.h/.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original: https://github.com/edgedepthhq/edgedepth-terminal.git src/core/heatmap_manager.h/.cpp
// Implemented as is into LSE — functional orderflow, GPU ring 8192x1024 LUT 256x1, SoA

import { ShaderHeatmapRenderer } from '../rendering/shader_heatmap_renderer';

export type HeatmapKey = { exchange:string; symbol:string; mode:string; };

export class HeatmapManager {
  private heatmaps = new Map<string, ShaderHeatmapRenderer>();

  private keyToString(k:HeatmapKey){ return `${k.exchange}:${k.symbol}:${k.mode}`; }

  private get_or_create(key:HeatmapKey): ShaderHeatmapRenderer {
    const s=this.keyToString(key);
    let r=this.heatmaps.get(s);
    if (!r){
      r=new ShaderHeatmapRenderer();
      this.heatmaps.set(s, r);
    }
    return r;
  }

  apply_snapshot(pair:{exchange:string; symbol:string}, snapshot_pb:any, timeframe_seconds=0){
    const key:HeatmapKey={exchange: pair.exchange, symbol: pair.symbol, mode: snapshot_pb.mode};
    const reconstructor=this.get_or_create(key);
    if (timeframe_seconds>0 && timeframe_seconds*1000 !== reconstructor.get_column_interval_ms()) return;
    reconstructor.process_snapshot(snapshot_pb);
  }

  finalize_snapshot(pair:{exchange:string; symbol:string}, snapshot_pb:any){
    const mode=snapshot_pb.mode;
    let reconstructor=this.get_reconstructor(pair, mode);
    if (!reconstructor || !reconstructor.has_data()){
      this.apply_snapshot(pair, snapshot_pb);
      return;
    }
    const price_qty_map=new Map<number, number>();
    for (let i=0;i<snapshot_pb.prices.length;i++){
      const price=snapshot_pb.prices[i];
      const total_qty=snapshot_pb.bid_qty[i]+snapshot_pb.ask_qty[i];
      if (total_qty>=0.001) price_qty_map.set(price, total_qty);
    }
    reconstructor.finalize_column(snapshot_pb.timestamp_ms, price_qty_map);
  }

  get_reconstructor(pair:{exchange:string; symbol:string}, mode:string){
    const key:HeatmapKey={exchange: pair.exchange, symbol: pair.symbol, mode};
    return this.heatmaps.get(this.keyToString(key)) ?? null;
  }

  get_oldest_timestamp(pair:{exchange:string; symbol:string}, mode:string){
    const r=this.get_reconstructor(pair, mode);
    return r ? r.get_min_time() : 0;
  }
  get_newest_timestamp(pair:{exchange:string; symbol:string}, mode:string){
    const r=this.get_reconstructor(pair, mode);
    return r ? r.get_max_time() : 0;
  }
  has_data(pair:{exchange:string; symbol:string}, mode:string){
    const key:HeatmapKey={exchange: pair.exchange, symbol: pair.symbol, mode};
    return this.heatmaps.has(this.keyToString(key));
  }
  clear(pair:{exchange:string; symbol:string}, mode:string){
    const key:HeatmapKey={exchange: pair.exchange, symbol: pair.symbol, mode};
    const it=this.heatmaps.get(this.keyToString(key));
    if (it) it.clear();
  }
  clear_all(){ this.heatmaps.clear(); }
  mark_dirty(pair:{exchange:string; symbol:string}){
    for (const [k, reconstructor] of this.heatmaps){
      if (k.startsWith(`${pair.exchange}:${pair.symbol}:`)) reconstructor.mark_dirty();
    }
  }
  set_timeframe(pair:{exchange:string; symbol:string}, mode:string, timeframe_seconds:number){
    this.get_or_create({exchange: pair.exchange, symbol: pair.symbol, mode}).set_column_interval_ms(timeframe_seconds*1000);
  }
}
