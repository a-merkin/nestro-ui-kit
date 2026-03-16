<template>
  <div :class="rootClasses">
    <label v-if="labelComputed" class="textarea__label">
      <slot name="label">{{ labelComputed }}</slot>
    </label>

    <div class="textarea__control">
      <textarea
        :id="id"
        class="textarea__field"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :cols="cols"
        :maxlength="maxlength"
        :name="name"
        :autofocus="autofocus"
        :aria-invalid="error || undefined"
        :aria-describedby="describedBy || undefined"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>

    <div v-if="bottomVisible" class="textarea__bottom">
      <div class="textarea__messages">
        <p v-if="error && errorComputed" :id="errorId" class="textarea__error" role="alert">
          <slot name="error">{{ errorComputed }}</slot>
        </p>

        <p v-else-if="hintComputed" :id="hintId" class="textarea__hint">
          <slot name="hint">{{ hintComputed }}</slot>
        </p>
      </div>

      <div v-if="showCount && maxlength != null" class="textarea__count">
        {{ String(modelValue).length }}/{{ maxlength }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TextareaEmits, TextareaProps } from './Textarea.types';

defineOptions({ name: 'NTextarea' });

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  variant: 'default',
  disabled: false,
  readonly: false,
  required: false,

  error: false,
  errorMessage: undefined,

  rows: 4,
  cols: undefined,
  maxlength: undefined,

  placeholder: '',
  label: '',
  hint: '',

  autofocus: false,
  resize: 'vertical',
  showCount: false,

  id: undefined,
  name: undefined,
});

const emit = defineEmits<TextareaEmits>();

const hintId = computed(() => (props.id ? `${props.id}__hint` : undefined));
const errorId = computed(() => (props.id ? `${props.id}__error` : undefined));

const labelComputed = computed(() => props.label || undefined);
const hintComputed = computed(() => props.hint || undefined);
const errorComputed = computed(() => props.errorMessage || undefined);

const describedBy = computed(() => {
  if (props.error && errorComputed.value && errorId.value) return errorId.value;
  if (hintComputed.value && hintId.value) return hintId.value;
  return undefined;
});

const bottomVisible = computed(() => {
  const hasMsg = (props.error && !!errorComputed.value) || (!!hintComputed.value && !props.error);
  const hasCount = props.showCount && props.maxlength != null;
  return hasMsg || hasCount;
});

const rootClasses = computed(() => ({
  textarea: true,
  [`textarea--${props.variant}`]: true,
  [`textarea--resize-${props.resize}`]: true,
  'textarea--disabled': props.disabled,
  'textarea--readonly': props.readonly,
  'textarea--invalid': props.error,
}));

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  emit('input', event);
};

const onChange = (event: Event) => {
  emit('change', event);
};

const onFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const onBlur = (event: FocusEvent) => {
  emit('blur', event);
};
</script>

<style scoped>
.textarea {
  display: grid;
  gap: var(--space-2);
  font-family: var(--font-family-base);
}

.textarea__label {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-sm);
  color: var(--color-grey-80);
}

.textarea__control {
  position: relative;
}

.textarea__field {
  width: 100%;
  min-height: calc(var(--size-height-md) * 2);
  padding: var(--space-3) var(--space-3);

  border-radius: var(--radius-xl);
  border: var(--border-width-sm) solid var(--color-stroke-primary);
  background-color: var(--color-bg-input);
  color: var(--color-black);

  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-md);

  outline: none;
  transition:
    border-color var(--motion-standard),
    box-shadow var(--motion-standard),
    background-color var(--motion-standard);
}

.textarea:not(.textarea--invalid):not(.textarea--disabled) .textarea__field:hover:not(:focus) {
  border-color: var(--color-stroke-hover);
}

.textarea__field:focus {
  border-color: var(--color-green-90);
}

.textarea--disabled .textarea__field {
  background-color: var(--color-bg-input-disabled);
  border-color: var(--color-stroke-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.textarea--readonly .textarea__field {
  background-color: var(--color-bg-input-disabled);
}

.textarea--invalid .textarea__field {
  border-color: var(--color-stroke-error);
}

.textarea--invalid .textarea__field:focus {
  border-color: var(--color-stroke-error);
}

.textarea__bottom {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
}

.textarea__messages {
  flex: 1;
  min-width: 0;
}

.textarea__hint {
  margin: 0;
  font-size: var(--font-size-xs);
  line-height: var(--line-height-sm);
  color: var(--color-grey-80);
}

.textarea__error {
  margin: 0;
  font-size: var(--font-size-xs);
  line-height: var(--line-height-sm);
  color: var(--color-red-90);
}

.textarea__count {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-sm);
  color: var(--color-grey-80);
  white-space: nowrap;
}

.textarea--filled .textarea__field {
  background-color: var(--color-bg-input);
  border-color: transparent;
}

.textarea--filled .textarea__field:focus {
  border-color: var(--color-green-90);
}

.textarea--resize-none .textarea__field {
  resize: none;
}
.textarea--resize-vertical .textarea__field {
  resize: vertical;
}
.textarea--resize-horizontal .textarea__field {
  resize: horizontal;
}
.textarea--resize-both .textarea__field {
  resize: both;
}
</style>
