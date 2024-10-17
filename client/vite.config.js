import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  
  
  return {
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true, // Optional, helps with CORS
          secure: false,
        },
      },
    },
    plugins: [react()],
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][extname]',   // No hash for asset files
          chunkFileNames: 'assets/[name].js',         // No hash for chunk files
          entryFileNames: 'assets/[name].js',         // No hash for entry files
        },
      },
    },
    base: './',  // This ensures relative paths
  };
});

// Removed duplicate export default defineConfig block
