<template>
  <section class="container">
    <NWorkplace v-model="activeTab" :tabs="tabs">
      <div class="block">
        <div class="row">
          <NButton>Пример</NButton>
          <NCheckbox v-model="check"></NCheckbox>
        </div>
      </div>
    </NWorkplace>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('ui');
const check = ref(false);

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

.row {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
