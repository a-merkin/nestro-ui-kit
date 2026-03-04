<template>
  <div
    ref="containerRef"
    class="segmented-control"
    :class="{
      'segmented-control--disabled': disabled,
    }"
    role="radiogroup"
  >
    <div class="segmented-control__indicator" :style="indicatorStyle" />

    <button
      v-for="(option, index) in options"
      :key="option.value"
      :ref="(el) => setButtonRef(el, index)"
      type="button"
      role="radio"
      :aria-checked="isActive(option.value)"
      :disabled="disabled || option.disabled"
      :class="[
        'segmented-control__segment',
        { 'segmented-control__segment--active': isActive(option.value) },
      ]"
      @click="select(option.value)"
    >
      <slot name="segment" :option="option" :active="isActive(option.value)">
        {{ option.label }}
      </slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, type ComponentPublicInstance } from 'vue';
import type { SegmentedControlProps, SegmentedControlValue } from './SegmentedControl.types';

defineOptions({ name: 'NSegmentedControl' });

const props = withDefaults(defineProps<SegmentedControlProps>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: SegmentedControlValue): void;
  (e: 'change', value: SegmentedControlValue): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const buttonRefs = ref<(HTMLElement | null)[]>([]);
const isReady = ref(false);

const setButtonRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  buttonRefs.value[index] = el as HTMLElement | null;
};

const indicatorStyle = ref<Record<string, string>>({
  width: '0px',
  transform: 'translateX(0px)',
  transition: 'none',
});

const isActive = (value: SegmentedControlValue) => value === props.modelValue;

const updateIndicator = () => {
  nextTick(() => {
    const index = props.options.findIndex((o) => o.value === props.modelValue);
    const button = buttonRefs.value[index];
    const container = containerRef.value;

    if (!button || !container) return;

    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    indicatorStyle.value = {
      width: `${buttonRect.width}px`,
      transform: `translateX(${buttonRect.left - containerRect.left}px)`,
      transition: isReady.value
        ? `all var(--duration-fast) var(--easing-standard)`
        : 'none',
    };

    if (!isReady.value) {
      requestAnimationFrame(() => {
        isReady.value = true;
      });
    }
  });
};

const select = (value: SegmentedControlValue) => {
  if (props.disabled || value === props.modelValue) return;
  emit('update:modelValue', value);
  emit('change', value);
};

watch(() => props.modelValue, updateIndicator);
watch(() => props.options, updateIndicator, { deep: true });

onMounted(updateIndicator);
</script>

<style scoped lang="scss">
.segmented-control {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  gap: var(--space-1);
  padding: var(--space-1);
  background: var(--segmented-bg, var(--color-white));
  border: 1px solid var(--segmented-border, var(--color-blue-30));
  border-radius: var(--radius-xl);

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__indicator {
    position: absolute;
    top: var(--space-1);
    left: var(--space-1);
    height: calc(100% - var(--space-2));
    background: var(--segmented-indicator-bg, var(--color-green-90));
    border-radius: var(--radius-xl);
    pointer-events: none;
    z-index: 0;
  }

  &__segment {
    position: relative;
    z-index: 1;
    flex: 1;
    padding: var(--space-3) var(--space-6);
    border: none;
    border-radius: var(--radius-xl);
    background: transparent;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--segmented-text, var(--color-black));
    cursor: pointer;
    white-space: nowrap;
    min-width: fit-content;
    transition:
      color var(--motion-standard),
      background var(--motion-standard);

    &:hover:not(:disabled):not(&--active) {
      background: var(--segmented-hover-bg, rgba(244, 247, 248, 0.5));
    }

    &--active {
      color: var(--segmented-active-text, var(--color-white));
      cursor: default;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid var(--segmented-focus, var(--color-green-90));
      outline-offset: 2px;
    }
  }
}
</style>
