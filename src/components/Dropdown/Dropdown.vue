<template>
  <div class="dropdown" :class="dropdownClasses">
    <label v-if="label" class="dropdown__label">{{ label }}</label>

    <div class="dropdown__trigger" :class="triggerClasses" @click="handleTriggerClick">
      <input
        v-if="searchable"
        ref="searchInputRef"
        v-model="searchQuery"
        type="text"
        :placeholder="selectedLabel"
        class="dropdown__search"
        :class="searchFieldClasses"
        :disabled="isDisabled"
        @input="onSearchInput"
      />
      <span v-else class="dropdown__selected" :class="selectedClasses">
        {{ selectedLabel }}
      </span>

      <div class="dropdown__actions">
        <button
          v-if="clearable && hasSelectedValue"
          class="dropdown__clear"
          type="button"
          @click.stop="handleClear"
        >
          <NIcon name="close" size="sm" />
        </button>

        <span class="dropdown__arrow">
          <NIcon v-if="!loading" name="arrow-down" size="md" />
          <NIcon v-else name="loading" size="md" class="dropdown__loader" />
        </span>
      </div>
    </div>

    <div v-if="isOpen" class="dropdown__content">
      <ul class="dropdown__list">
        <li
          v-for="option in filteredOptions"
          :key="getOptionValue(option)"
          class="dropdown__item"
          :class="getItemClasses(option)"
          @click="selectOption(option)"
        >
          <Tooltip
            v-if="showOptionTooltip"
            :text="getOptionLabel(option)"
            placement="right"
            :only-if-truncated="true"
          >
            {{ getOptionLabel(option) }}
          </Tooltip>

          <template v-else>
            {{ getOptionLabel(option) }}
          </template>
        </li>

        <li v-if="filteredOptions.length === 0" class="dropdown__item dropdown__item--no-results">
          Ничего не найдено
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { DropdownProps, DropdownEmits } from './Dropdown.types';
import NIcon from '../Icon/Icon.vue';
import Tooltip from '../Tooltip/Tooltip.vue';

defineOptions({ name: 'NDropdown' });

const props = withDefaults(defineProps<DropdownProps>(), {
  placeholder: 'Выберите значение',
  disabled: false,
  searchable: false,
  clearable: false,
  valueKey: 'value',
  labelKey: 'label',
  loading: false,
  showOptionTooltip: true,
});

const emit = defineEmits<DropdownEmits>();

const isOpen = ref(false);
const searchQuery = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);

const dropdownClasses = computed(() => ({
  'dropdown--open': isOpen.value,
}));

const triggerClasses = computed(() => ({
  'dropdown__trigger--disabled': isDisabled.value,
}));

const searchFieldClasses = computed(() => ({
  'dropdown__search--placeholder': !hasSelectedValue.value && !searchQuery.value,
}));

const selectedClasses = computed(() => ({
  'dropdown__selected--placeholder': !hasSelectedValue.value,
}));

const hasSelectedValue = computed(() => {
  return props.options.some((option) => getOptionValue(option) === props.modelValue);
});

const isDisabled = computed(() => props.disabled || props.loading);

const selectedLabel = computed(() => {
  if (props.loading) return 'Загрузка...';
  const selected = props.options.find((o) => getOptionValue(o) === props.modelValue);
  return selected ? getOptionLabel(selected) : props.placeholder;
});

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) return props.options;
  const query = searchQuery.value.toLowerCase();
  return props.options.filter((o) => getOptionLabel(o).toLowerCase().includes(query));
});

const getOptionValue = (option: any): string | number => option[props.valueKey];
const getOptionLabel = (option: any): string => option[props.labelKey];

const getItemClasses = (option: any) => ({
  'dropdown__item--selected': props.modelValue === getOptionValue(option),
});

const handleTriggerClick = () => {
  if (isDisabled.value) return;

  if (props.searchable && searchInputRef.value) {
    searchInputRef.value.focus();
    isOpen.value = !isOpen.value;
    return;
  }

  isOpen.value = !isOpen.value;
};

const onSearchInput = () => {
  if (!isOpen.value) isOpen.value = true;
};

const selectOption = (option: any) => {
  const value = getOptionValue(option);
  emit('update:modelValue', value);
  emit('change', value);
  isOpen.value = false;
  searchQuery.value = '';
};

const handleClear = () => {
  if (isDisabled.value) return;
  emit('update:modelValue', null);
  emit('change', null);
  emit('clear');
  searchQuery.value = '';
  if (props.searchable && searchInputRef.value) {
    searchInputRef.value.focus();
  }
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
.dropdown {
  $self: &;
  position: relative;
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;

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

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: var(--size-height-md);
    padding: 0 var(--size-padding-horizontal-md);
    background: var(--color-blue-60);
    border-radius: var(--radius-xl);
    color: var(--color-grey-100);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all var(--motion-standard);
    box-shadow: var(--shadow-sm);
    box-sizing: border-box;

    &--disabled {
      background: var(--color-grey-50);
      color: var(--color-grey-40);
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  &__search {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    color: var(--color-grey-100);
    padding: 0;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &::placeholder {
      color: var(--color-grey-100);
    }

    &--placeholder::placeholder {
      color: var(--color-grey-80);
    }
  }

  &__selected {
    flex: 1;
    color: var(--color-grey-100);
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--placeholder {
      color: var(--color-grey-80);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-left: var(--space-2);
    flex-shrink: 0;
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size-icon-md);
    height: var(--size-icon-md);
    border: none;
    background: none;
    cursor: pointer;
    color: var(--color-grey-80);
    border-radius: var(--radius-round);
    transition: transform var(--duration-fast) var(--easing-standard);
    padding: 0;
    flex-shrink: 0;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }

    #{$self}__trigger--disabled & {
      cursor: not-allowed;
      opacity: 0.5;
      &:hover {
        transform: none;
      }
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-grey-80);
    transition: transform var(--duration-medium) var(--easing-standard);
    flex-shrink: 0;

    #{$self}--open & {
      transform: rotate(180deg);
    }
  }

  &__content {
    position: absolute;
    top: calc(100% + var(--space-2));
    left: 0;
    width: 100%;
    background: var(--color-white);
    border: var(--border-width-sm) solid var(--color-blue-40);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-dropdown);
    animation: dropdown-fade-in var(--duration-fast) var(--easing-standard);
    max-height: 400px;
    overflow: hidden;
  }

  &__list {
    margin: 0;
    padding: var(--space-2) 0;
    list-style: none;
    max-height: 320px;
    overflow-y: auto;
  }

  &__item {
    padding: var(--space-3) var(--space-4);
    color: var(--color-grey-100);
    cursor: pointer;
    font-size: var(--font-size-sm);
    transition:
      background var(--duration-fast) var(--easing-standard),
      color var(--duration-fast) var(--easing-standard);
    border-radius: var(--radius-md);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background: var(--color-green-50);
      color: var(--color-green-100);
    }

    &--selected {
      background: var(--color-green-80);
      color: var(--color-green-100);
    }

    &--no-results {
      padding: var(--space-4);
      text-align: center;
      color: var(--color-grey-80);
      font-size: var(--font-size-sm);
      cursor: default;
      white-space: normal;

      &:hover {
        background: transparent;
        color: var(--color-grey-80);
      }
    }
  }

  &__loader {
    animation: spin 1s var(--easing-linear) infinite;
  }
}

@keyframes dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
