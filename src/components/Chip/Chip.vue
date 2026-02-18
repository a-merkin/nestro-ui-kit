<template>
  <div :class="chipClasses">
    <img v-if="image" :src="image" class="chip__image" alt="" />
    <Icon v-if="icon && !image" :name="icon" size="sm" class="chip__icon" />
    <span v-if="label" class="chip__label">{{ label }}</span>
    <slot />
    <button
      v-if="removable && !disabled"
      type="button"
      class="chip__remove"
      aria-label="Удалить"
      @click.stop="handleRemove"
    >
      <Icon name="close" size="sm" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../Icon/Icon.vue';
import type { ChipProps, ChipEmits } from './Chip.types';

defineOptions({ name: 'NChip' });

const props = withDefaults(defineProps<ChipProps>(), {
  removable: false,
  disabled: false,
});

const emit = defineEmits<ChipEmits>();

const handleRemove = () => {
  if (!props.disabled) {
    emit('remove');
  }
};

const chipClasses = computed(() => ({
  chip: true,
  'chip--removable': props.removable,
  'chip--disabled': props.disabled,
  'chip--with-image': !!props.image,
}));
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  height: var(--size-height-sm);
  padding: 0 var(--size-padding-horizontal-sm);
  border-radius: var(--radius-xl);
  background: var(--color-blue-70);
  font-family: var(--font-family-base);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-xs);
  color: var(--color-grey-70);
}

.chip--with-image {
  padding-left: 0;
}

.chip--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chip__image {
  width: var(--size-height-sm);
  height: var(--size-height-sm);
  border-radius: var(--radius-round);
  object-fit: cover;
  flex-shrink: 0;
}

.chip__icon {
  flex-shrink: 0;
}

.chip__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chip__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  border-radius: var(--radius-round);
  background: transparent;
  color: inherit;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}

.chip__remove:hover {
  background: var(--color-blue-40);
}
</style>
