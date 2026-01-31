import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: 'preview',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
