import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env from the frontend directory so VITE_* vars in frontend/.env are available
    const envDir = path.resolve(__dirname, 'frontend');
    const env = loadEnv(mode, envDir, '');
    return {
      envDir,
      server: {
        port: 3001,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Keep legacy defines if used elsewhere; import.meta.env.VITE_* is preferred
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist'  
      }
    };
});
