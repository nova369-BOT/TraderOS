// indicatorWorker.ts - Off-main-thread indicator computation
// Vite worker: new Worker(new URL('./indicatorWorker.ts', import.meta.url), { type: 'module' })

import { computeIndicatorData, type PriceArrays, type IndicatorConfig } from '@/lib/indicatorCalculator';

export interface WorkerRequest {
  id: number;
  price: PriceArrays;
  indicators: IndicatorConfig;
}

export interface WorkerResponse {
  id: number;
  result?: any;
  error?: string;
  durationMs?: number;
}

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const { id, price, indicators } = e.data;
  const t0 = performance.now();
  try {
    const result = computeIndicatorData(price, indicators);
    const durationMs = performance.now() - t0;
    (self as any).postMessage({ id, result, durationMs } as WorkerResponse);
  } catch (err: any) {
    (self as any).postMessage({ id, error: err?.message || String(err) } as WorkerResponse);
  }
};
