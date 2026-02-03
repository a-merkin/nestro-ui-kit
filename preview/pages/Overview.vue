<script setup lang="ts">
import { ref } from 'vue';
import Workplace from '../../src/components/Workplace.vue';

const activeTab = ref('main');

const tabs = [
  { label: 'Основное', value: 'main' },
  { label: 'Цены', value: 'pricing' },
  { label: 'Характеристики', value: 'specs' },
];
</script>

<template>
  <section>
    <Workplace v-model="activeTab" :tabs="tabs">
      <div v-if="activeTab === 'main'">Основной контент</div>

      <div v-else-if="activeTab === 'pricing'">Информация о ценах</div>

      <div v-else-if="activeTab === 'specs'">Технические характеристики</div>
    </Workplace>
  </section>
</template>
