<template>
  <div class="multiselect" :class="multiselectClasses" @click="handleCardClick">
    <div class="multiselect__chips">
      <template v-for="item in selectedItems" :key="item.value">
        <div class="multiselect__chip">
          <span class="multiselect__chip-close" @click.stop="removeSelected(item.value)">×</span>
          <span class="multiselect__chip-text">{{ item.label }}</span>
        </div>
      </template>

      <span
        v-if="!searchable && !selectedItems.length && placeholder"
        class="multiselect__placeholder"
      >
        {{ placeholder }}
      </span>

      <input
        v-if="searchable"
        ref="searchInputRef"
        v-model="searchQuery"
        type="text"
        class="multiselect__search"
        :placeholder="!selectedItems.length ? placeholder : ''"
        @focus="openDropdown"
        @input="onSearchInput"
        @click.stop
      />
    </div>

    <div class="multiselect__arrow" @click.stop="toggleDropdown">
      <Icon
        name="arrow-down"
        size="md"
        :class="{ 'multiselect__arrow-icon--rotated': isDropdownOpen }"
      />
    </div>

    <div v-if="isDropdownOpen" class="multiselect__dropdown">
      <div class="multiselect__options">
        <div
          v-for="item in filteredOptions"
          :key="item.value"
          class="multiselect__option"
          @click.stop="toggleSelect(item.value)"
        >
          <Checkbox
            :model-value="localSelectedValues.includes(item.value)"
            @update:model-value="toggleSelect(item.value)"
            @click.stop
          >
            {{ item.label }}
          </Checkbox>
        </div>

        <div v-if="filteredOptions.length === 0" class="multiselect__no-results">
          {{ noResultsTextComputed }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import type { MultiSelectProps, MultiSelectValue } from './MultiSelect.types';
import Checkbox from '@/components/Checkbox/Checkbox.vue';
import Icon from '@/components/Icon/Icon.vue';

defineOptions({ name: 'NMultiSelect' });

const props = withDefaults(defineProps<MultiSelectProps>(), {
  searchable: false,
  disabled: false,
  error: false,
  noResultsText: 'No results found',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: MultiSelectValue[]): void;
}>();

const searchInputRef = ref<HTMLInputElement | null>(null);

const isDropdownOpen = ref(false);
const searchQuery = ref('');

const noResultsTextComputed = computed(() => props.noResultsText);

const multiselectClasses = computed(() => ({
  'multiselect--open': isDropdownOpen.value,
}));

const localSelectedValues = ref<MultiSelectValue[]>([]);

watch(
  () => props.modelValue,
  (newValue) => {
    localSelectedValues.value = [...newValue];
  },
  { immediate: true }
);

const selectedItems = computed(() =>
  props.options.filter((item) => localSelectedValues.value.includes(item.value))
);

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) {
    return props.options;
  }
  const query = searchQuery.value.toLowerCase();
  return props.options.filter((item) => item.label.toLowerCase().includes(query));
});

function toggleSelect(value: MultiSelectValue) {
  const newValue = localSelectedValues.value.includes(value)
    ? localSelectedValues.value.filter((val) => val !== value)
    : [...localSelectedValues.value, value];

  localSelectedValues.value = newValue;
  emit('update:modelValue', newValue);
}

function removeSelected(value: MultiSelectValue) {
  const newValue = localSelectedValues.value.filter((val) => val !== value);
  localSelectedValues.value = newValue;
  emit('update:modelValue', newValue);
}

function openDropdown() {
  isDropdownOpen.value = true;
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value && props.searchable && searchInputRef.value) {
    searchInputRef.value.focus();
  }
}

function handleCardClick() {
  if (!isDropdownOpen.value) {
    isDropdownOpen.value = true;
  }
  if (props.searchable && searchInputRef.value) {
    searchInputRef.value.focus();
  }
}

function onSearchInput() {
  if (!isDropdownOpen.value) {
    isDropdownOpen.value = true;
  }
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.multiselect')) {
    isDropdownOpen.value = false;
    searchQuery.value = '';
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style lang="scss" scoped>
.multiselect {
  $self: &;
  width: 100%;
  min-height: var(--size-height-md);
  background: var(--color-bg-input);
  border: var(--border-width-sm) solid var(--color-stroke-primary);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: flex-start;
  padding: var(--space-2) var(--space-8) var(--space-2) var(--space-3);
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  transition: all var(--motion-standard);

  &--open {
    border-color: var(--color-stroke-primary);
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    width: 100%;
    align-items: flex-start;
    max-height: 100%;
    overflow: hidden;
    cursor: text;
  }

  &__placeholder {
    color: var(--color-text-placeholder);
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 var(--space-1);
    display: flex;
    align-items: center;
  }

  &__search {
    flex: 1;
    min-width: 80px;
    border: none;
    background: transparent;
    outline: none;
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    color: var(--color-black);
    padding: 0 var(--space-1);

    &::placeholder {
      color: var(--color-text-placeholder);
    }
  }

  &__chip {
    display: flex;
    align-items: center;
    background: var(--color-blue-70);
    border-radius: var(--radius-xl);
    min-width: 0;
    max-width: 160px;
    flex-shrink: 1;
    height: var(--size-height-sm);
    padding: 0 var(--space-2) 0 var(--space-1);
    font-family: var(--font-family-base);
    font-size: var(--font-size-xs);
    color: var(--color-grey-70);
    box-sizing: border-box;
  }

  &__chip-close {
    margin-right: var(--space-1);
    font-size: var(--font-size-xs);
    color: var(--color-text-placeholder);
    cursor: pointer;
    user-select: none;
    line-height: 1;
    transition: color var(--motion-standard);

    &:hover {
      color: var(--color-black);
    }
  }

  &__chip-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--font-family-base);
    font-size: var(--font-size-xs);
    color: var(--color-grey-70);
    line-height: 1.22;
    display: flex;
    align-items: center;
  }

  &__arrow {
    position: absolute;
    right: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--color-black);
    transition: transform var(--duration-medium) var(--easing-standard);

    #{$self}--open & {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + var(--space-2));
    left: 0;
    width: 100%;
    background: var(--color-white);
    border: 1.5px solid var(--color-stroke-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-dropdown);
    animation: multiselect-fade-in var(--duration-fast) var(--easing-standard);
    max-height: 400px;
    overflow: hidden;
    padding: var(--space-2);
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    max-height: 320px;
    overflow-y: auto;
    flex: 1;

    &::-webkit-scrollbar {
      width: var(--scrollbar-width);
    }

    &::-webkit-scrollbar-track {
      background: var(--color-scrollbar-track);
      border-radius: var(--scrollbar-thumb-radius);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-scrollbar-thumb);
      border-radius: var(--scrollbar-thumb-radius);

      &:hover {
        background: var(--color-blue-50);
      }
    }
  }

  &__option {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    color: var(--color-black);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background-color var(--motion-standard);

    &:hover {
      background: var(--color-grey-10);
    }
  }

  &__no-results {
    padding: var(--space-5);
    text-align: center;
    color: var(--color-text-placeholder);
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    cursor: default;
  }
}

@keyframes multiselect-fade-in {
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
