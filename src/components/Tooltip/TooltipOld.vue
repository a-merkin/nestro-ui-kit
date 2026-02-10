<template>
  <span class="tooltip-wrapper" @mouseenter="onMouseEnter" @mouseleave="visible = false">
    <span ref="contentRef" class="tooltip-content">
      <slot />
    </span>

    <transition name="tooltip-fade">
      <teleport to="body">
        <div v-if="visible" class="tooltip" :class="`tooltip--${placement}`" :style="tooltipStyle">
          <slot name="tooltip">
            {{ text }}
          </slot>
        </div>
      </teleport>
    </transition>
  </span>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

interface Props {
  text?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  onlyIfTruncated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'right',
  onlyIfTruncated: true,
});

const contentRef = ref<HTMLElement | null>(null);
const visible = ref(false);
const tooltipStyle = ref({ top: '0px', left: '0px' });

const onMouseEnter = async () => {
  if (!contentRef.value) return;

  if (props.onlyIfTruncated) {
    const el = contentRef.value;
    const isTruncated = el.scrollWidth > el.clientWidth;
    if (!isTruncated) return;
  }

  visible.value = true;
  await nextTick();

  const rect = contentRef.value!.getBoundingClientRect();
  const tooltipEl = document.querySelector('.tooltip') as HTMLElement;
  if (!tooltipEl) return;

  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  switch (props.placement) {
    case 'right':
      tooltipStyle.value = {
        top: `${rect.top + scrollY + rect.height / 2 - tooltipEl.offsetHeight / 2}px`,
        left: `${rect.right + scrollX + 8}px`,
      };
      break;
    case 'left':
      tooltipStyle.value = {
        top: `${rect.top + scrollY + rect.height / 2 - tooltipEl.offsetHeight / 2}px`,
        left: `${rect.left + scrollX - tooltipEl.offsetWidth - 8}px`,
      };
      break;
    case 'top':
      tooltipStyle.value = {
        top: `${rect.top + scrollY - tooltipEl.offsetHeight - 8}px`,
        left: `${rect.left + scrollX + rect.width / 2 - tooltipEl.offsetWidth / 2}px`,
      };
      break;
    case 'bottom':
      tooltipStyle.value = {
        top: `${rect.bottom + scrollY + 8}px`,
        left: `${rect.left + scrollX + rect.width / 2 - tooltipEl.offsetWidth / 2}px`,
      };
      break;
  }
};
</script>

<style scoped lang="scss">
.tooltip-wrapper {
  position: relative;
  display: inline-block;
  max-width: 100%;
}

.tooltip-content {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tooltip {
  position: absolute;
  z-index: 3000;
  padding: 6px 10px;
  font-size: 13px;
  color: #fff;
  background: #222c37;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &--right {
    top: 50%;
    left: 100%;
    transform: translate(8px, -50%);
  }

  &--left {
    top: 50%;
    right: 100%;
    transform: translate(-8px, -50%);
  }

  &--top {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, -8px);
  }

  &--bottom {
    top: 100%;
    left: 50%;
    transform: translate(-50%, 8px);
  }
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}
</style>
