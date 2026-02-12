<template>
  <div class="input-number" :class="rootClasses">
    <label v-if="label" class="input-number__label">{{ label }}</label>

    <div class="input-number__wrapper" :class="wrapperClasses">
      <button
        v-if="showButtons && buttonLayout === 'horizontal'"
        class="input-number__btn input-number__btn--dec input-number__btn--horizontal"
        type="button"
        :disabled="disabled || isAtMin"
        @mousedown="startDecrement"
        @mouseup="stopRepeat"
        @mouseleave="stopRepeat"
      >
        <NIcon name="minus" size="sm" />
      </button>

      <div class="input-number__field">
        <span v-if="prefix" class="input-number__prefix">{{ prefix }}</span>
        <input
          ref="inputRef"
          class="input-number__control"
          :class="controlClasses"
          type="text"
          inputmode="decimal"
          :value="displayValue"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="onInput"
          @keydown="onKeydown"
          @focus="onFocus"
          @blur="onBlur"
        />
        <span v-if="suffix" class="input-number__suffix">{{ suffix }}</span>
      </div>

      <div v-if="showButtons && buttonLayout === 'stacked'" class="input-number__stacked">
        <button
          class="input-number__btn input-number__btn--inc input-number__btn--stacked-top"
          type="button"
          :disabled="disabled || isAtMax"
          @mousedown="startIncrement"
          @mouseup="stopRepeat"
          @mouseleave="stopRepeat"
        >
          <NIcon name="arrow-down" size="sm" />
        </button>
        <button
          class="input-number__btn input-number__btn--dec input-number__btn--stacked-bottom"
          type="button"
          :disabled="disabled || isAtMin"
          @mousedown="startDecrement"
          @mouseup="stopRepeat"
          @mouseleave="stopRepeat"
        >
          <NIcon name="arrow-down" size="sm" />
        </button>
      </div>

      <button
        v-if="showButtons && buttonLayout === 'horizontal'"
        class="input-number__btn input-number__btn--inc input-number__btn--horizontal"
        type="button"
        :disabled="disabled || isAtMax"
        @mousedown="startIncrement"
        @mouseup="stopRepeat"
        @mouseleave="stopRepeat"
      >
        <NIcon name="plus" size="sm" />
      </button>
    </div>

    <p v-if="error && errorMessage" class="input-number__error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import type { InputNumberProps, InputNumberEmits } from './InputNumber.types';
import NIcon from '../Icon/Icon.vue';

defineOptions({ name: 'NInputNumber' });

const props = withDefaults(defineProps<InputNumberProps>(), {
  step: 1,
  minFractionDigits: 0,
  maxFractionDigits: 0,
  placeholder: '',
  disabled: false,
  error: false,
  showButtons: false,
  buttonLayout: 'stacked',
  useGrouping: false,
});

const emit = defineEmits<InputNumberEmits>();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const editingRaw = ref<string | null>(null);
let repeatTimer: ReturnType<typeof setTimeout> | null = null;
let repeatInterval: ReturnType<typeof setInterval> | null = null;

// --- Computed ---

const rootClasses = computed(() => ({
  'input-number--disabled': props.disabled,
  'input-number--buttons-horizontal': props.showButtons && props.buttonLayout === 'horizontal',
  'input-number--buttons-stacked': props.showButtons && props.buttonLayout === 'stacked',
}));

const wrapperClasses = computed(() => ({
  'input-number__wrapper--error': props.error,
  'input-number__wrapper--disabled': props.disabled,
  'input-number__wrapper--focused': isFocused.value,
}));

const controlClasses = computed(() => ({
  'input-number__control--with-prefix': !!props.prefix,
  'input-number__control--with-suffix': !!props.suffix,
}));

const isAtMin = computed(() => {
  if (props.min === undefined || props.modelValue === null) return false;
  return props.modelValue <= props.min;
});

const isAtMax = computed(() => {
  if (props.max === undefined || props.modelValue === null) return false;
  return props.modelValue >= props.max;
});

const displayValue = computed(() => {
  if (isFocused.value && editingRaw.value !== null) {
    return editingRaw.value;
  }
  if (props.modelValue === null || props.modelValue === undefined) return '';
  return formatNumber(props.modelValue);
});

