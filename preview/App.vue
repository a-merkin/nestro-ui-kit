<template>
  <AppLayout>
    <template #toolbar-start>
      <NButton variant="secondary" size="sm">Назад</NButton>
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
import AppLayout from './layouts/AppLayout.vue';
</script>
