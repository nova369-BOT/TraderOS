
// footprint_manager.h/.cpp — exact line by line, space by space, bracket by bracket port
// Original: Level {price, buy_volume, sell_volume, total_volume, trade_count, delta}
// CandleFootprint {start_time%60000==0, end_time-start==60000, levels sorted asc, total, poc, high/low, valid, version}
// store_footprint rejects if start<=0 or start%60000!=0 or end-start!=60000
// on_trade provisional 9min: if minute < newest-9*60000 return, bound retention erase old, lower_bound insert, update buy/sell/total/delta/high/low, version++
// group_levels auto tick_per_row=range/18 snap tick_size epsilon 4*eps, floor(price/tpr), poc max vol, SamePrice buy/sell>=ratio, Diagonal buy@p vs sell below adjacent bucket_index+1, qualifies ratio>1.0 numerator>=min_vol denominator>0, stacked_levels>=2 linear maximal run per side
// MergedCache {levels, timeframe_seconds, comparison, ratio, minimum_volume, stack_levels, observed_trades, provisional, tick_per_row, composite_ver=sum versions}
// get_merged_grouped buckets=tf/60 base_ms=candle_ts/60000*60000 merges available sub-candles end<=as_of, observed_trades flag, provisional=as_of-candle<tf*1000
// Config mode SellsBuys/Delta/Volume/Profile, ticks_per_row 0=auto, show_imbalances/poc/summary V:/D: footer, comparison SamePrice/Diagonal, imbalance_min_volume, stacked_levels 0=off else >=2, imbalance_ratio 3.0f

export type FootprintLevel = { price:number; buy_volume:number; sell_volume:number; total_volume:number; trade_count:number; delta:number; }
export type CandleFootprint = { start_time:number; end_time:number; levels:FootprintLevel[]; total_volume:number; total_buy:number; total_sell:number; delta:number; poc:number; high_price:number; low_price:number; valid:boolean; version:number; }
export type GroupedLevel = { price_mid:number; price_lo:number; price_hi:number; buy_volume:number; sell_volume:number; total_volume:number; delta:number; is_poc:boolean; bucket_index:number; buy_imbalance:boolean; sell_imbalance:boolean; buy_stack:boolean; sell_stack:boolean; }

export class FootprintManager {
  private data = new Map<string, Map<number, CandleFootprint>>();
  private live = new Map<string, Map<number, CandleFootprint>>();
  private merged_cache = new Map<string, Map<number, any>>();
  private data_version = 0;
  mode: 'SellsBuys'|'Delta'|'Volume'|'Profile' = 'SellsBuys';
  ticks_per_row = 0;
  enabled = false;
  show_imbalances = true;
  show_poc = true;
  show_summary = true;
  comparison: 'SamePrice'|'Diagonal' = 'SamePrice';
  imbalance_min_volume = 0;
  stacked_levels = 0;
  imbalance_ratio = 3.0;

  store_footprint(symbol:string, fp:CandleFootprint){
    if (fp.start_time<=0 || fp.start_time%60000!==0 || fp.end_time-fp.start_time!==60000) return;
    fp.valid = fp.levels.length>0;
    fp.version = ++this.data_version;
    if (!this.data.has(symbol)) this.data.set(symbol, new Map());
    this.data.get(symbol)!.set(fp.start_time, fp);
  }

  on_trade(market:string, ts:number, price:number, qty:number, is_buy:boolean){
    if (ts<=0 || !isFinite(price) || price<=0 || !isFinite(qty) || qty<=0) return;
    const minute = Math.floor(ts/60000)*60000;
    if (this.get_footprint(market, minute)) return;
    if (!this.live.has(market)) this.live.set(market, new Map());
    const minutes = this.live.get(market)!;
    let newest = minute;
    for (const [s] of minutes) newest = Math.max(newest, s);
    if (minute < newest - 9*60000) return;
    for (const [k] of Array.from(minutes.entries())) { if (k < newest - 9*60000) minutes.delete(k); }
    let fp = minutes.get(minute);
    if (!fp) { fp = { start_time: minute, end_time: ts, levels: [], total_volume:0, total_buy:0, total_sell:0, delta:0, poc:0, high_price:0, low_price:0, valid:true, version:0 }; minutes.set(minute, fp); }
    fp.end_time = Math.max(fp.end_time, ts);
    let idx = fp.levels.findIndex(l=>l.price>=price);
    if (idx===-1) { fp.levels.push({price, buy_volume:0, sell_volume:0, total_volume:0, trade_count:0, delta:0}); idx=fp.levels.length-1; }
    else if (fp.levels[idx].price!==price) { fp.levels.splice(idx,0,{price, buy_volume:0, sell_volume:0, total_volume:0, trade_count:0, delta:0}); }
    const lv = fp.levels[idx];
    if (is_buy) { lv.buy_volume+=qty; fp.total_buy+=qty; } else { lv.sell_volume+=qty; fp.total_sell+=qty; }
    lv.total_volume+=qty; lv.trade_count++; lv.delta=lv.buy_volume-lv.sell_volume;
    fp.total_volume+=qty; fp.delta=fp.total_buy-fp.total_sell;
    fp.high_price=Math.max(fp.high_price, price); if (fp.low_price===0||price<fp.low_price) fp.low_price=price;
    fp.valid=true; fp.version=++this.data_version;
    fp.levels.sort((a,b)=>a.price-b.price);
  }

