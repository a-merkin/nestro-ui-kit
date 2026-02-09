<template>
  <span class="n-tooltip" @mouseenter="onEnter" @mouseleave="onLeave" @click="onClick">
    <span ref="triggerRef" class="n-tooltip__trigger">
      <slot />
    </span>

    <transition name="tooltip-fade">
      <teleport to="body">
        <div
          v-if="visible"
          ref="tooltipRef"
          class="n-tooltip__content"
          :class="`n-tooltip__content--${placement}`"
          :style="style"
          role="tooltip"
        >
          <slot name="tooltip">
            {{ text }}
          </slot>
        </div>
      </teleport>
    </transition>
  </span>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import type { TooltipProps } from './Tooltip.types';

defineOptions({ name: 'NTooltip' });

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  offset: 8,
  trigger: 'hover',
  onlyIfTruncated: false,
});

const visible = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);

const isTruncated = () => {
  const el = triggerRef.value;
  return !!el && el.scrollWidth > el.clientWidth;
};

const show = async () => {
  if (props.disabled) return;
  if (props.onlyIfTruncated && !isTruncated()) return;

  visible.value = true;
  await nextTick();
};

const hide = () => {
  if (props.trigger !== 'manual') visible.value = false;
};

const onEnter = () => props.trigger === 'hover' && show();
const onLeave = () => props.trigger === 'hover' && hide();
const onClick = () => props.trigger === 'click' && (visible.value ? hide() : show());

const style = computed(() => {
  const trigger = triggerRef.value;
  const tooltip = tooltipRef.value;
  if (!trigger || !tooltip) return {};

  const t = trigger.getBoundingClientRect();
  const tt = tooltip.getBoundingClientRect();
  const offset = props.offset;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  switch (props.placement) {
    case 'right':
      return {
        top: `${t.top + scrollY + t.height / 2 - tt.height / 2}px`,
        left: `${t.right + scrollX + offset}px`,
      };
    case 'left':
      return {
        top: `${t.top + scrollY + t.height / 2 - tt.height / 2}px`,
        left: `${t.left + scrollX - tt.width - offset}px`,
      };
    case 'bottom':
      return {
        top: `${t.bottom + scrollY + offset}px`,
        left: `${t.left + scrollX + t.width / 2 - tt.width / 2}px`,
      };
    default:
      return {
        top: `${t.top + scrollY - tt.height - offset}px`,
        left: `${t.left + scrollX + t.width / 2 - tt.width / 2}px`,
      };
  }
});
</script>

<style scoped lang="scss">
.n-tooltip {
  display: inline-flex;
  max-width: 100%;
}

.n-tooltip__trigger {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.n-tooltip__content {
  position: absolute;
  z-index: 3000;
  padding: 6px 10px;
  font-size: 13px;
  color: var(--color-text-invert, #fff);
  background: var(--color-bg-tooltip, #222c37);
  border-radius: var(--radius-sm, 6px);
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
