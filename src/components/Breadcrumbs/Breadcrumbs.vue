<template>
  <div class="breadcrumbs">
    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20L9 11L3 2" stroke="#B6C7CF" stroke-opacity="0.3" stroke-width="5" />
      <path d="M13 20L18 11L13 2" stroke="#B6C7CF" stroke-opacity="0.3" stroke-width="5" />
    </svg>

    <template v-for="(part, idx) in scenarioParts" :key="idx">
      <span class="breadcrumbs__text">{{ part }}</span>
      <span v-if="idx < scenarioParts.length - 1" class="breadcrumbs__separator" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { BreadcrumbsProps } from './Breadcrumbs.types';

defineOptions({ name: 'NBreadcrumbs' });

defineProps<BreadcrumbsProps>();
</script>

<style scoped>
.breadcrumbs {
  position: relative;
  width: max-content;
  height: 18px;
  display: flex;
  align-items: center;
  background: none;
  gap: var(--space-2);
}

.breadcrumbs__text {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-sm);
  line-height: 1.22;
  color: var(--color-blue-50);
  display: flex;
  align-items: center;
}

.breadcrumbs__separator {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: var(--radius-round);
  background: var(--color-grey-20);
  margin: 0 var(--space-2);
}
</style>
