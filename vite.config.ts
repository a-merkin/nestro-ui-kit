import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import dts from 'vite-plugin-dts';
import path from 'path'; // теперь безопасно с @types/node

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ defaultImport: 'component' }),
    dts({
      outDir: 'dist', // все типы будут в dist
      insertTypesEntry: true, // создаст dist/index.d.ts
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
      entry: path.resolve(__dirname, 'src/index.ts'), // точка входа UI Kit
      name: 'NestroUiKit',
      fileName: (format) => `nestro-ui-kit.${format}.js`,
      formats: ['es', 'umd'], // ES и UMD бандлы
    },
    rollupOptions: {
      external: ['vue'], // vue как peerDependency
      output: {
        globals: { vue: 'Vue' },
        exports: 'named', // убирает предупреждение про default + named
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css')
            ? 'nestro-ui-kit.css' // все CSS в один файл
            : assetInfo.name || 'assets/[name].[ext]',
      },
    },
  },
});
