<!-- Table.vue -->
<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              'table__header',
              { 'table__header--sortable': column.sortable }
            ]"
            @click="handleSort(column)"
          >
            {{ column.title }}
            <svg
              v-if="column.sortable"
              class="table__sort-icon"
              :class="{
                'table__sort-icon--active': sortKey === column.key,
                'table__sort-icon--desc': sortOrder === 'desc'
              }"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2L10 7H2L6 2Z"
                fill="currentColor"
              />
            </svg>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in sortedData"
          :key="index"
          class="table__row"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="table__cell"
          >
            <slot
              :name="column.key"
              :row="row"
              :value="row[column.key]"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
}

interface Props {
  columns: Column[];
  data: Record<string, any>[];
}

const props = defineProps<Props>();

const sortKey = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');

const handleSort = (column: Column) => {
  if (!column.sortable) return;

  if (sortKey.value === column.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = column.key;
    sortOrder.value = 'asc';
  }
};

const sortedData = computed(() => {
  if (!sortKey.value) return props.data;

  return [...props.data].sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (aValue === bValue) return 0;

    const result = aValue > bValue ? 1 : -1;
    return sortOrder.value === 'asc' ? result : -result;
  });
});
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Montserrat', sans-serif;
  background: #FFFFFF;
}

.table__header {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text-primary);
  background: rgba(182, 199, 207, 0.15);
  border-bottom: 1px solid var(--color-stroke-primary);
  white-space: nowrap;
}

.table__header--sortable {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.table__header--sortable:hover {
  background: rgba(182, 199, 207, 0.25);
}

.table__sort-icon {
  opacity: 0.5;
  transition: transform 0.2s ease;
}

.table__sort-icon--active {
  opacity: 1;
}

.table__sort-icon--desc {
  transform: rotate(180deg);
}

.table__row {
  transition: background-color 0.2s ease;
}

.table__row:hover {
  background: rgba(182, 199, 207, 0.05);
}

.table__cell {
  padding: 12px 16px;
  font-size: 14px;
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-stroke-primary);
}
</style> 