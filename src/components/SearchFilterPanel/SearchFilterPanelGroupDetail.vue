<template>
  <div class="sfp-group-detail">
    <!-- ───── Normal mode ───── -->
    <template v-if="!editMode">
      <div class="sfp-group-detail__header">
        <h3 class="sfp-group-detail__title">{{ group.name }}</h3>
        <span v-if="group.isDefault" class="sfp-group-detail__badge">По умолчанию</span>
        <span v-if="group.isSystem" class="sfp-group-detail__badge sfp-group-detail__badge--system"
          >Системная</span
        >
      </div>

      <div class="sfp-group-detail__filters">
        <div v-for="item in sortedItems" :key="item.id" class="sfp-group-detail__filter-row">
          <span class="sfp-group-detail__filter-label">{{ item.label }}</span>
          <span class="sfp-group-detail__filter-value">{{ formatValue(item) }}</span>
        </div>

        <div v-if="!sortedItems.length" class="sfp-group-detail__empty">Фильтры не настроены</div>
      </div>
    </template>

    <!-- ───── Edit mode ───── -->
    <template v-else>
      <div class="sfp-group-detail__header">
        <h3 class="sfp-group-detail__title">Редактирование группы</h3>
      </div>

      <div class="sfp-group-detail__edit-form">
        <!-- Group name -->
        <div class="sfp-group-detail__field">
          <label class="sfp-group-detail__field-label">Название группы</label>
          <NInput v-model="draft.name" placeholder="Введите название" />
        </div>

        <!-- Filter list -->
        <div class="sfp-group-detail__edit-filters">
          <div v-for="(item, idx) in draft.items" :key="item.id" class="sfp-group-detail__edit-row">
            <div class="sfp-group-detail__edit-row-meta">
              <span class="sfp-group-detail__filter-label">{{ item.label }}</span>
              <span class="sfp-group-detail__type-badge">{{ typeLabel(item.type) }}</span>
            </div>

            <div class="sfp-group-detail__edit-row-value">
              <!-- dropdown -->
              <NDropdown
                v-if="item.type === 'dropdown'"
                :model-value="(draft.values[item.key] as string | number | null) ?? null"
                :options="item.config?.options ?? []"
                clearable
                @update:model-value="(v) => setDraftValue(item.key, v)"
              />

              <!-- multiselect -->
              <NMultiSelect
                v-else-if="item.type === 'multiselect'"
                :model-value="(draft.values[item.key] as string[]) ?? []"
                :options="item.config?.options ?? []"
                @update:model-value="(v) => setDraftValue(item.key, v as string[])"
              />

              <!-- number (single) -->
              <NInputNumber
                v-else-if="item.type === 'number'"
                :model-value="(draft.values[item.key] as number | null) ?? null"
                :min="item.config?.min"
                :max="item.config?.max"
                :step="item.config?.step"
                @update:model-value="(v) => setDraftValue(item.key, v)"
              />

              <!-- date (single) -->
              <NDatePicker
                v-else-if="item.type === 'date'"
                :model-value="(draft.values[item.key] as string | null) ?? null"
                clearable
                @update:model-value="(v) => setDraftValue(item.key, v)"
              />

              <!-- boolean -->
              <NSwitch
                v-else-if="item.type === 'boolean'"
                :model-value="(draft.values[item.key] as boolean) ?? false"
                @update:model-value="(v) => setDraftValue(item.key, v)"
              />

              <!-- text -->
              <NInput
                v-else-if="item.type === 'text'"
                :model-value="(draft.values[item.key] as string) ?? ''"
                placeholder="Введите значение"
                @update:model-value="(v) => setDraftValue(item.key, v)"
              />
            </div>

            <button
              type="button"
              class="sfp-group-detail__remove-filter"
              title="Удалить фильтр"
              @click="removeFilter(idx)"
            >
              <NIcon name="close" size="sm" />
            </button>
          </div>

          <div v-if="!draft.items.length" class="sfp-group-detail__empty">Фильтры не добавлены</div>
        </div>

        <!-- Add filter -->
        <div v-if="addableFilters.length" class="sfp-group-detail__add-filter">
          <div v-if="showAddMenu" class="sfp-group-detail__add-menu">
            <button
              v-for="af in addableFilters"
              :key="af.id"
              type="button"
              class="sfp-group-detail__add-option"
              @click="addFilter(af)"
            >
              <span>{{ af.label }}</span>
              <span class="sfp-group-detail__type-badge">{{ typeLabel(af.type) }}</span>
            </button>
          </div>
          <button
            type="button"
            class="sfp-group-detail__add-btn"
            @click="showAddMenu = !showAddMenu"
          >
            <NIcon name="plus" size="sm" />
            Добавить фильтр
          </button>
        </div>

        <!-- Actions -->
        <div class="sfp-group-detail__edit-actions">
          <NButton variant="primary" @click="handleSave">Сохранить</NButton>
          <NButton variant="secondary" @click="$emit('cancelEdit')">Отмена</NButton>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import NIcon from '../Icon/Icon.vue';
