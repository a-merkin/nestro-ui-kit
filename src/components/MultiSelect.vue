<template>
  <div class="multiselect" :class="multiselectClasses" @click="handleCardClick">
    <div class="multiselect__chips" ref="chipsRef">
      <template v-for="item in selectedItems" :key="item.value">
        <div class="multiselect__chip">
          <span class="multiselect__chip-close" @click.stop="removeSelected(item.value)">×</span>
          <span class="multiselect__chip-text">{{ item.label }}</span>
        </div>
      </template>
      <input
        v-if="searchable"
        ref="searchInputRef"
        type="text"
        v-model="searchQuery"
        class="multiselect__search"
        @focus="openDropdown"
        @input="onSearchInput"
        @click.stop
      />
    </div>
    <div class="multiselect__arrow" ref="arrowRef" @click.stop="toggleDropdown">
      <svg
        :class="{ 'multiselect__arrow-icon--rotated': isDropdownOpen }"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path d="M10 13L16 19L22 13" stroke="#90A9B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div v-if="isDropdownOpen" class="multiselect__dropdown" ref="dropdownRef">
      <div class="multiselect__options">
        <label v-for="item in filteredOptions" :key="item.value" class="multiselect__option" @click.stop>
          <input type="checkbox" :checked="localSelectedValues.includes(item.value)" @change="toggleSelect(item.value)" />
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

interface OptionItem {
  value: string | number;
  label: string;
}

interface Props {
  modelValue: Array<string | number>;
  options: OptionItem[];
  searchable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  searchable: false,
});

const emit = defineEmits(['update:modelValue']);

const chipsRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const isDropdownOpen = ref(false);
const searchQuery = ref('');

const multiselectClasses = computed(() => ({
  'multiselect--open': isDropdownOpen.value,
}));

// Локальное состояние для отслеживания выбранных значений
const localSelectedValues = ref<Array<string | number>>([]);

// Синхронизация локального состояния с пропсами
watch(() => props.modelValue, (newValue) => {
  localSelectedValues.value = [...newValue];
}, { immediate: true });

const selectedItems = computed(() => {
  return props.options.filter(item => localSelectedValues.value.includes(item.value));
});

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) {
    return props.options;
  }
  const query = searchQuery.value.toLowerCase();
  return props.options.filter(item => 
    item.label.toLowerCase().includes(query)
  );
});

function toggleSelect(value: string | number) {
  const newValue = localSelectedValues.value.includes(value)
    ? localSelectedValues.value.filter(val => val !== value)
    : [...localSelectedValues.value, value];
    
  localSelectedValues.value = newValue;
  emit('update:modelValue', newValue);
}

function removeSelected(value: string | number) {
  const newValue = localSelectedValues.value.filter(val => val !== value);
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
  background: rgba(182, 199, 207, 0.15);
  border: 1px solid rgba(162, 177, 184, 0.51);
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  padding: 12px 32px 12px 12px;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease;

  &--open {
    border-color: var(--color-stroke-primary, #d3e0e6);
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
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
    font-size: 10px;
    font-family: Montserrat, sans-serif;
    color: rgba(120, 151, 166, 1);
    padding: 0 4px;
    height: 13px;

    &::placeholder {
      color: rgba(120, 151, 166, 0.6);
    }
  }

  &__chip {
    display: flex;
    align-items: center;
    background: #c0dfef94;
    border-radius: 5px;
    min-width: 0;
    max-width: 82px;
    flex-shrink: 1;
    height: 13px;
    padding: 0 8px 0 4px;
    font-family: Montserrat, sans-serif;
    font-size: 10px;
    color: rgba(120, 151, 166, 1);
    margin-bottom: 0;
    box-sizing: border-box;
  }

  &__chip-close {
    margin-right: 4px;
    font-size: 10px;
    color: rgba(120, 151, 166, 0.6);
    cursor: pointer;
    user-select: none;
    line-height: 1;
    transition: color 0.2s ease;

    &:hover {
      color: rgba(120, 151, 166, 1);
    }
  }

  &__chip-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Montserrat, sans-serif;
    font-size: 10px;
    color: rgba(120, 151, 166, 1);
    line-height: 1.22;
    display: flex;
    align-items: center;
  }

  &__arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #a2b1b8;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    #{$self}--open & {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    background: #ffffff;
    border: 1.5px solid var(--color-stroke-primary, #d3e0e6);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(31, 41, 55, 0.12);
    z-index: 1000;
    animation: multiselect-fade-in 0.18s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: 400px;
    overflow: hidden;
    padding: 8px;
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 320px;
    overflow-y: auto;
    flex: 1;

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

  &__option {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-family: Montserrat, sans-serif;
    color: #7897A6;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.18s ease;

    &:hover {
      background: #f0f7f4;
      color: #0f9d3b;
    }

    input[type="checkbox"] {
      margin: 0;
      cursor: pointer;
    }
  }

  &__no-results {
    padding: 20px;
    text-align: center;
    color: rgba(120, 151, 166, 0.6);
    font-size: 14px;
    font-family: Montserrat, sans-serif;
    cursor: default;

    &:hover {
      background: transparent;
      color: rgba(120, 151, 166, 0.6);
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