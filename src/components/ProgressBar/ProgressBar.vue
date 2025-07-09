<!-- ProgressBar.vue -->
<template>
  <div class="progress-bar">
    <div class="progress-bar__track">
      <div class="progress-bar__track-bg" />
      <div class="progress-bar__track-fill" :style="{ width: `${clampedValue}%` }" />
    </div>
    <div v-if="showLabel" class="progress-bar__label">{{ Math.round(clampedValue) }}%</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  value?: number;
  showLabel?: boolean;
  width?: number;
}

const { value, showLabel, width } = withDefaults(defineProps<Props>(), {
  value: 0,
  showLabel: true,
  width: 200,
});

const clampedValue = computed(() => {
  return Math.max(0, Math.min(100, value));
});
</script>

<style scoped lang="scss">
.progress-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar__track {
  position: relative;
  height: 5px;
  width: v-bind('width + "px"');
}

.progress-bar__track-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #cfd7db;
  border-radius: 2.5px;
}

.progress-bar__track-fill {
  position: absolute;
  top: -0.5px;
  left: 0;
  height: 6px;
  background-color: #009639;
  border-radius: 3px;
  transition: width 0.3s ease;
  z-index: 1;
}

.progress-bar__label {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25em;
  color: #000000;
  text-align: center;
  min-width: 40px;
}
</style>
