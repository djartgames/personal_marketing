import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'lib'),
      '@core': resolve(__dirname, 'lib/core'),
      '@entities': resolve(__dirname, 'lib/entities'),
      '@components': resolve(__dirname, 'lib/components'),
      '@hooks': resolve(__dirname, 'lib/hooks'),
      '@styles': resolve(__dirname, 'lib/styles'),
      '@types': resolve(__dirname, 'lib/types'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'Edwin',
      fileName: (format) => `edwin.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'bootstrap'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          bootstrap: 'Bootstrap',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './spec/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/', 'spec/', 'examples/'],
    },
  },
});
