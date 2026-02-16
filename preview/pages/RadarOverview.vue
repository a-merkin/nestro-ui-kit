<template>
  <section class="container">
    <NWorkplace v-model="activeTab" :tabs="tabs">
      <div class="block"></div>
    </NWorkplace>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('ui');

const tabs = [
  { label: 'UI компоненты', value: 'ui' },
  { label: 'Layout', value: 'layout' },
  { label: 'Прочее', value: 'other' },
];
</script>

<style scoped>
.container {
  padding: 10px;
  background-color: green;
}

.block {
  height: 100vh;
}
</style>
