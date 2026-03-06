<template>
  <NWorkplace v-model="activeTab" :tabs="tabs">
    <slot :active-tab="activeTab" />
  </NWorkplace>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { workplaceTabs } from '../mocks/index';

const tabs = workplaceTabs;
const activeTab = ref(tabs[0].value);
</script>
