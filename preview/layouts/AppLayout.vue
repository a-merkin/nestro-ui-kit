<template>
  <div class="app-layout">
    <NToolbar>
      <template #start>
        <slot name="toolbar-start" />
      </template>
      <template #center>
        <slot name="toolbar-center" />
      </template>
      <template #end>
        <slot name="toolbar-end" />
      </template>
    </NToolbar>

    <NBreadcrumbs :scenario-parts="breadcrumbs" />

    <div class="app-layout__body">
      <NNavBar v-model="activeNav" :items="navBarItems" />

      <NWorkplace v-model="activeTab" :tabs="tabs">
        <slot :active-tab="activeTab" />
      </NWorkplace>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { breadcrumbs, navBarItems, workplaceTabs } from '../mocks/index';

const tabs = workplaceTabs;
const activeTab = ref(tabs[0].value);
const activeNav = ref(navBarItems[0].id);
</script>

<style scoped>
.app-layout {
  width: 100%;
  max-width: var(--max-width-fullhd);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.app-layout__body {
  display: flex;
  flex: 1;
}
</style>
