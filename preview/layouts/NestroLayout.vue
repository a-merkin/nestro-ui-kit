<template>
  <div class="nestro-layout">
    <div class="nestro-layout__toolbar">
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
    </div>

    <div class="nestro-layout__breadcrumbs">
      <NBreadcrumbs :scenario-parts="breadcrumbs" />
    </div>

    <div class="nestro-layout__navbar">
      <NNavBar v-model="activeNav" :items="navBarItems" />
    </div>

    <div class="nestro-layout__workplace">
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
.nestro-layout {
  width: 100%;
  max-width: var(--max-width-fullhd);
  margin: 0 auto;
  display: grid;
  grid-template-columns: var(--size-min-width-sm) 1fr;
  grid-template-rows: auto auto 1fr;
  height: 100vh;
}

.nestro-layout__toolbar {
  grid-column: 2;
  grid-row: 1;
}

.nestro-layout__breadcrumbs {
  grid-column: 2;
  grid-row: 2;
}

.nestro-layout__navbar {
  grid-column: 1;
  grid-row: 3;
  padding-top: calc(var(--space-4) + var(--line-height-base) + var(--space-4) + var(--space-2));
  display: flex;
  flex-direction: column;
}

.nestro-layout__workplace {
  grid-column: 2;
  grid-row: 3;
  min-height: 0;
}
</style>