// --- Formatting ---

function formatNumber(value: number): string {
  const digits = Math.max(props.minFractionDigits, 0);
  const maxDigits = Math.max(props.maxFractionDigits, digits);

  let formatted: string;
  if (maxDigits > 0) {
    // Show at least minFractionDigits, up to maxFractionDigits
    formatted = value.toFixed(maxDigits);
    // Trim trailing zeros but keep at least minFractionDigits
    if (digits < maxDigits) {
      const [intPart, decPart] = formatted.split('.');
      const trimmed = decPart.replace(/0+$/, '');
      const finalDec = trimmed.padEnd(digits, '0');
      formatted = finalDec ? `${intPart}.${finalDec}` : intPart;
    }
  } else {
    formatted = String(Math.round(value));
  }

  if (props.useGrouping) {
    const [intPart, decPart] = formatted.split('.');
    const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    formatted = decPart !== undefined ? `${grouped}.${decPart}` : grouped;
  }

  return formatted;
}

function parseInput(raw: string): number | null {
  // Remove grouping spaces
  let cleaned = raw.replace(/\s/g, '');
  // Replace comma with dot
  cleaned = cleaned.replace(',', '.');
  // Remove everything except digits, dot, minus
  cleaned = cleaned.replace(/[^\d.\-]/g, '');

  if (cleaned === '' || cleaned === '-' || cleaned === '.') return null;

  const parsed = parseFloat(cleaned);
  if (isNaN(parsed)) return null;
  return parsed;
}

function clampValue(value: number): number {
  let v = value;
  if (props.min !== undefined && v < props.min) v = props.min;
  if (props.max !== undefined && v > props.max) v = props.max;
  return v;
}

function roundToStep(value: number): number {
  if (props.maxFractionDigits > 0) {
    const factor = Math.pow(10, props.maxFractionDigits);
    return Math.round(value * factor) / factor;
  }
  return Math.round(value);
}

// --- Handlers ---

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  const raw = target.value;

  // Allow user to type freely while focused — validate on blur
  editingRaw.value = raw;

  const parsed = parseInput(raw);
  if (parsed !== null) {
    const clamped = clampValue(parsed);
    emit('update:modelValue', roundToStep(clamped));
  } else if (raw === '' || raw === '-') {
    emit('update:modelValue', null);
  }
}

function onKeydown(e: KeyboardEvent) {
  // Allow: backspace, delete, tab, escape, enter, arrows, home, end
  const allowed = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
  ];
  if (allowed.includes(e.key)) return;

  // Allow Ctrl/Cmd + A, C, V, X
  if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) return;

  // ArrowUp / ArrowDown for increment/decrement
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    increment();
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    decrement();
    return;
  }

  // Allow digits
  if (/^\d$/.test(e.key)) return;

  // Allow dot and comma (decimal separator)
  if (e.key === '.' || e.key === ',') {
    if (props.maxFractionDigits === 0 && props.minFractionDigits === 0) {
      e.preventDefault();
      return;
    }
    // Only one decimal point allowed
    const input = e.target as HTMLInputElement;
    if (input.value.includes('.') || input.value.includes(',')) {
      e.preventDefault();
    }
    return;
  }

  // Allow minus only at start
  if (e.key === '-') {
    const input = e.target as HTMLInputElement;
    if (input.selectionStart !== 0 || input.value.includes('-')) {
      e.preventDefault();
    }
    return;
  }

  // Block everything else
  e.preventDefault();
}

function onFocus(e: FocusEvent) {
  isFocused.value = true;
  // Show raw editable value
  if (props.modelValue !== null && props.modelValue !== undefined) {
    editingRaw.value = formatNumber(props.modelValue).replace(/\s/g, '');
  } else {
    editingRaw.value = '';
  }
  emit('focus', e);
}

function onBlur(e: FocusEvent) {
  isFocused.value = false;

  // Finalize value on blur
  if (editingRaw.value !== null) {
    const parsed = parseInput(editingRaw.value);
    if (parsed !== null) {
      const clamped = clampValue(parsed);
      const rounded = roundToStep(clamped);
      emit('update:modelValue', rounded);
      emit('change', rounded);
    } else {
      emit('update:modelValue', null);
      emit('change', null);
    }
  }

  editingRaw.value = null;
  emit('blur', e);
}

