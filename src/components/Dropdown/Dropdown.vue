<!-- Dropdown.vue -->
<template>
  <div class="dropdown" :class="{ 'dropdown--open': isOpen }">
    <div
      class="dropdown__trigger"
      :class="{ 'dropdown__trigger--disabled': disabled }"
      @click="handleTriggerClick"
    >
      <input
        v-if="searchable"
        ref="searchInputRef"
        type="text"
        v-model="searchQuery"
        :placeholder="selectedLabel"
        class="dropdown__search-field"
        :class="{ 'dropdown__search-field--placeholder': !hasSelectedValue && !searchQuery }"
        :disabled="disabled"
        @focus="openDropdown"
        @input="onSearchInput"
      />
      <span 
        v-else
        class="dropdown__selected"
        :class="{ 'dropdown__selected--placeholder': !hasSelectedValue }"
      >
        {{ selectedLabel }}
      </span>
      <svg 
        class="dropdown__arrow" 
        width="22" 
        height="22" 
        viewBox="0 0 22 22" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M17.8258 7.35254L11.0067 13.9998L4.18757 7.35254C4.06574 7.23352 3.90219 7.16689 3.73187 7.16689C3.56156 7.16689 3.398 7.23352 3.27617 7.35254C3.21718 7.41034 3.17031 7.47933 3.13832 7.55547C3.10632 7.63161 3.08984 7.71337 3.08984 7.79596C3.08984 7.87855 3.10632 7.9603 3.13832 8.03644C3.17031 8.11259 3.21718 8.18158 3.27617 8.23938L10.5305 15.3123C10.6579 15.4365 10.8288 15.506 11.0067 15.506C11.1846 15.506 11.3555 15.4365 11.4829 15.3123L18.7372 8.24074C18.7966 8.1829 18.8439 8.11374 18.8761 8.03734C18.9083 7.96095 18.925 7.87887 18.925 7.79596C18.925 7.71304 18.9083 7.63096 18.8761 7.55457C18.8439 7.47817 18.7966 7.40901 18.7372 7.35117C18.6154 7.23216 18.4518 7.16553 18.2815 7.16553C18.1112 7.16553 17.9477 7.23216 17.8258 7.35117V7.35254Z" 
          fill="#90A9B6"
        />
      </svg>
    </div>
    <div v-if="isOpen" class="dropdown__content">
      <ul class="dropdown__list">
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          class="dropdown__item"
          :class="{ 'dropdown__item--selected': modelValue === option.value }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
        <li v-if="filteredOptions.length === 0" class="dropdown__item--no-results">
          Ничего не найдено
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, toRefs } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue?: string | number | null;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите значение',
  disabled: false,
  searchable: false,
});

const { options, modelValue, placeholder, disabled, searchable } = toRefs(props);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);

const hasSelectedValue = computed(() => {
  return options.value.some((option) => option.value === modelValue.value);
});

const selectedLabel = computed(() => {
  const selected = options.value.find((option) => option.value === modelValue.value);
  return selected ? selected.label : placeholder.value;
});

const filteredOptions = computed(() => {
  if (!searchable.value || !searchQuery.value.trim()) {
    return options.value;
  }
  const query = searchQuery.value.toLowerCase();
  return options.value.filter(option => 
    option.label.toLowerCase().includes(query)
  );
});

const openDropdown = () => {
  if (!disabled.value) {
    isOpen.value = true;
  }
};

const handleTriggerClick = () => {
  if (searchable.value && searchInputRef.value) {
    searchInputRef.value.focus();
  } else if (!disabled.value) {
    isOpen.value = !isOpen.value;
  }
};

const onSearchInput = () => {
  if (!isOpen.value) {
    isOpen.value = true;
  }
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
  searchQuery.value = '';
};

// Закрываем дропдаун при клике вне компонента
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

// Добавляем и удаляем обработчик при монтировании/размонтировании
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 100%;
  max-width: 320px;
}

.dropdown__trigger {
  display: flex;
  align-items: center;
  text-align: start;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding: 0 10px;
  background: rgba(182, 199, 207, 0.15);
  border: none;
  border-radius: 60px;
  color: var(--color-text-primary, #222C37);
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(31, 41, 55, 0.06);
  position: relative;
}

.dropdown__search-field {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  font-family: Montserrat, sans-serif;
  color: var(--color-text-primary, #222C37);
  padding: 0;
  width: 100%;
}

.dropdown__search-field::placeholder {
  color: var(--color-text-primary, #222C37);
}

.dropdown__search-field--placeholder::placeholder {
  color: rgba(120, 151, 166, 0.60);
}

.dropdown__trigger--disabled {
  background: #F3F4F6;
  border-color: #E5E7EB;
  color: #B0B7C3;
  cursor: not-allowed;
  opacity: 0.7;
}

.dropdown__arrow {
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  margin-left: 12px;
  color: #A2B1B8;
}

.dropdown--open .dropdown__arrow {
  transform: rotate(180deg);
}

.dropdown__content {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: #FFFFFF;
  border: 1.5px solid var(--color-stroke-primary, #D3E0E6);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(31, 41, 55, 0.12);
  z-index: 1000;
  animation: dropdown-fade-in 0.18s cubic-bezier(0.4,0,0.2,1);
  max-height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@keyframes dropdown-fade-in {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown__list {
  margin: 0;
  padding: 8px 0;
  list-style: none;
  max-height: 320px;
  overflow-y: auto;
  flex: 1;
}

.dropdown__list::-webkit-scrollbar {
  width: 8px;
}

.dropdown__list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.dropdown__list::-webkit-scrollbar-thumb {
  background: #D3E0E6;
  border-radius: 4px;
}

.dropdown__list::-webkit-scrollbar-thumb:hover {
  background: #90A9B6;
}

.dropdown__item {
  padding: 12px 20px;
  color: var(--color-text-primary, #222C37);
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  transition: background 0.18s, color 0.18s;
  border-radius: 8px;
}

.dropdown__item:hover {
  background: #F0F7F4;
  color: #0F9D3B;
}

.dropdown__item--selected {
  background: #E6F4EA;
  color: #0F9D3B;
}

.dropdown__item--no-results {
  padding: 20px;
  text-align: center;
  color: rgba(120, 151, 166, 0.6);
  font-size: 14px;
  font-family: Montserrat, sans-serif;
  cursor: default;
}

.dropdown__item--no-results:hover {
  background: transparent;
  color: rgba(120, 151, 166, 0.6);
}

.dropdown__selected {
  color: var(--color-text-primary, #222c37);
}

.dropdown__selected--placeholder {
  color: rgba(120, 151, 166, 0.60);
}

.dropdown__clear {
  margin-left: 12px;
  cursor: pointer;
  transition: opacity 0.2s;
  opacity: 0.7;
}

.dropdown__clear:hover {
  opacity: 1;
}
</style> 
