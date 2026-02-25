<template>
  <div class="sidebar-filters">
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
  </div>
</template>

<script setup lang="ts">
import type {
  SidebarFiltersProps,
  SidebarFiltersEmits,
  FilterDropdown,
  FilterValue,
} from './SidebarFilters.types';
import NDropdown from '../Dropdown/Dropdown.vue';
import NButton from '../Button/Button.vue';

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
});

const emit = defineEmits<SidebarFiltersEmits>();

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
