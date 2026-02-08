<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :class="['icon', customClass]"
    :style="{
      width: sizeVar,
      height: sizeVar,
      color: colorVar,
    }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IconProps } from './Icon.types';

defineOptions({ name: 'NIcon' });

const props = defineProps<IconProps>();

const icons = import.meta.glob('../../assets/icons/*.svg', { eager: true, import: 'default' });

const iconComponent = computed(() => {
  const mod = icons[`../../assets/icons/${props.name}.svg`] as any;
  if (!mod) console.warn('Icon not found:', props.name);
  return mod || null;
});

const sizeVar = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'var(--size-icon-sm)';
    case 'md':
      return 'var(--size-icon-md)';
    case 'lg':
      return 'var(--size-icon-lg)';
    default:
      return 'var(--size-icon-md)';
  }
});

const colorVar = computed(() => {
  if (!props.color) return 'currentColor';
  switch (props.color) {
    case 'white':
      return 'var(--color-white)';
    case 'black':
      return 'var(--color-black)';
    case 'green-100':
      return 'var(--color-green-100)';
    case 'green-90':
      return 'var(--color-green-90)';
    case 'green-80':
      return 'var(--color-green-80)';
    case 'green-50':
      return 'var(--color-green-50)';
    case 'orange':
      return 'var(--color-orange)';
    default:
      return props.color;
  }
});
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
