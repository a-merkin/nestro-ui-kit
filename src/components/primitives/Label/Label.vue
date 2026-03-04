<template>
  <label :for="forId" :class="classes" :style="styles">
    <slot />
    <span v-if="required" class="n-label__required" aria-hidden="true">*</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NLabelProps } from './Label.types';

defineOptions({ name: 'NLabel' });

const props = withDefaults(defineProps<NLabelProps>(), {
  forId: undefined,
  required: false,
  size: 'xs',
  weight: 'medium',
  color: 'color-grey-80',
});

const styles = computed(() => ({
  color: props.color ? `var(--${props.color})` : undefined,
}));

const classes = computed(() => ({
  'n-label': true,
  [`n-label--${props.size}`]: true,
  [`n-label--${props.weight}`]: true,
}));
</script>

<style scoped>
.n-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-family-base);
  margin: 0;
}

.n-label--xs {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-sm);
}
.n-label--sm {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
}
.n-label--md {
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
}

.n-label--normal {
  font-weight: var(--font-weight-regular);
}
.n-label--medium {
  font-weight: var(--font-weight-medium);
}
.n-label--bold {
  font-weight: var(--font-weight-bold);
}

.n-label__required {
  color: var(--color-text-error);
}
</style>