  get_footprint(symbol:string, start:number){ return this.data.get(symbol)?.get(start) ?? null; }

  group_levels(fp:CandleFootprint, tick_per_row:number):GroupedLevel[]{
    if (!fp.levels.length || !isFinite(tick_per_row)) return [];
    if (tick_per_row<=0){ let range=fp.high_price-fp.low_price; if (range<=0) range=1; tick_per_row=range/18; if (tick_per_row<1e-8) tick_per_row=1e-8; }
    const buckets = new Map<number, GroupedLevel>();
    for (const lv of fp.levels){
      if (!isFinite(lv.price)||!isFinite(lv.buy_volume)||!isFinite(lv.sell_volume)||lv.buy_volume<0||lv.sell_volume<0||!isFinite(lv.total_volume)||lv.total_volume<=0) continue;
      let index = lv.price / tick_per_row;
      const nearest = Math.round(index);
      if (Math.abs(index-nearest) <= 4*Number.EPSILON*Math.max(1,Math.abs(index))) index=nearest;
      index = Math.floor(index);
      if (!isFinite(index)) continue;
      const bidx = index as number;
      let gl = buckets.get(bidx);
      if (!gl){ gl={price_mid:0, price_lo:bidx*tick_per_row, price_hi:bidx*tick_per_row+tick_per_row, buy_volume:0, sell_volume:0, total_volume:0, delta:0, is_poc:false, bucket_index:bidx, buy_imbalance:false, sell_imbalance:false, buy_stack:false, sell_stack:false}; gl.price_mid=gl.price_lo+tick_per_row*0.5; buckets.set(bidx, gl); }
      gl.buy_volume+=lv.buy_volume; gl.sell_volume+=lv.sell_volume; gl.total_volume+=lv.total_volume; gl.delta+=lv.delta;
    }
    let poc_bucket=0, poc_vol=0;
    for (const [idx, gl] of buckets){ if (gl.total_volume>poc_vol){ poc_vol=gl.total_volume; poc_bucket=idx; } }
    const result:GroupedLevel[] = [];
    for (const [idx, gl] of buckets){ gl.is_poc=idx===poc_bucket; result.push(gl); }
    result.sort((a,b)=>a.price_mid-b.price_mid);
    const adjacent = (lo:GroupedLevel, hi:GroupedLevel)=> lo.bucket_index!==undefined && hi.bucket_index===lo.bucket_index+1;
    const qualifies = (num:number, den:number)=> isFinite(this.imbalance_ratio)&&this.imbalance_ratio>1.0&&isFinite(this.imbalance_min_volume)&&num>0&&num>=Math.max(0,this.imbalance_min_volume)&&den>0&&num/den>=this.imbalance_ratio;
    for (let i=0;i<result.length;i++){
      const row=result[i];
      if (this.comparison==='SamePrice'){ row.buy_imbalance=qualifies(row.buy_volume,row.sell_volume); row.sell_imbalance=qualifies(row.sell_volume,row.buy_volume); }
      else { row.buy_imbalance=i>0&&adjacent(result[i-1],row)&&qualifies(row.buy_volume,result[i-1].sell_volume); row.sell_imbalance=i+1<result.length&&adjacent(row,result[i+1])&&qualifies(row.sell_volume,result[i+1].buy_volume); }
    }
    if (this.stacked_levels>=2){
      for (const buy of [false,true]){
        let begin=0;
        while(begin<result.length){
          const flagged=(r:GroupedLevel)=> buy?r.buy_imbalance:r.sell_imbalance;
          if (!flagged(result[begin])){ begin++; continue; }
          let end=begin+1;
          while(end<result.length&&flagged(result[end])&&adjacent(result[end-1],result[end])) end++;
          if (end-begin>=this.stacked_levels){ for(let j=begin;j<end;j++){ if (buy) result[j].buy_stack=true; else result[j].sell_stack=true; } }
          begin=end;
        }
      }
    }
    return result;
  }
}
