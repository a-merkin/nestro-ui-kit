# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start Vite dev server (preview app)
npm run preview:ui       # Run preview app with vite.preview.config.ts
npm run build            # Type-check (vue-tsc) + build library to dist/
npm run storybook        # Start Storybook dev server at http://localhost:6006
npm run build-storybook  # Build Storybook static site
npm run lint             # ESLint on src/**/*.{js,ts,vue}
npm run format           # Prettier format on src/**/*.{js,ts,vue,css,md}
```

## Architecture

This is a **Vue 3 component library** published as an npm package (`nestro-ui-kit`). It outputs two bundles — ESM (`nestro-ui-kit.es.js`) and UMD (`nestro-ui-kit.umd.js`) — plus a single compiled CSS file and TypeScript declarations.

### Entry point and registration

`src/index.ts` is the library entry point. It:
1. Imports global styles (`src/styles/index.css`)
2. Imports all components
3. Exports each component by name (for named imports)
4. Exports `NestroUI` — a Vue plugin object with an `install()` method for global registration

**When adding a new component**, you must add it to `src/index.ts` in both the import block and the `export {}` block, and also to the `components` array used by `NestroUI.install()`.

### Component structure

Each component lives in `src/components/ComponentName/` and follows this exact structure:

```
ComponentName/
├── ComponentName.vue        # SFC with <script setup lang="ts"> and <style scoped lang="scss">
├── ComponentName.types.ts   # TypeScript interfaces (Props, Emits, etc.)
├── ComponentName.stories.ts # Storybook stories using Meta + StoryObj pattern
└── index.ts                 # Re-exports: component (named + default) + types
```

`index.ts` pattern:
```ts
import ComponentName from './ComponentName.vue';
export type { ComponentNameProps } from './ComponentName.types';
export { ComponentName };
export default ComponentName;
```

### Styles system

`src/styles/` is layered:
- **tokens/** — CSS custom properties (colors, spacing, radius, shadows, typography, z-index, motion, borders, scrollbar, layout, sizes). These are the source of truth for all design values.
- **base/** — reset + base + typography styles
- **utilities/** — utility classes built on top of the tokens

All component styles use `<style scoped lang="scss">` and reference CSS variables from the token system (e.g. `var(--color-green-90)`, `var(--shadow-xl)`). Do not hardcode raw color or spacing values.

### SVG icons

SVG files in `src/assets/icons/` are loaded as Vue components via `vite-svg-loader` (configured in both `vite.config.ts` and `.storybook/main.ts`). Import them directly as components:
```ts
import SomeIcon from '@/assets/icons/some-icon.svg';
```

### Path aliases

- `@` → `src/`
- `@preview` → `preview/`

### Storybook

Stories are co-located with components in `src/components/**/*.stories.ts`. The `title` should follow the `'UI/ComponentName'` pattern. Use the `satisfies Meta<typeof Component>` pattern and `render()` with inline templates for interactive stories.
