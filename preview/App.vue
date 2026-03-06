<template>
  <AppLayout v-slot="{ activeTab }">
    <p>Вкладка: {{ activeTab }}</p>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue';
</script>
