<template>
  <div class="multiselect" :class="multiselectClasses" @click="handleCardClick">
    <div ref="chipsRef" class="multiselect__chips">
      <template v-for="item in selectedItems" :key="item.value">
        <div class="multiselect__chip">
          <span class="multiselect__chip-close" @click.stop="removeSelected(item.value)">×</span>
          <span class="multiselect__chip-text">{{ item.label }}</span>
        </div>
      </template>

      <input
        v-if="searchable"
        ref="searchInputRef"
        v-model="searchQuery"
        type="text"
        class="multiselect__search"
        @focus="openDropdown"
        @input="onSearchInput"
        @click.stop
      />
    </div>

    <div ref="arrowRef" class="multiselect__arrow" @click.stop="toggleDropdown">
      <svg
        :class="{ 'multiselect__arrow-icon--rotated': isDropdownOpen }"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M10 13L16 19L22 13"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <div v-if="isDropdownOpen" ref="dropdownRef" class="multiselect__dropdown">
      <div class="multiselect__options">
        <label
          v-for="item in filteredOptions"
          :key="item.value"
          class="multiselect__option"
          @click.stop
        >
          <input
            type="checkbox"
            :checked="localSelectedValues.includes(item.value)"
            @change="toggleSelect(item.value)"
          />
          <span>{{ item.label }}</span>
        </label>

        <div v-if="filteredOptions.length === 0" class="multiselect__no-results">
          Ничего не найдено
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import type { MultiSelectProps, MultiSelectValue } from './MultiSelect.types';

defineOptions({ name: 'NMultiSelect' });

const props = withDefaults(defineProps<MultiSelectProps>(), {
  searchable: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: MultiSelectValue[]): void;
}>();

const chipsRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);

const isDropdownOpen = ref(false);
const searchQuery = ref('');

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
  height: 85px;
  background: var(--color-bg-input);
  border: var(--border-width-sm) solid var(--color-stroke-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: flex-start;
  padding: var(--space-3) var(--space-8) var(--space-3) var(--space-3);
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

  &__search {
    flex: 1;
    min-width: 80px;
    border: none;
    background: transparent;
    outline: none;
    font-size: var(--font-size-xs);
    font-family: var(--font-family-base);
    color: var(--color-blue-50);
    padding: 0 var(--space-1);
    height: 13px;

    &::placeholder {
      color: var(--color-text-placeholder);
    }
  }

  &__chip {
    display: flex;
    align-items: center;
    background: var(--color-blue-70);
    border-radius: var(--radius-toggle-md);
    min-width: 0;
    max-width: 82px;
    flex-shrink: 1;
    height: 13px;
    padding: 0 var(--space-2) 0 var(--space-1);
    font-family: var(--font-family-base);
    font-size: var(--font-size-xs);
    color: var(--color-blue-50);
    margin-bottom: 0;
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
      color: var(--color-blue-50);
    }
  }

  &__chip-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--font-family-base);
    font-size: var(--font-size-xs);
    color: var(--color-blue-50);
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
    color: var(--color-blue-50);
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
    font-size: var(--font-size-xs);
    font-family: var(--font-family-base);
    color: var(--color-blue-50);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--duration-fast) var(--easing-standard);

    &:hover {
      background: var(--color-blue-60);
      color: var(--color-green-100);
    }

    input[type='checkbox'] {
      margin: 0;
      cursor: pointer;
    }
  }

  &__no-results {
    padding: var(--space-5);
    text-align: center;
    color: var(--color-text-placeholder);
    font-size: var(--font-size-sm);
    font-family: var(--font-family-base);
    cursor: default;

    &:hover {
      background: transparent;
      color: var(--color-text-placeholder);
    }
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
