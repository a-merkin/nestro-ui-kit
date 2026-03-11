<template>
  <component :is="asTag" :class="classes" :style="styles">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NTextProps } from './Text.types';

defineOptions({ name: 'NText' });

const props = withDefaults(defineProps<NTextProps>(), {
  as: 'span',
  size: 'md',
  weight: 'normal',
  color: undefined,
  truncate: false,
});

const asTag = computed(() => props.as);

const styles = computed(() => ({
  color: props.color ? `var(--${props.color})` : undefined,
}));

const classes = computed(() => ({
  'n-text': true,
  [`n-text--${props.size}`]: true,
  [`n-text--${props.weight}`]: true,
  'n-text--truncate': props.truncate,
}));
</script>

<style scoped>
.n-text {
  font-family: var(--font-family-base);
  margin: 0;
}

.n-text--xs {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-sm);
}
.n-text--sm {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
}
.n-text--md {
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
}
.n-text--lg {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-md);
}

.n-text--normal {
  font-weight: var(--font-weight-regular);
}
.n-text--medium {
  font-weight: var(--font-weight-medium);
}
.n-text--bold {
  font-weight: var(--font-weight-bold);
}

.n-text--truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
