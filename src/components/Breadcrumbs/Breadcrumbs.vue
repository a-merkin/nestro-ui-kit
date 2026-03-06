<template>
  <div class="breadcrumbs">
    <Icon name="chevrons-right" size="sm" class="breadcrumbs__icon" />

    <template v-for="(part, idx) in scenarioParts" :key="idx">
      <span class="breadcrumbs__text">{{ part }}</span>
      <span v-if="idx < scenarioParts.length - 1" class="breadcrumbs__separator" />
    </template>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue';
import type { BreadcrumbsProps } from './Breadcrumbs.types';

defineOptions({ name: 'NBreadcrumbs' });

defineProps<BreadcrumbsProps>();
</script>

<style scoped>
.breadcrumbs {
  position: relative;
  width: max-content;
  display: flex;
  align-items: center;
  background: none;
  gap: var(--space-2);
}

.breadcrumbs__icon {
  color: var(--color-blue-30);
  opacity: 0.3;
}

.breadcrumbs__text {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
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
