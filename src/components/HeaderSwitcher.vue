<template>
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
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  modelValue: string;
  tabs: { label: string; value: string }[];
}>();
const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.header-switcher-bg {
  padding: 8px 0 0 8px;
}
.header-switcher {
  display: flex;
  background: none;
  border-radius: 12px 12px 0 0;
  align-items: flex-end;
}
.header-switcher__tab {
  background: #fff;
  color: rgba(46, 57, 67, 0.80);
  border: none;
  border-radius: 12px;
  padding: 16px 32px 16px 32px;
  margin-right: 16px;
  margin-bottom: 0;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  position: relative;
  z-index: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @apply .typography-base;
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
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -2px 8px 0 rgba(0, 0, 0, 0.03);
  z-index: 2;
}
</style> 