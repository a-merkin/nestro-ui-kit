<template>
  <component :is="tag" :class="classes" :style="styles">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NHeadingProps } from './Heading.types';

defineOptions({ name: 'NHeading' });

const props = withDefaults(defineProps<NHeadingProps>(), {
  level: 2,
  size: 'lg',
  weight: 'bold',
  color: undefined,
  truncate: false,
});

const tag = computed(() => `h${props.level}` as const);

const styles = computed(() => ({
  color: props.color ? `var(--${props.color})` : undefined,
}));

const classes = computed(() => ({
  'n-heading': true,
  [`n-heading--${props.size}`]: true,
  [`n-heading--${props.weight}`]: true,
  'n-heading--truncate': props.truncate,
}));
</script>

<style scoped>
.n-heading {
  font-family: var(--font-family-base);
  margin: 0;
}

.n-heading--xs {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
}
.n-heading--sm {
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
}
.n-heading--md {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-md);
}
.n-heading--lg {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-lg);
}

/* weight mapping */
.n-heading--normal {
  font-weight: var(--font-weight-regular);
}
.n-heading--medium {
  font-weight: var(--font-weight-medium);
}
.n-heading--bold {
  font-weight: var(--font-weight-bold);
}

.n-heading--truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>