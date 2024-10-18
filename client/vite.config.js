import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  server: {
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    } : undefined,  // No proxy in production
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
});
