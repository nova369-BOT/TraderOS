import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// KaTeX declares each of its 20 faces three times over (woff2, then woff and
// ttf fallbacks). Since we now emit fonts as separate hashed assets (not
// inlined), keeping fallbacks would still cost ~1.1 MB of dead weight.
// Terminal only ever runs in Chromium-class webview which has supported
// woff2 since 2014, so older formats are dropped before CSS is processed.
const katexWoff2Only = {
  name: 'katex-woff2-only',
  enforce: 'pre' as const,
  transform(code: string, id: string) {
    if (!id.includes('katex') || !id.endsWith('.css')) return null;
    return {
      code: code
        .replace(/,\s*url\([^)]*\.woff\)\s*format\("woff"\)/g, '')
        .replace(/,\\s*url\([^)]*\.ttf\)\s*format\("truetype"\)/g, ''),
      map: null,
    };
  },
};

export default defineConfig({
  plugins: [react(), katexWoff2Only],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': '{}',
    global: 'globalThis',
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    outDir: path.resolve(__dirname, '../lse_terminal/ui/static/chart'),
    emptyOutDir: true,
    target: 'es2022',
    // Modern: ES modules with code-splitting. Entry is still mount.tsx
    // which assigns window.LSEChart etc, so shell keeps working when loaded
    // as type="module". Heavy pages (DataViz, QuantModels, Notebooks,
    // EconomicCalendar, Backtesting) are lazy-loaded via dynamic import()
    // in mount.tsx, becoming separate chunks loaded on demand.
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    assetsInlineLimit: 4096, // only tiny icons inlined; fonts emitted as files
    lib: {
      entry: path.resolve(__dirname, 'src/mount.tsx'),
      name: 'LSEChart',
      formats: ['es'],
      fileName: () => 'chart.js',
    },
    rollupOptions: {
      treeshake: true,
      output: {
        // Keep main CSS as chart.css for index.html; chunk CSS hashed.
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.endsWith('.css')) {
            // main entry CSS -> chart.css, others -> hashed
            if (name === 'style.css' || name.includes('mount')) return 'chart.css';
            return 'assets/[name]-[hash][extname]';
          }
          // fonts, etc
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'chart.js',
        manualChunks: (id) => {
          // Split heavy deps into own chunks so MARKETS (ProChart) doesn't
          // pay for DataViz/QuantModels/Backtest on first load.
          if (id.includes('node_modules')) {
            if (id.includes('echarts') || id.includes('zrender')) return 'echarts';
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('katex')) return 'katex';
            if (id.includes('sonner') || id.includes('date-fns') || id.includes('react-day-picker')) return 'ui-heavy';
            if (id.includes('@radix-ui') || id.includes('lucide-react') || id.includes('class-variance') || id.includes('clsx') || id.includes('tailwind-merge')) return 'ui';
            if (id.includes('react-router') || id.includes('@tanstack')) return 'router-query';
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor';
          }
          // App code splits
          if (id.includes('/pages/DataViz')) return 'dataviz';
          if (id.includes('/pages/QuantModels') || id.includes('/pages/ModelLab')) return 'quant';
          if (id.includes('/pages/Notebooks')) return 'notebooks';
          if (id.includes('/pages/EconomicCalendar')) return 'econ';
          if (id.includes('/pages/Backtesting') || id.includes('/components/backtesting')) return 'backtest';
          if (id.includes('/components/chart/depth')) return 'depth';
          // ProChart core stays in main
        },
      },
    },
    // esbuild options for ultra-fast + small
    // @ts-ignore
    esbuildOptions: {
      target: 'es2022',
      minify: true,
      treeShaking: true,
    },
  },
});
