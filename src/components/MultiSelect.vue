<template>
  <div class="figma-card" @click="handleCardClick">
    <div class="chips-container" ref="chipsRef">
      <template v-for="item in selectedItems" :key="item.value">
        <div class="chip">
          <span class="chip-close" @click.stop="removeSelected(item.value)">×</span>
          <span class="chip-text">{{ item.label }}</span>
        </div>
      </template>
      <input
        v-if="searchable"
        ref="searchInputRef"
        type="text"
        v-model="searchQuery"
        class="search-input-inline"
        @focus="openDropdown"
        @input="onSearchInput"
        @click.stop
      />
    </div>
    <div class="dropdown-arrow" ref="arrowRef" @click.stop="toggleDropdown">
      <svg
        :class="{ rotated: isDropdownOpen }"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path d="M10 13L16 19L22 13" stroke="#90A9B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div v-if="isDropdownOpen" class="dropdown-list" ref="dropdownRef">
      <div class="dropdown-chips">
        <label v-for="item in filteredOptions" :key="item.value" class="dropdown-chip" @click.stop>
          <input type="checkbox" :checked="localSelectedValues.includes(item.value)" @change="toggleSelect(item.value)" />
          <span>{{ item.label }}</span>
        </label>
        <div v-if="filteredOptions.length === 0" class="no-results">
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
  if (!target.closest('.figma-card')) {
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

<style scoped>
.figma-card {
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
}
.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 4px;
  width: 100%;
  align-items: flex-start;
  max-height: 100%;
  overflow: hidden;
  cursor: text;
}

.search-input-inline {
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
}

.search-input-inline::placeholder {
  color: rgba(120, 151, 166, 0.6);
}
.chip {
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
.chip-close {
  margin-right: 4px;
  font-size: 10px;
  color: rgba(120, 151, 166, 0.6);
  cursor: pointer;
  user-select: none;
  line-height: 1;
}
.chip-text {
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
.dropdown-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #C0DFEF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  z-index: 10;
  margin-top: 4px;
  padding: 8px;
  max-height: 300px;
  display: flex;
  flex-direction: column;
}

.dropdown-chips {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 280px;
  overflow-y: auto;
  flex: 1;
}
.dropdown-chips::-webkit-scrollbar {
  width: 6px;
}
.dropdown-chips::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}
.dropdown-chips::-webkit-scrollbar-thumb {
  background: #C0DFEF;
  border-radius: 3px;
}
.dropdown-chips::-webkit-scrollbar-thumb:hover {
  background: #7897A6;
}
.no-results {
  padding: 12px;
  text-align: center;
  color: rgba(120, 151, 166, 0.6);
  font-size: 12px;
  font-family: Montserrat, sans-serif;
}
.dropdown-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-family: Montserrat, sans-serif;
  color: #7897A6;
}
.dropdown-add {
  display: flex;
  gap: 4px;
  margin-top: 8px;
}
.dropdown-add input {
  flex: 1;
  font-size: 12px;
  font-family: Montserrat, sans-serif;
  padding: 2px 6px;
  border: 1px solid #C0DFEF;
  border-radius: 4px;
}
.dropdown-add button {
  font-size: 16px;
  padding: 2px 8px;
  background: #C0DFEF;
  border: none;
  border-radius: 4px;
  color: #7897A6;
  cursor: pointer;
}
.dropdown-arrow svg {
  transition: transform 0.2s;
}
.dropdown-arrow svg.rotated {
  transform: rotate(180deg);
}
</style> 