// --- Increment / Decrement ---

function increment() {
  const current = props.modelValue ?? 0;
  const next = clampValue(roundToStep(current + props.step));
  emit('update:modelValue', next);
  emit('change', next);
}

function decrement() {
  const current = props.modelValue ?? 0;
  const next = clampValue(roundToStep(current - props.step));
  emit('update:modelValue', next);
  emit('change', next);
}

function startIncrement() {
  if (props.disabled) return;
  increment();
  repeatTimer = setTimeout(() => {
    repeatInterval = setInterval(increment, 75);
  }, 400);
}

function startDecrement() {
  if (props.disabled) return;
  decrement();
  repeatTimer = setTimeout(() => {
    repeatInterval = setInterval(decrement, 75);
  }, 400);
}

function stopRepeat() {
  if (repeatTimer) {
    clearTimeout(repeatTimer);
    repeatTimer = null;
  }
  if (repeatInterval) {
    clearInterval(repeatInterval);
    repeatInterval = null;
  }
}

onUnmounted(() => {
  stopRepeat();
});
</script>

<style scoped lang="scss">
.input-number {
  $self: &;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;

  &__label {
    display: block;
    margin-bottom: var(--space-2);
    color: var(--color-grey-70);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // Wrapper (border container)
  &__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--size-height-md);
    background: rgba(182, 199, 207, 0.15);
    border: 1px solid var(--color-stroke-primary, rgba(162, 177, 184, 0.51));
    border-radius: 60px;
    transition: all 0.2s ease;
    box-sizing: border-box;
    overflow: hidden;

    &--focused {
      border-color: var(--color-green-90);
    }

    &--error {
      border-color: var(--color-stroke-error, #ed6e1c);
    }

    &--disabled {
      background: rgba(218, 218, 218, 0.15);
      border-color: rgba(225, 225, 225, 0.51);
      cursor: not-allowed;
    }
  }

  // Inner field (input + prefix/suffix)
  &__field {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 var(--size-padding-horizontal-md);
  }

  &__prefix,
  &__suffix {
    flex-shrink: 0;
    color: var(--color-grey-80);
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    user-select: none;
    white-space: nowrap;
  }

  &__prefix {
    margin-right: var(--space-1);
  }

  &__suffix {
    margin-left: var(--space-1);
  }

  // Input control
  &__control {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    outline: none;
    color: var(--color-text-primary);
    font-family: var(--font-family-base);
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    min-width: 0;

    &::placeholder {
      color: rgba(120, 151, 166, 0.6);
    }

    &:disabled {
      color: var(--color-text-disabled, #e1e1e1);
      cursor: not-allowed;
    }
  }

  // Buttons - horizontal layout
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--color-grey-70);
    transition:
      background-color 0.15s ease,
      color 0.15s ease;
    padding: 0;
    flex-shrink: 0;

    &:hover:not(:disabled) {
      background: var(--color-blue-60);
      color: var(--color-green-90);
    }

    &:active:not(:disabled) {
      background: var(--color-blue-70);
    }

    &:disabled {
      color: var(--color-grey-40);
      cursor: not-allowed;
      opacity: 0.5;
    }

    &--horizontal {
      width: var(--size-height-md);
      height: 100%;
    }
  }

  // Stacked buttons (right side)
  &__stacked {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-left: 1px solid var(--color-stroke-primary, rgba(162, 177, 184, 0.51));
  }

  &__btn--stacked-top,
  &__btn--stacked-bottom {
    flex: 1;
    width: var(--size-height-sm);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__btn--stacked-top {
    border-bottom: 1px solid var(--color-stroke-primary, rgba(162, 177, 184, 0.51));
    transform: rotate(180deg);
  }

  // Error message
  &__error {
    margin-top: var(--space-1);
    padding-left: var(--size-padding-horizontal-md);
    font-size: var(--font-size-xs);
    color: var(--color-text-error, #ed6e1c);
  }
}
</style>
