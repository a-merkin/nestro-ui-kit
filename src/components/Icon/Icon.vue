<!-- Icon.vue -->
<template>
  <div class="icon" :class="iconClasses">
    <component :is="iconComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CheckIcon from '@/assets/icons/check.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import UniteIcon from '@/assets/icons/unite.svg';
import DownloadIcon from '@/assets/icons/download.svg';
import MagnifierIcon from '@/assets/icons/magnifier.svg';
import SettingsIcon from '@/assets/icons/settings.svg';

interface Props {
  name: 'check' | 'plus' | 'unite' | 'download' | 'magnifier' | 'settings';
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const { name, size, color } = withDefaults(defineProps<Props>(), {
  size: 'medium',
});

const iconComponents = {
  check: CheckIcon,
  plus: PlusIcon,
  unite: UniteIcon,
  download: DownloadIcon,
  magnifier: MagnifierIcon,
  settings: SettingsIcon,
};

const iconComponent = computed(() => {
  return iconComponents[name];
});

const iconClasses = computed(() => ({
  'icon': true,
  [`icon--${size}`]: true,
  'icon--custom-color': !!color,
}));
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon--small :deep(svg) {
  width: 16px;
  height: 16px;
}

.icon--medium :deep(svg) {
  width: 24px;
  height: 24px;
}

.icon--large :deep(svg) {
  width: 32px;
  height: 32px;
}

.icon--custom-color :deep(svg path) {
  fill: v-bind(color);
}

:deep(svg) {
  width: 100%;
  height: 100%;
  padding: 0;
}
</style> 