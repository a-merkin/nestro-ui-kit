import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'component',
    }),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
      exclude: ['src/stories', '**/*.stories.ts', '**/*.stories.tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'NestroUiKit',
      fileName: (format) => `nestro-ui-kit.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'nestro-ui-kit.css';
          }
          return assetInfo.name || 'assets/[name].[ext]';
        },
      },
    },
  },
});
