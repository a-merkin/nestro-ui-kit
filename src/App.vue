<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import SegmentedControl from './components/SegmentedControl/SegmentedControl.vue';
import type { SegmentedControlOption } from './components/SegmentedControl/SegmentedControl.vue';

const periodOptions: SegmentedControlOption[] = [
  { label: 'День', value: 'day' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
];

const selectedPeriod = ref('day');

const viewOptions: SegmentedControlOption[] = [
  { label: 'Список', value: 'list' },
  { label: 'Сетка', value: 'grid' },
];

const selectedView = ref('list');
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  
  <div class="segmented-demo">
    <h3>Демонстрация SegmentedControl</h3>
    
    <div class="demo-section">
      <label>Выберите период:</label>
      <SegmentedControl 
        v-model="selectedPeriod" 
        :options="periodOptions" 
      />
      <p>Выбрано: <strong>{{ selectedPeriod }}</strong></p>
    </div>
    
    <div class="demo-section">
      <label>Выберите вид:</label>
      <SegmentedControl 
        v-model="selectedView" 
        :options="viewOptions" 
      />
      <p>Выбрано: <strong>{{ selectedView }}</strong></p>
    </div>
    
    <div class="demo-section">
      <label>Отключенный контрол:</label>
      <SegmentedControl 
        v-model="selectedPeriod" 
        :options="periodOptions" 
        :disabled="true"
      />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.segmented-demo {
  margin-top: 40px;
  padding: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.segmented-demo h3 {
  margin-bottom: 24px;
  color: #000;
}

.demo-section {
  margin-bottom: 32px;
}

.demo-section label {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #464E56;
}

.demo-section p {
  margin-top: 12px;
  font-size: 14px;
  color: #464E56;
}
</style>
