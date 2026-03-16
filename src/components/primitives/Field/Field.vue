<template>
  <div class="n-field" :class="rootClasses">
    <NLabel v-if="label" :for-id="fieldId" :required="required" class="n-field__label">
      {{ label }}
    </NLabel>

    <div class="n-field__control">
      <slot />
    </div>

    <p v-if="error && errorMessage" class="n-field__error" role="alert">
      {{ errorMessage }}
    </p>

    <p v-else-if="hint && !error" class="n-field__hint">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NFieldProps } from './Field.types';
import NLabel from '../Label/Label.vue';

defineOptions({ name: 'NField' });

const props = withDefaults(defineProps<NFieldProps>(), {
  label: undefined,
  hint: undefined,
  error: false,
  errorMessage: undefined,
  required: false,
  disabled: false,
  fieldId: undefined,
});

const rootClasses = computed(() => ({
  'n-field--error': props.error,
  'n-field--disabled': props.disabled,
}));
</script>

<style scoped>
.n-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-family: var(--font-family-base);
}

.n-field__label {
  margin-bottom: var(--space-1);
}

.n-field__control {
  display: flex;
  flex-direction: column;
}

.n-field__error {
  margin: 0;
  padding-left: var(--size-padding-horizontal-md);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-sm);
  color: var(--color-text-error);
}

.n-field__hint {
  margin: 0;
  padding-left: var(--size-padding-horizontal-md);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-sm);
  color: var(--color-grey-80);
}
</style>
