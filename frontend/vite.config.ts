import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      'next/image': path.resolve(import.meta.dirname, './src/shims/next-image.tsx'),
      'next/link': path.resolve(import.meta.dirname, './src/shims/next-link.tsx'),
      'next/navigation': path.resolve(import.meta.dirname, './src/shims/next-navigation.tsx'),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion-vendor';
            if (id.includes('lucide-react')) return 'icon-vendor';
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('react')) return 'react-vendor';
            if (id.includes('clsx') || id.includes('tailwind-merge')) return 'utility-vendor';
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
