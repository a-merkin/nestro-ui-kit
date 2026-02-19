<template>
  <div class="toolbar" role="toolbar" :aria-label="ariaLabel">
    <div class="toolbar__start">
      <slot name="start" />
    </div>
    <div class="toolbar__center">
      <slot name="center" />
    </div>
    <div class="toolbar__end">
      <slot name="end" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToolbarProps } from './Toolbar.types';

defineOptions({ name: 'NToolbar' });

withDefaults(defineProps<ToolbarProps>(), {
  ariaLabel: undefined,
});
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-5);
  background: var(--color-blue-60);
  border: 1px solid var(--color-blue-30);
  min-height: var(--size-height-lg);
  gap: var(--space-4);
}

.toolbar__start,
.toolbar__center,
.toolbar__end {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.toolbar__start {
  justify-content: flex-start;
}

.toolbar__center {
  flex: 1;
  justify-content: center;
}

.toolbar__end {
  justify-content: flex-end;
}
</style>
