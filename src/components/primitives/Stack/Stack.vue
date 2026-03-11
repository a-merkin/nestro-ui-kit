<template>
  <NFlex :as="as" :align="align" :justify="justify" :gap="gap" class="n-stack">
    <slot />
  </NFlex>
</template>

<script setup lang="ts">
import NFlex from '../Flex/Flex.vue';
import type { NStackProps } from './Stack.types';

defineOptions({ name: 'NStack' });

withDefaults(defineProps<NStackProps>(), {
  as: 'div',
  gap: 'space-4',
  align: 'stretch',
  justify: 'start',
});
</script>

<style scoped>
.n-stack {
  flex-direction: column;
}
</style>
