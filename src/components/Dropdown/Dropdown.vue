<template>
  <div class="dropdown" :class="dropdownClasses">
    <div class="dropdown__trigger" :class="triggerClasses" @click="handleTriggerClick">
      <input
        v-if="searchable"
        ref="searchInputRef"
        v-model="searchQuery"
        type="text"
        :placeholder="selectedLabel"
        class="dropdown__search"
        :class="searchFieldClasses"
        :disabled="disabled"
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
          <CloseIcon />
        </button>
        <span class="dropdown__arrow">
          <ArrowIcon />
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
          {{ getOptionLabel(option) }}
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
import CloseIcon from './CloseIcon.vue';
import ArrowIcon from './ArrowIcon.vue';

interface Props {
  modelValue: string | number | null;
  options: any[];
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  valueKey?: string;
  labelKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите значение',
  disabled: false,
  searchable: false,
  clearable: false,
  valueKey: 'value',
  labelKey: 'label',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
  (e: 'clear'): void;
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);

const dropdownClasses = computed(() => ({
  'dropdown--open': isOpen.value,
}));

const triggerClasses = computed(() => ({
  'dropdown__trigger--disabled': props.disabled,
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

const selectedLabel = computed(() => {
  const selected = props.options.find((option) => getOptionValue(option) === props.modelValue);
  return selected ? getOptionLabel(selected) : props.placeholder;
});

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) {
    return props.options;
  }

  const query = searchQuery.value.toLowerCase();
  return props.options.filter((option) => getOptionLabel(option).toLowerCase().includes(query));
});

const getOptionValue = (option: any): string | number => {
  return option[props.valueKey];
};

const getOptionLabel = (option: any): string => {
  return option[props.labelKey];
};

const getItemClasses = (option: any) => ({
  'dropdown__item--selected': props.modelValue === getOptionValue(option),
});

const handleTriggerClick = () => {
  if (props.searchable && searchInputRef.value) {
    searchInputRef.value.focus();
    isOpen.value = !isOpen.value;
  } else if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const onSearchInput = () => {
  if (!isOpen.value) {
    isOpen.value = true;
  }
};

const selectOption = (option: any) => {
  emit('update:modelValue', getOptionValue(option));
  isOpen.value = false;
  searchQuery.value = '';
};

const handleClear = () => {
  if (!props.disabled) {
    emit('update:modelValue', null);
    emit('clear');
    searchQuery.value = '';

    if (props.searchable && searchInputRef.value) {
      searchInputRef.value.focus();
    }
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

<style lang="scss" scoped>
.dropdown {
  $self: &;
  position: relative;
  width: 100%;
  max-width: 320px;

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 44px;
    padding: 0 16px;
    background: rgba(182, 199, 207, 0.15);
    border: none;
    border-radius: 60px;
    color: var(--color-text-primary, #222c37);
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(31, 41, 55, 0.06);

    &--disabled {
      background: #f3f4f6;
      color: #b0b7c3;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  &__search {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    font-family: Montserrat, sans-serif;
    color: var(--color-text-primary, #222c37);
    padding: 0;
    width: 100%;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &::placeholder {
      color: var(--color-text-primary, #222c37);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--placeholder::placeholder {
      color: rgba(120, 151, 166, 0.6);
    }
  }

  &__selected {
    flex: 1;
    color: var(--color-text-primary, #222c37);
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--placeholder {
      color: rgba(120, 151, 166, 0.6);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 8px;
    flex-shrink: 0;
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    color: #90a9b6;
    border-radius: 50%;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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
        color: #90a9b6;
        background: transparent;
        transform: none;
      }
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a2b1b8;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;

    #{$self}--open & {
      transform: rotate(180deg);
    }
  }

  &__content {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    background: #ffffff;
    border: 1.5px solid var(--color-stroke-primary, #d3e0e6);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(31, 41, 55, 0.12);
    z-index: 1000;
    animation: dropdown-fade-in 0.18s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: 400px;
    overflow: hidden;
  }

  &__list {
    margin: 0;
    padding: 8px 0;
    list-style: none;
    max-height: 320px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d3e0e6;
      border-radius: 4px;

      &:hover {
        background: #90a9b6;
      }
    }
  }

  &__item {
    padding: 12px 20px;
    color: var(--color-text-primary, #222c37);
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    transition: all 0.18s ease;
    border-radius: 8px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background: #f0f7f4;
      color: #0f9d3b;
    }

    &--selected {
      background: #e6f4ea;
      color: #0f9d3b;
    }

    &--no-results {
      padding: 20px;
      text-align: center;
      color: rgba(120, 151, 166, 0.6);
      font-size: 14px;
      cursor: default;
      white-space: normal;

      &:hover {
        background: transparent;
        color: rgba(120, 151, 166, 0.6);
      }
    }
  }
}

@keyframes dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
