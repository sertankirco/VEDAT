
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
      // 500kB limitini 1000kB'ye çıkararak uyarıyı engelliyoruz
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Büyük kütüphaneleri ayrı dosyalara bölerek performansı optimize ediyoruz
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@google/genai')) {
                return 'gemini-sdk';
              }
              if (id.includes('react')) {
                return 'react-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              return 'vendor';
            }
          }
        }
      }
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    },
    server: {
      port: 3000,
      host: true
    }
  };
});
