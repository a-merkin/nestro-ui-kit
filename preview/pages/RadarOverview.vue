<template>
  <section class="container">
    <NWorkplace v-model="activeTab" :tabs="tabs">
      <div class="block">
        <div class="row">
          <NButton>Пример</NButton>

          <NCheckbox v-model="check"> Чекбокс </NCheckbox>

          <NDropdown
            v-model="selected"
            :options="options"
            placeholder="Выберите значение"
            clearable
          />

          <NDatePicker v-model="date" placeholder="Выберите дату" clearable />

          <NInputNumber v-model="number" placeholder="Количество" :min="0" :max="100" :step="1" />
        </div>
      </div>
    </NWorkplace>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('ui');
const check = ref(false);
const selected = ref<number | null>(null);
const date = ref<string | null>(null);

const number = ref<number | null>(null);
const numberStacked = ref<number | null>(5);
const numberHorizontal = ref<number | null>(2);
const numberError = ref<number | null>(null);

const tabs = [
  { label: 'UI компоненты', value: 'ui' },
  { label: 'Layout', value: 'layout' },
  { label: 'Прочее', value: 'other' },
];

const options = [
  { label: 'Опция 1', value: 1 },
  { label: 'Опция 2', value: 2 },
  { label: 'Опция 3', value: 3 },
];
</script>

<style scoped>
.container {
  padding: var(--space-6);
  background: linear-gradient(135deg, var(--color-green-80), var(--color-green-50));
  min-height: 100vh;
}

.block {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
</style>
