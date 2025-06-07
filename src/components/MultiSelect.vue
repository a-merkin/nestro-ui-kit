<template>
  <div class="figma-card">
    <div class="chips-container" ref="chipsRef">
      <template v-for="item in selectedItems" :key="item.id">
        <div class="chip">
          <span class="chip-close" @click.stop="removeSelected(item.id)">×</span>
          <span class="chip-text">{{ item.name }}</span>
        </div>
      </template>
    </div>
    <div class="dropdown-arrow" ref="arrowRef" @click="isDropdownOpen = !isDropdownOpen">
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
        <label v-for="item in options" :key="item.id" class="dropdown-chip">
          <input type="checkbox" :checked="modelValue.includes(item.id)" @change="toggleSelect(item.id)" />
          <span>{{ item.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

interface OptionItem {
  id: string | number;
  name: string;
}

const props = defineProps<{ modelValue: Array<string | number>, options: OptionItem[] }>();
const emit = defineEmits(['update:modelValue']);

const chipsRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);
const isDropdownOpen = ref(false);

const selectedItems = computed(() =>
  props.options.filter(item => props.modelValue.includes(item.id))
);

function toggleSelect(id: string | number) {
  const newValue = props.modelValue.includes(id)
    ? props.modelValue.filter(val => val !== id)
    : [...props.modelValue, id];
  emit('update:modelValue', newValue);
}

function removeSelected(id: string | number) {
  const newValue = props.modelValue.filter(val => val !== id);
  emit('update:modelValue', newValue);
}

function handleClickOutside(event: MouseEvent) {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node) &&
    !chipsRef.value?.contains(event.target as Node) &&
    !arrowRef.value?.contains(event.target as Node)
  ) {
    isDropdownOpen.value = false;
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
  width: 250px;
  height: 85px;
  background: rgba(182, 199, 207, 0.15);
  border: 1px solid rgba(162, 177, 184, 0.51);
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  padding: 12px 32px 12px 12px;
  position: relative;
  box-sizing: border-box;
}
.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 4px;
  width: 100%;
  align-items: flex-start;
  max-height: 100%;
  overflow: hidden;
}
.chip {
  display: flex;
  align-items: center;
  background: #C0DFEF;
  border-radius: 5px;
  min-width: 0;
  max-width: 82px;
  flex-shrink: 1;
  height: 13px;
  padding: 0 8px 0 4px;
  font-family: Montserrat, sans-serif;
  font-size: 10px;
  color: rgba(120, 151, 166, 0.6);
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
  color: rgba(120, 151, 166, 0.6);
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
}
.dropdown-chips {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 120px;
  overflow-y: auto;
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