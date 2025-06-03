<!-- Dropdown.vue -->
<template>
  <div class="dropdown" :class="{ 'dropdown--open': isOpen }">
    <button
      class="dropdown__trigger"
      :class="{ 'dropdown__trigger--disabled': disabled }"
      @click="toggleDropdown"
      type="button"
      :disabled="disabled"
    >
      <span class="dropdown__selected">{{ selectedLabel }}</span>
      <svg
        class="dropdown__arrow"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div v-if="isOpen" class="dropdown__content">
      <ul class="dropdown__list">
        <li
          v-for="option in options"
          :key="option.value"
          class="dropdown__item"
          :class="{ 'dropdown__item--selected': modelValue === option.value }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue: string | number;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

const { options, modelValue, placeholder, disabled } = withDefaults(defineProps<Props>(), {
  placeholder: 'Выберите значение',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const isOpen = ref(false);

const selectedLabel = computed(() => {
  const selected = options.find(option => option.value === modelValue);
  return selected ? selected.label : placeholder;
});

const toggleDropdown = () => {
  if (!disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

// Закрываем дропдаун при клике вне компонента
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    isOpen.value = false;
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
  max-width: 300px;
  font-family: 'Montserrat', sans-serif;
}

.dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  background: rgba(182, 199, 207, 0.15);
  border: 1px solid var(--color-stroke-primary, rgba(162, 177, 184, 0.51));
  border-radius: 60px;
  font-size: 14px;
  color: var(--color-text-primary, #000000);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dropdown__trigger:hover:not(.dropdown__trigger--disabled) {
  border-color: var(--color-stroke-secondary);
}

.dropdown__trigger--disabled {
  background: rgba(218, 218, 218, 0.15);
  border-color: rgba(225, 225, 225, 0.51);
  color: var(--color-text-disabled, #E1E1E1);
  cursor: not-allowed;
}

.dropdown__arrow {
  transition: transform 0.3s ease;
}

.dropdown--open .dropdown__arrow {
  transform: rotate(180deg);
}

.dropdown__content {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid var(--color-stroke-primary);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown__list {
  margin: 0;
  padding: 8px 0;
  list-style: none;
}

.dropdown__item {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown__item:hover {
  background: rgba(182, 199, 207, 0.15);
}

.dropdown__item--selected {
  background: rgba(15, 157, 59, 0.1);
  color: var(--color-text-accent, #0F9D3B);
}
</style> 