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
