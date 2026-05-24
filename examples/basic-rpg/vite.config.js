import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      edwin: resolve(__dirname, 'edwin/lib/index.js'),
    },
  },
  test: {
    include: ['spec/**/*.test.js'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './spec/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/', 'spec/', 'edwin/'],
    },
  },
});
