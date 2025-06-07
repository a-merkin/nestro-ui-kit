<template>
  <div class="workplace-container">
    <div class="header-switcher-bg">
      <div class="header-switcher">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="['header-switcher__tab', { 'header-switcher__tab--active': tab.value === modelValue }]"
          @click="$emit('update:modelValue', tab.value)"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    <div class="workplace-content" :class="{ 'workplace-content--no-top-left': isFirstTabActive }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  tabs: { label: string; value: string }[];
}>();
const emit = defineEmits(['update:modelValue']);

const isFirstTabActive = computed(() => {
  return props.tabs.length > 0 && props.modelValue === props.tabs[0].value;
});
</script>

<style scoped>
.workplace-container {
  width: 100%;
}
.header-switcher-bg {
  background: none;
}
.header-switcher {
  display: flex;
  background: none;
  border-radius: 12px 12px 0 0;
  align-items: flex-end;
  position: relative;
  z-index: 2;
  gap: 8px;
}
.header-switcher__tab {
  background: #fff;
  color: rgba(46, 57, 67, 0.80);
  border: none;
  border-radius: 10px;
  padding: 16px 32px 16px 32px;
  margin: 0;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  position: relative;
  z-index: 2;
  white-space: nowrap;
  text-overflow: ellipsis;
  @apply .typography-base;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}
.header-switcher__tab:last-child {
  margin-right: 0;
}
.header-switcher__tab--active {
  color: #2E3943;
  font-weight: 700;
  border-top: 1px solid #b3d3f9;
  border-left: 1px solid #b3d3f9;
  border-right: 1px solid #b3d3f9;
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.03);
  z-index: 3;
  background: #fff;
}
.header-switcher__tab--active::after {
  content: '';
  display: block;
  position: absolute;
  left: -1px;
  right: -1px;
  bottom: -7.3px;
  height: 8px;
  background: #fff;
  border-left: 1px solid #b3d3f9;
  border-right: 1px solid #b3d3f9;
  z-index: 4;
}
.workplace-content {
  flex: 1 1 auto;
  overflow: auto;
  height: 100%;
  min-height: 0;

  background: #fff;
  border: 1px solid #b3d3f9;
  /* border-top: none; */
  border-radius: 15px;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.04);
  padding: 24px;
  margin-top: -2px;
  position: relative;
  z-index: 1;
}
.workplace-content--no-top-left {
  border-top-left-radius: 0;
}
</style> 