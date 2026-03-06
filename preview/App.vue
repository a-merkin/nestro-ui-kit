<template>
  <AppLayout>
    <template #toolbar-start>
      <NButton variant="secondary" size="sm">Назад</NButton>
    </template>

    <template #toolbar-center>
      <NSearchFilterPanel
        v-model:search-query="searchQuery"
        v-model:active-group-id="activeGroupId"
        :groups="filterGroups"
        :available-filters="availableFilters"
        placeholder="Поиск по товарам..."
        @search="onSearch"
      />
    </template>

    <template #toolbar-end>
      <NButton variant="primary" size="sm">Сохранить</NButton>
    </template>

    <template #default="{ activeTab }">
      <p>Вкладка: {{ activeTab }}</p>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from './layouts/AppLayout.vue';
import { filterGroups, availableFilters } from './mocks/index';

const searchQuery = ref('');
const activeGroupId = ref<string | null>(null);

const onSearch = (query: string) => {
  console.log('search:', query);
};
</script>
