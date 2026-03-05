<template>
    <component :is="asTag" class="n-flex" :style="styles">
      <slot />
    </component>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import type { NFlexProps } from './Flex.types';
  
  defineOptions({ name: 'NFlex' });
  
  const props = withDefaults(defineProps<NFlexProps>(), {
    as: 'div',
    align: 'stretch',
    justify: 'start',
    gap: undefined,
    wrap: false,
  });
  
  const asTag = computed(() => props.as);
  
  function spacingValue(token?: string) {
    if (!token) return undefined;
    if (token === '0') return '0px';
    return `var(--${token})`;
  }
  
  function alignValue(v: NFlexProps['align']) {
    if (v === 'start') return 'flex-start';
    if (v === 'end') return 'flex-end';
    return v; // center | stretch
  }
  
  function justifyValue(v: NFlexProps['justify']) {
    if (v === 'start') return 'flex-start';
    if (v === 'end') return 'flex-end';
    if (v === 'between') return 'space-between';
    if (v === 'around') return 'space-around';
    return 'center';
  }
  
  const styles = computed(() => ({
    alignItems: alignValue(props.align),
    justifyContent: justifyValue(props.justify),
    gap: spacingValue(props.gap),
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
  }));
  </script>
  
  <style scoped>
  .n-flex {
    display: flex;
  }
  </style>