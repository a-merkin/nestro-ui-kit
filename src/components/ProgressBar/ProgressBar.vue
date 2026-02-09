<template>
  <div class="progress-bar">
    <div class="progress-bar__track" :style="{ width: progressWidth }">
      <div class="progress-bar__track-bg" />
      <div class="progress-bar__track-fill" :style="{ width: clampedValue + '%' }" />
    </div>
    <div v-if="props.showLabel" class="progress-bar__label">{{ Math.round(clampedValue) }}%</div>
  </div>
</template>

<script setup lang="ts">
import type { ProgressBarProps } from './ProgressBar.types';
import { computed } from 'vue';

defineOptions({ name: 'NProgressBar' });

const props = withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
  showLabel: true,
  width: 200,
}) as ProgressBarProps;

const clampedValue = computed(() => {
  const val = props.value ?? 0;
  return Math.max(0, Math.min(100, val));
});

const progressWidth = computed(() => `${props.width}px`);
</script>

<style scoped lang="scss">
.progress-bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.progress-bar__track {
  position: relative;
  height: 5px;
  border-radius: var(--radius-sm);
  background: transparent;
}

.progress-bar__track-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-blue-30);
  border-radius: var(--radius-sm);
}

.progress-bar__track-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--color-green-90);
  border-radius: var(--radius-sm);
  transition: width 0.3s ease;
}

.progress-bar__label {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-black);
  min-width: 40px;
  text-align: center;
}
</style>
