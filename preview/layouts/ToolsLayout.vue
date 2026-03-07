<template>
  <div class="tools-layout">
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

    <NBreadcrumbs :scenario-parts="oilBreadcrumbs" />

    <NWorkplace v-model="activeTab" :tabs="tabs">
      <slot :active-tab="activeTab" />
    </NWorkplace>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { oilToolTabs, oilBreadcrumbs } from '../mocks/index';

const tabs = oilToolTabs;
const activeTab = ref(tabs[0].value);
</script>

<style scoped>
.tools-layout {
  width: 100%;
  max-width: var(--max-width-fullhd);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
