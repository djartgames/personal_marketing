import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // In the Docker container, Edwin source is mounted at ./edwin
      edwin: resolve(__dirname, 'edwin/src/index.js'),
    },
  },
});
