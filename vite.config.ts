import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load environment variables based on the current mode (e.g., 'development', 'production')
    // and provide an empty string for the prefix to load all env vars.
    const env = loadEnv(mode, '.', '');

    return {
      // Base public path when served in production. This is crucial for GitHub Pages.
      // Replace 'YOUR_REPOSITORY_NAME' with your actual GitHub repository name, e.g., '/derma-ai/'
      base: '/derma-ai/', // <-- ADDED/MODIFIED THIS LINE

      server: {
        port: 3000,
        host: '0.0.0.0', // Allows access from network, useful for testing on other devices
      },
      plugins: [react()],
      define: {
        // Expose environment variables to your client-side code
        // Ensure you have GEMINI_API_KEY defined in your .env file
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Setup an alias for '@/...' to refer to your project root
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});