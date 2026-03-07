<template>
  <ToolsLayout>
    <template #toolbar-start>
      <img :src="logoUrl" class="logo" alt="Logo" />
      <NHeading :level="4" class="logo-text">OIL TOOLS</NHeading>
    </template>

    <template #toolbar-end>
      <NButton variant="secondary">Настройки</NButton>
    </template>

    <template #default="{ activeTab }">
      <p>Вкладка: {{ activeTab }}</p>
    </template>
  </ToolsLayout>
</template>

<script setup lang="ts">
import ToolsLayout from '../layouts/ToolsLayout.vue';
import logoUrl from '../assets/logo.svg?url';
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