import NInput from '../Input/Input.vue';
import NInputNumber from '../InputNumber/InputNumber.vue';
import NDropdown from '../Dropdown/Dropdown.vue';
import NMultiSelect from '../MultiSelect/MultiSelect.vue';
import NDatePicker from '../DatePicker/DatePicker.vue';
import NSwitch from '../Switch/Switch.vue';
import NButton from '../Button/Button.vue';
import type {
  FilterGroup,
  FilterGroupItem,
  FilterGroupSavePayload,
  FilterType,
  FilterValue,
} from './SearchFilterPanel.types';

defineOptions({ name: 'NSearchFilterPanelGroupDetail' });

const props = defineProps<{
  group: FilterGroup;
  editMode: boolean;
  availableFilters?: FilterGroupItem[];
}>();

const emit = defineEmits<{
  (e: 'save', payload: FilterGroupSavePayload): void;
  (e: 'cancelEdit'): void;
  (e: 'update:values', values: Record<string, FilterValue>): void;
}>();

const showAddMenu = ref(false);

interface Draft {
  name: string;
  items: FilterGroupItem[];
  values: Record<string, FilterValue>;
}

const draft = ref<Draft>({ name: '', items: [], values: {} });

watch(
  () => props.editMode,
  (active) => {
    if (active) {
      draft.value = {
        name: props.group.name,
        items: props.group.items.map((i) => ({ ...i })),
        values: { ...props.group.values },
      };
      showAddMenu.value = false;
    }
  },
  { immediate: true }
);

const sortedItems = computed(() => [...props.group.items].sort((a, b) => a.order - b.order));

const addableFilters = computed(() => {
  if (!props.availableFilters) return [];
  const existingKeys = new Set(draft.value.items.map((i) => i.key));
  return props.availableFilters.filter((f) => !existingKeys.has(f.key));
});

const setDraftValue = (key: string, value: FilterValue) => {
  draft.value.values = { ...draft.value.values, [key]: value };
};

const removeFilter = (idx: number) => {
  const removed = draft.value.items[idx];
  draft.value.items = draft.value.items.filter((_, i) => i !== idx);
  const values = { ...draft.value.values };
  delete values[removed.key];
  draft.value.values = values;
};

const addFilter = (filter: FilterGroupItem) => {
  draft.value.items = [...draft.value.items, { ...filter, order: draft.value.items.length }];
  showAddMenu.value = false;
};

const handleSave = () => {
  emit('save', {
    id: props.group.id,
    name: draft.value.name.trim() || props.group.name,
    items: draft.value.items.map((item, idx) => ({ ...item, order: idx })),
    values: draft.value.values,
  });
};

const typeLabel = (type: FilterType): string => {
  const labels: Record<FilterType, string> = {
    dropdown: 'Список',
    multiselect: 'Мультивыбор',
    number: 'Число',
    date: 'Дата',
    boolean: 'Да/Нет',
    text: 'Текст',
  };
  return labels[type] ?? type;
};

