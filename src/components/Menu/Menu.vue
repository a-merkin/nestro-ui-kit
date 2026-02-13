<template>
  <div v-if="!popup" ref="rootRef" class="menu">
    <MenuList :items="model" @select="onSelect" />
  </div>

  <Teleport to="body">
    <div
      v-if="popup && isVisible"
      ref="popupRef"
      class="menu menu--popup"
      :style="popupStyle"
      @click.stop
    >
      <MenuList :items="model" @select="onSelect" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import type { MenuProps, MenuEmits, MenuCommandEvent } from './Menu.types';
import MenuList from './MenuList.vue';

defineOptions({ name: 'NMenu' });

const props = withDefaults(defineProps<MenuProps>(), {
  popup: false,
});

const emit = defineEmits<MenuEmits>();

const rootRef = ref<HTMLElement | null>(null);
const popupRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const popupStyle = ref<Record<string, string>>({});

function onSelect(event: MenuCommandEvent) {
  emit('select', event);
  if (props.popup) {
    hide();
  }
}

function toggle(event: Event) {
  if (isVisible.value) {
    hide();
  } else {
    show(event);
  }
}

function show(event: Event) {
  if (!props.popup) return;
  isVisible.value = true;

  nextTick(() => {
    positionPopup(event);
  });
}

function hide() {
  isVisible.value = false;
}

function positionPopup(event: Event) {
  const target = event.currentTarget as HTMLElement;
  if (!target || !popupRef.value) return;

  const rect = target.getBoundingClientRect();
  const popup = popupRef.value;
  const popupRect = popup.getBoundingClientRect();

  let top = rect.bottom + 4;
  let left = rect.left;

  // Adjust if overflows right
  if (left + popupRect.width > window.innerWidth - 8) {
    left = rect.right - popupRect.width;
  }

  // Adjust if overflows bottom — show above
  if (top + popupRect.height > window.innerHeight - 8) {
    top = rect.top - popupRect.height - 4;
  }

  // Clamp
  if (left < 8) left = 8;
  if (top < 8) top = 8;

  popupStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
  };
}

function handleClickOutside(event: MouseEvent) {
  if (!isVisible.value) return;
  if (popupRef.value && !popupRef.value.contains(event.target as Node)) {
    hide();
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && isVisible.value) {
    hide();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
  document.removeEventListener('keydown', handleEscape);
});

defineExpose({ toggle, show, hide });
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-blue-40);
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 24px rgba(31, 41, 55, 0.1);
  padding: var(--space-2) 0;
  min-width: 200px;
  box-sizing: border-box;
  overflow: hidden;

  &--popup {
    position: fixed;
    z-index: var(--z-popover);
    animation: menu-fade-in 0.15s ease;
  }
}

@keyframes menu-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
