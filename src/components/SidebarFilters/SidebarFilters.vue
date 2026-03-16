<template>
  <div
    class="sidebar-filters"
    :class="{ 'sidebar-filters--collapsed': collapsible && isCollapsed }"
  >
    <button
      v-if="collapsible"
      class="sidebar-filters__toggle"
      :class="{ 'sidebar-filters__toggle--collapsed': isCollapsed }"
      type="button"
      @click="toggleCollapse"
    >
      <NIcon name="chevrons-right" size="sm" />
    </button>

    <template v-if="!isCollapsed">
      <div v-for="filter in filters" :key="filter.key" class="sidebar-filters__item">
        <NDropdown
          :model-value="modelValue[filter.key] ?? null"
          :options="getFilterOptions(filter)"
          :label="filter.label"
          :disabled="isFieldDisabled(filter.key)"
          :searchable="searchable"
          :show-option-tooltip="true"
          @update:model-value="(value) => handleFilterChange(filter.key, value)"
        />
      </div>

      <slot name="additional-controls" />

      <div v-if="showActions" class="sidebar-filters__actions">
        <NButton variant="primary" :disabled="applyDisabled" @click="handleApply">
          {{ applyLabel }}
        </NButton>
        <NButton variant="secondary" @click="handleClear">
          {{ clearLabel }}
        </NButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type {
  SidebarFiltersProps,
  SidebarFiltersEmits,
  FilterDropdown,
  FilterValue,
} from './SidebarFilters.types';
import NDropdown from '../Dropdown/Dropdown.vue';
import NButton from '../Button/Button.vue';
import NIcon from '../Icon/Icon.vue';

defineOptions({ name: 'NSidebarFilters' });

const props = withDefaults(defineProps<SidebarFiltersProps>(), {
  disabledFields: () => [],
  showAllOption: () => [],
  searchable: true,
  showActions: true,
  applyLabel: 'Применить фильтры',
  clearLabel: 'Очистить',
  applyDisabled: false,
  allOptionLabels: () => ({}),
  collapsible: false,
  collapsed: false,
});

const emit = defineEmits<SidebarFiltersEmits>();

const isCollapsed = ref(props.collapsed);

watch(
  () => props.collapsed,
  (val) => {
    isCollapsed.value = val;
  }
);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:collapsed', isCollapsed.value);
};

const isFieldDisabled = (key: string): boolean => {
  return props.disabledFields.includes(key);
};

const getFilterOptions = (filter: FilterDropdown) => {
  const shouldShowAll = props.showAllOption.includes(filter.key);
  if (!shouldShowAll) return filter.options;

  const entityLabel = props.allOptionLabels[filter.key] || filter.key;
  const hasAllOption = filter.options.some((opt) => opt.value === 'None');
  if (hasAllOption) return filter.options;

  return [{ label: `Все ${entityLabel}`, value: 'None' }, ...filter.options];
};

const handleFilterChange = (key: string, value: FilterValue) => {
  const updated = { ...props.modelValue, [key]: value };
  emit('update:modelValue', updated);
  emit('filterChange', key, value);
};

const handleApply = () => {
  emit('apply');
};

const handleClear = () => {
  const cleared: Record<string, FilterValue> = {};
  props.filters.forEach((f) => {
    cleared[f.key] = null;
  });
  emit('update:modelValue', cleared);
  emit('clear');
};
</script>

<style scoped lang="scss">
.sidebar-filters {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  min-width: 200px;
  transition: min-width var(--duration-medium) var(--easing-standard);

  &--collapsed {
    min-width: 0;
    width: 30px;
    gap: 0;
  }

  &__toggle {
    align-self: flex-end;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-blue-70);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    color: var(--color-white);
    flex-shrink: 0;
    margin-bottom: calc(-1 * var(--space-3));
    transition:
      transform var(--duration-medium) var(--easing-standard),
      background-color var(--duration-fast) ease;
    transform: rotate(180deg);

    &:hover {
      background: var(--color-grey-60);
    }

    &--collapsed {
      align-self: flex-start;
      transform: rotate(0deg);
    }
  }

  &__item {
    display: flex;
    flex-direction: column;

    :deep(.dropdown) {
      max-width: 100%;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-top: var(--space-2);

    :deep(.button) {
      width: 100%;
    }
  }
}
</style>
