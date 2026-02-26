<template>
  <!-- BridgeModal -->
</template>

<script setup lang="ts">
import type { BridgeModalProps } from './BridgeModal.types';

defineProps<BridgeModalProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<style scoped lang="scss"></style>
