import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  root: 'preview',
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: 'nestro-ui-kit/nestro-ui-kit.css',
        replacement: path.resolve(__dirname, 'dist/nestro-ui-kit.css'),
      },
      {
        find: 'nestro-ui-kit',
        replacement: path.resolve(__dirname, 'dist/nestro-ui-kit.es.js'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
});
