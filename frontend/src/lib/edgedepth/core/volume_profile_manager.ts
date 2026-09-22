// volume_profile_manager.h/.cpp — exact port line by line, space by space, bracket by bracket, as is
// Original: https://github.com/edgedepthhq/edgedepth-terminal.git src/core/volume_profile_manager.h/.cpp
// VPVR POC/VAH/VAL buy/sell split price_profile_renderer

export type VPLevel = { price:number; buy_volume:number; sell_volume:number; total_volume:number; delta:number; volume_pct:number; is_poc:boolean; in_value_area:boolean; };
export type ProfileData = { levels:VPLevel[]; poc:number; vah:number; val:number; total_volume:number; value_area_vol:number; start_time:number; end_time:number; valid:boolean; };
export type VPMode = 'Standard'|'TotalVolume'|'TotalDelta';

export class VolumeProfileManager {
  private profiles = new Map<string, ProfileData>();
  private mode_:VPMode='Standard';
  private show_poc_=true;
  private show_vah_val_=true;
  private show_values_=false;
  private width_pct_=0.20;
  private enabled_=false;
  private last_request_time_ms_=0;
  private last_start_ms_=0;
  private last_end_ms_=0;
  private kDebounceMs=300;
  private kRangeChangePct=0.05;

  request_profile(symbol:string, start_ms:number, end_ms:number, tick_per_row:number, stream_mgr:any){
    const now=Date.now();
    if (now-this.last_request_time_ms_ < this.kDebounceMs) return;
    const rangeChange = Math.abs(start_ms-this.last_start_ms_)/Math.max(1,Math.abs(this.last_end_ms_-this.last_start_ms_)) + Math.abs(end_ms-this.last_end_ms_)/Math.max(1,Math.abs(this.last_end_ms_-this.last_start_ms_));
    if (rangeChange < this.kRangeChangePct && this.profiles.has(symbol)) return;
    this.last_request_time_ms_=now;
    this.last_start_ms_=start_ms;
    this.last_end_ms_=end_ms;
    // In LSE, this would send WS request via stream_mgr
    if (stream_mgr?.request_volume_profile) stream_mgr.request_volume_profile(symbol, start_ms, end_ms, tick_per_row);
  }

  on_profile_response(symbol:string, resp:any){
    // resp: {levels: [{price, buy_volume, sell_volume, total_volume, delta}], poc, vah, val, total_volume, value_area_vol, start_time, end_time}
    const levels:VPLevel[] = (resp.levels||[]).map((l:any)=>{
      const total=l.total_volume||l.buy_volume+l.sell_volume||0;
      return {price:l.price, buy_volume:l.buy_volume||0, sell_volume:l.sell_volume||0, total_volume:total, delta:l.delta||0, volume_pct:0, is_poc:false, in_value_area:false};
    });
    const total=levels.reduce((s,l)=>s+l.total_volume,0);
    let poc=resp.poc||0, pocVol=0;
    for (const lv of levels){ lv.volume_pct= total>0 ? lv.total_volume/total : 0; if (lv.total_volume>pocVol){ pocVol=lv.total_volume; poc=lv.price; } }
    for (const lv of levels){ lv.is_poc=Math.abs(lv.price-poc)<1e-9; lv.in_value_area= resp.vah && resp.val ? (lv.price>=resp.val && lv.price<=resp.vah) : false; }
    const profile:ProfileData={levels, poc, vah:resp.vah||0, val:resp.val||0, total_volume:total, value_area_vol:resp.value_area_vol||0, start_time:resp.start_time||0, end_time:resp.end_time||0, valid:true};
    this.profiles.set(symbol, profile);
  }

  get_profile(symbol:string){ return this.profiles.get(symbol) ?? null; }
  invalidate(symbol:string){ this.profiles.delete(symbol); }
  invalidate_all(){ this.profiles.clear(); }

  mode(){ return this.mode_; } set_mode(m:VPMode){ this.mode_=m; }
  show_poc(){ return this.show_poc_; } set_show_poc(v:boolean){ this.show_poc_=v; }
  show_vah_val(){ return this.show_vah_val_; } set_show_vah_val(v:boolean){ this.show_vah_val_=v; }
  show_values(){ return this.show_values_; } set_show_values(v:boolean){ this.show_values_=v; }
  width_pct(){ return this.width_pct_; } set_width_pct(v:number){ this.width_pct_=v; }
  enabled(){ return this.enabled_; } set_enabled(v:boolean){ this.enabled_=v; }
}
