<template>
  <section>
    <NButton>Кнопка</NButton>
    <NCheckbox v-model="checkTest" />
    <NDropdown v-model="value" :options="options" />
    <NInput v-model="inputValue" placeholder="Введите текст" />
    <NProgressBar></NProgressBar>

    <NLoader size="md" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checkTest = ref(false);
const value = ref(null);
const inputValue = ref('');

const options = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
];
</script>
