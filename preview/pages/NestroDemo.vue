<template>
  <NestroLayout>
    <template #toolbar-start>
      <img :src="logoUrl" class="logo" alt="Logo" />
      <NHeading :level="4" class="logo-text">PLAN</NHeading>
    </template>

    <template #toolbar-center>
      <NSearchFilterPanel
        v-model:search-query="searchQuery"
        v-model:active-group-id="activeGroupId"
        :groups="filterGroups"
        :available-filters="availableFilters"
        placeholder="Введите параметр фильтра: Куст, номер,..."
        @search="onSearch"
      />
    </template>

    <template #toolbar-end>
      <NButton variant="secondary">Предложения</NButton>
    </template>

    <template #default="{ activeTab }">
      <Controls v-if="activeTab === 'controls'" />
      <Overlays v-else-if="activeTab === 'overlays'" />
      <Misc v-else-if="activeTab === 'misc'" />
      <p v-else>Вкладка: {{ activeTab }}</p>
    </template>
  </NestroLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NestroLayout from '../layouts/NestroLayout.vue';
import Controls from '../components/Controls.vue';
import Overlays from '../components/Overlays.vue';
import Misc from '../components/Misc.vue';
import { filterGroups, availableFilters } from '../mocks/index';
import logoUrl from '../assets/logo.svg?url';

const searchQuery = ref('');
const activeGroupId = ref<string | null>(null);

const onSearch = (query: string) => {
  console.log('search:', query);
};
</script>

<style scoped>
.logo {
  height: 36px;
  flex-shrink: 0;
}

.logo-text {
  color: var(--color-green-90);
}
</style>
