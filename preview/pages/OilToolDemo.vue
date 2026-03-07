<template>
  <ToolsLayout>
    <template #toolbar-start>
      <img :src="logoUrl" class="logo" alt="Logo" />
      <NHeading :level="4" class="logo-text">Инструменты нефтяного инжиниринга</NHeading>
    </template>

    <template #toolbar-center>
      <NSearchFilterPanel
        v-model:search-query="searchQuery"
        v-model:active-group-id="activeGroupId"
        :groups="oilFilterGroups"
        :available-filters="oilAvailableFilters"
        placeholder="Скважина, месторождение, горизонт..."
        @search="onSearch"
      />
    </template>

    <template #toolbar-end>
      <NButton variant="secondary">Настройки</NButton>
    </template>

    <template #default="{ activeTab }">
      <div class="oil-content">
        <NSidebarFilters
          v-model="filterValues"
          :filters="oilToolFilters"
          show-actions
          @apply="onApply"
          @clear="onClear"
        />
        <div class="oil-content__main">
          <Controls v-if="activeTab === 'controls'" />
          <Overlays v-else-if="activeTab === 'overlays'" />
          <p v-else>Вкладка: {{ activeTab }}</p>
        </div>
      </div>
    </template>
  </ToolsLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToolsLayout from '../layouts/ToolsLayout.vue';
import Controls from './Controls.vue';
import Overlays from './Overlays.vue';
import { oilToolFilters, oilFilterGroups, oilAvailableFilters } from '../mocks/index';
import logoUrl from '../assets/logo.svg?url';

const filterValues = ref<Record<string, string | number | null>>({});
const searchQuery = ref('');
const activeGroupId = ref<string | null>(null);

const onSearch = (query: string) => console.log('search:', query);
const onApply = () => console.log('apply', filterValues.value);
const onClear = () => console.log('clear');
</script>

<style scoped>
.logo {
  height: 36px;
  flex-shrink: 0;
}

.logo-text {
  color: var(--color-green-90);
}

.oil-content {
  display: flex;
  height: 100%;
  gap: var(--space-4);
}

.oil-content__main {
  flex: 1;
  min-width: 0;
}
</style>
