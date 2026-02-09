<template>
  <div class="workplace">
    <div class="workplace__tabs-bg">
      <div class="workplace__tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          :class="['workplace__tab', { 'workplace__tab--active': tab.value === modelValue }]"
          :title="tab.label"
          @click="emit('update:modelValue', tab.value)"
        >
          <span class="workplace__tab-label">{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <div
      class="workplace__content"
      :class="{ 'workplace__content--no-top-left': isFirstTabActive }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { WorkPlaceProps } from './WorkPlace.types';

defineOptions({ name: 'NWorkplace' });

const props = defineProps<WorkPlaceProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isFirstTabActive = computed(() => {
  return props.tabs.length > 0 && props.modelValue === props.tabs[0].value;
});
</script>

<style scoped>
.workplace {
  width: 1900px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.workplace__tabs-bg {
  background: none;
}

.workplace__tabs {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  position: relative;
  z-index: 2;
}

.workplace__tab {
  background: #fff;
  color: rgba(46, 57, 67, 0.8);
  border: none;
  border-radius: 10px;
  padding: 16px 32px;
  margin-bottom: 8px;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    box-shadow 0.2s;
  position: relative;
  z-index: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-width: 215px;
  max-width: 215px;
}

.workplace__tab-label {
  display: block;
  width: 100%;
  margin: 0;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.workplace__tab--active {
  color: #2e3943;
  background: #fafafa;
  font-weight: 700;
  border-top: 1px solid #b3d3f9;
  border-left: 1px solid #b3d3f9;
  border-right: 1px solid #b3d3f9;
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03);
  z-index: 3;
}

.workplace__tab--active::after {
  content: '';
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: -9px;
  height: 9px;
  background: #fafafa;
  border-left: 1px solid #b3d3f9;
  border-right: 1px solid #b3d3f9;
  z-index: 4;
}

.workplace__content {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  height: 100%;
  background: #fafafa;
  border: 1px solid #b3d3f9;
  border-radius: 15px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 1;
  padding: 10px;
}

.workplace__content--no-top-left {
  border-top-left-radius: 0;
}
</style>