const formatValue = (item: FilterGroupItem): string => {
  const val = props.group.values[item.key];
  if (val === null || val === undefined) return '—';

  if (Array.isArray(val)) {
    if (!val.length) return '—';
    const opts = item.config?.options ?? [];
    return val.map((v) => opts.find((o) => o.value === v)?.label ?? String(v)).join(', ');
  }

  if (typeof val === 'object' && ('from' in val || 'to' in val)) {
    const parts: string[] = [];
    if (val.from != null) parts.push(`от ${val.from}`);
    if (val.to != null) parts.push(`до ${val.to}`);
    return parts.join(' ') || '—';
  }

  if (typeof val === 'boolean') return val ? 'Да' : 'Нет';

  if (item.type === 'dropdown') {
    const opts = item.config?.options ?? [];
    return opts.find((o) => o.value === val)?.label ?? String(val);
  }

  return String(val);
};
</script>

<style scoped>
.sfp-group-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sfp-group-detail__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-6);
  height: var(--size-height-lg);
  border-bottom: 1px solid var(--color-stroke-primary);
  flex-shrink: 0;
}

.sfp-group-detail__title {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-grey-70);
  margin: 0;
}

.sfp-group-detail__badge {
  display: inline-flex;
  align-items: center;
  padding: 2px var(--space-2);
  border-radius: var(--radius-xl);
  background: var(--color-blue-70);
  font-family: var(--font-family-base);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-70);
}

.sfp-group-detail__badge--system {
  background: var(--color-grey-50);
  color: var(--color-grey-80);
}

.sfp-group-detail__filters {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.sfp-group-detail__filter-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 28px;
}

.sfp-group-detail__filter-label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-70);
  flex-shrink: 0;
}

.sfp-group-detail__filter-value {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-grey-80);
  text-align: right;
}

.sfp-group-detail__empty {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--color-grey-80);
  text-align: center;
  padding: var(--space-5) 0;
}

/* Edit mode */

.sfp-group-detail__edit-form {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.sfp-group-detail__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sfp-group-detail__field-label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-70);
}

.sfp-group-detail__edit-filters {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.sfp-group-detail__edit-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-blue-60);
}

.sfp-group-detail__edit-row-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 130px;
  flex-shrink: 0;
}

.sfp-group-detail__edit-row-value {
  flex: 1;
  min-width: 0;
}

.sfp-group-detail__type-badge {
  display: inline-flex;
  align-items: center;
  padding: 1px var(--space-2);
  border-radius: var(--radius-xl);
  background: var(--color-blue-70);
  font-family: var(--font-family-base);
  font-size: var(--font-size-xs);
  color: var(--color-grey-80);
  width: fit-content;
}

.sfp-group-detail__remove-filter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--radius-round);
  background: transparent;
  color: var(--color-grey-80);
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
  padding: 0;
}

.sfp-group-detail__remove-filter:hover {
  background: rgba(237, 110, 28, 0.1);
  color: var(--color-orange);
}

.sfp-group-detail__add-filter {
  position: relative;
}

.sfp-group-detail__add-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  height: var(--size-height-sm);
  padding: 0 var(--size-padding-horizontal-sm);
  border: 1px dashed var(--color-stroke-primary);
  border-radius: var(--radius-xl);
  background: transparent;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-70);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
}

.sfp-group-detail__add-btn:hover {
  border-color: var(--color-green-90);
  color: var(--color-green-90);
}

.sfp-group-detail__add-menu {
  position: absolute;
  bottom: calc(100% + var(--space-1));
  left: 0;
  z-index: var(--z-raised);
  min-width: 220px;
  background: var(--color-white);
  border: 1px solid var(--color-stroke-primary);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--space-1) 0;
  display: flex;
  flex-direction: column;
}

.sfp-group-detail__add-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
  border: none;
  background: transparent;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--color-grey-70);
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease;
}

.sfp-group-detail__add-option:hover {
  background: var(--color-blue-70);
}

.sfp-group-detail__edit-actions {
  display: flex;
  gap: var(--space-3);
  padding-top: var(--space-2);
  border-top: 1px solid var(--color-stroke-primary);
}
</style>
