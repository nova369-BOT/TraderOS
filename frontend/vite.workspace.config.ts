import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// F2 workspace: second IIFE bundle served by FastAPI's static mount at /w/.
// emptyOutDir stays false: static/w/index.html is checked in by hand.
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': '{}',
    global: 'globalThis',
  },
  build: {
    outDir: path.resolve(__dirname, '../lse_terminal/ui/static/w'),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'workspace/main.tsx'),
      name: 'WorkspaceApp',
      formats: ['iife'],
      fileName: () => 'workspace.js',
    },
    rollupOptions: {
      output: { assetFileNames: 'workspace.[ext]' },
    },
  },
});
