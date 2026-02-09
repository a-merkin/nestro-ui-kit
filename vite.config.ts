import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ defaultImport: 'component' }),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
      exclude: ['src/stories', '**/*.stories.ts', '**/*.stories.tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@preview': '/preview',
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
        globals: { vue: 'Vue' },
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css')
            ? 'nestro-ui-kit.css'
            : assetInfo.name || 'assets/[name].[ext]',
      },
    },
  },
});
