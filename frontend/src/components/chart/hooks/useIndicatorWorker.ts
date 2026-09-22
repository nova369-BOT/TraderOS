// useIndicatorWorker.ts - Hook that offloads heavy indicator calc to Web Worker
// Keeps fast-paths (append/prepend) on main thread for sub-16ms updates.

import { useEffect, useRef, useState, useCallback } from 'react';
import { computeIndicatorData, prependNaNToIndicators, type PriceArrays, type IndicatorConfig } from '@/lib/indicatorCalculator';
import type { Candle } from '../ProChart';

interface CacheRef {
  candles: Candle[];
  closes: number[];
  highs: number[];
  lows: number[];
  opens: number[];
  volumes: number[];
  timestamps: number[];
}

interface UseIndicatorWorkerReturn {
  indicatorData: any | null;
  isComputing: boolean;
  computeDurationMs: number | null;
}

let workerInstance: Worker | null = null;
let workerRequestId = 0;

function getWorker(): Worker {
  if (workerInstance) return workerInstance;
  // Vite will bundle this as a separate chunk automatically
  workerInstance = new Worker(new URL('@/workers/indicatorWorker.ts', import.meta.url), { type: 'module' });
  return workerInstance;
}

export function useIndicatorWorker(
  candles: Candle[],
  indicators: any,
  isScrollingRef: React.MutableRefObject<boolean>
): UseIndicatorWorkerReturn {
  const [indicatorData, setIndicatorData] = useState<any | null>(null);
  const [isComputing, setIsComputing] = useState(false);
  const [computeDurationMs, setComputeDurationMs] = useState<number | null>(null);

  const priceCacheRef = useRef<CacheRef | null>(null);
  const dataCacheRef = useRef<any | null>(null);
  const candleFingerprintRef = useRef<number>(0);
  const pendingRef = useRef<number | null>(null);

  // Stable callback for worker messages
  const handleWorkerMessage = useCallback((e: MessageEvent) => {
    const { id, result, error, durationMs } = e.data;
    if (pendingRef.current !== null && id !== pendingRef.current) return; // stale
    pendingRef.current = null;
    setIsComputing(false);
    if (error) {
      console.warn('[indicatorWorker] error', error);
      return;
    }
    if (durationMs !== undefined) setComputeDurationMs(durationMs);
    // Cache
    if (candles.length > 0) {
      candleFingerprintRef.current = candles[0].close;
    }
    dataCacheRef.current = result;
    setIndicatorData(result);
  }, [candles]);

  useEffect(() => {
    const worker = getWorker();
    worker.addEventListener('message', handleWorkerMessage);
    return () => worker.removeEventListener('message', handleWorkerMessage);
  }, [handleWorkerMessage]);

  useEffect(() => {
    if (!indicators || candles.length === 0) {
      setIndicatorData(null);
      return;
    }

    const candleFingerprint = candles.length > 0 ? candles[0].close : 0;
    // Defer during scroll
    if (isScrollingRef.current && dataCacheRef.current && candleFingerprintRef.current === candleFingerprint) {
      return;
    }

    const cache = priceCacheRef.current;
    let closes: number[], highs: number[], lows: number[], opens: number[], volumes: number[], timestamps: number[];
    let priceArrays: PriceArrays | null = null;

    const canAppend = cache
      && cache.candles !== candles
      && candles.length >= cache.closes.length
      && candles.length > 0 && cache.closes.length > 0
      && candles[0].time === cache.timestamps[0]
      && cache.closes.length > 10;

    let prependN = 0;
    const canPrepend = !canAppend && cache
      && cache.candles !== candles
      && candles.length > cache.closes.length
      && cache.closes.length > 10
      && (candles.length - cache.closes.length) > 0
      && candles[candles.length - cache.closes.length]?.time === cache.timestamps[0];

    if (canPrepend) prependN = candles.length - cache!.closes.length;

    if (canAppend) {
      const prevLen = cache!.closes.length;
      const startIdx = Math.max(0, prevLen - 1);
      closes = cache!.closes;
      highs = cache!.highs;
      lows = cache!.lows;
      opens = cache!.opens;
      volumes = cache!.volumes;
      timestamps = cache!.timestamps;
      closes.length = startIdx;
      highs.length = startIdx;
      lows.length = startIdx;
      opens.length = startIdx;
      volumes.length = startIdx;
      timestamps.length = startIdx;
      for (let i = startIdx; i < candles.length; i++) {
        const c = candles[i];
        closes.push(c.close);
        highs.push(c.high);
        lows.push(c.low);
        opens.push(c.open);
        volumes.push(c.volume || 0);
        timestamps.push(c.time);
      }
      priceArrays = { closes, highs, lows, opens, volumes, timestamps };
      priceCacheRef.current = { candles, closes, highs, lows, opens, volumes, timestamps };
      // For append, we can compute synchronously — it's just a few new candles + indicator calc for new tail?
      // But to keep logic simple and fast, we compute full synchronously for append (still cheap because cache reused for price arrays, indicator still full).
      // However for ultra-smooth, we still offload if candles > 5000 and many indicators.
      const totalEnabled = Object.values(indicators).filter((v: any) => v?.enabled).length;
      const shouldOffload = candles.length > 3000 && totalEnabled > 3;

      if (!shouldOffload) {
        const t0 = performance.now();
        const result = computeIndicatorData(priceArrays, indicators as IndicatorConfig);
        const dt = performance.now() - t0;
        setComputeDurationMs(dt);
        dataCacheRef.current = result;
        candleFingerprintRef.current = candleFingerprint;
        setIndicatorData(result);
        return;
      }
      // else offload
    } else if (canPrepend && dataCacheRef.current) {
      // Fast prepend path — main thread only, 10-30ms
      const newCloses = new Array(prependN);
      const newHighs = new Array(prependN);
      const newLows = new Array(prependN);
      const newOpens = new Array(prependN);
      const newVolumes = new Array(prependN);
      const newTimestamps = new Array(prependN);
      for (let i = 0; i < prependN; i++) {
        const c = candles[i];
        newCloses[i] = c.close;
        newHighs[i] = c.high;
        newLows[i] = c.low;
        newOpens[i] = c.open;
        newVolumes[i] = c.volume || 0;
        newTimestamps[i] = c.time;
      }
      closes = newCloses.concat(cache!.closes);
      highs = newHighs.concat(cache!.highs);
      lows = newLows.concat(cache!.lows);
      opens = newOpens.concat(cache!.opens);
      volumes = newVolumes.concat(cache!.volumes);
      timestamps = newTimestamps.concat(cache!.timestamps);

      const shifted = prependNaNToIndicators(dataCacheRef.current, prependN);
      priceCacheRef.current = { candles, closes, highs, lows, opens, volumes, timestamps };
      dataCacheRef.current = shifted;
      candleFingerprintRef.current = candleFingerprint;
      setIndicatorData(shifted);
      return;
    } else {
      // Full rebuild
      closes = candles.map(c => c.close);
      highs = candles.map(c => c.high);
      lows = candles.map(c => c.low);
      opens = candles.map(c => c.open);
      volumes = candles.map(c => c.volume || 0);
      timestamps = candles.map(c => c.time);
      priceArrays = { closes, highs, lows, opens, volumes, timestamps };
      priceCacheRef.current = { candles, closes, highs, lows, opens, volumes, timestamps };
    }

    if (!priceArrays) {
      priceArrays = { closes: closes!, highs: highs!, lows: lows!, opens: opens!, volumes: volumes!, timestamps: timestamps! };
    }

    // Decide: small dataset + few indicators => sync, else worker
    const enabledCount = Object.values(indicators).filter((v: any) => v?.enabled).length;
    const isHeavy = candles.length > 1000 || enabledCount > 5 || (indicators.customIndicators?.filter((c: any) => c.enabled)?.length || 0) > 0;

    if (!isHeavy) {
      const t0 = performance.now();
      const result = computeIndicatorData(priceArrays, indicators as IndicatorConfig);
      const dt = performance.now() - t0;
      setComputeDurationMs(dt);
      dataCacheRef.current = result;
      candleFingerprintRef.current = candleFingerprint;
      setIndicatorData(result);
      return;
    }

    // Heavy => offload to worker
    setIsComputing(true);
    const worker = getWorker();
    const id = ++workerRequestId;
    pendingRef.current = id;
    worker.postMessage({ id, price: priceArrays, indicators } as any);

  }, [candles, indicators, isScrollingRef]);

  return { indicatorData, isComputing, computeDurationMs };
}
