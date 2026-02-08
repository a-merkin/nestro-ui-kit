<template>
  <section>
    <NButton>Primary</NButton>
    <NCheckbox v-model="checkTest"></NCheckbox>
    <NDropdown v-model="value" :options="options" />
    <NInput v-model="inputValue" placeholder="Введите текст" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checkTest = ref(false);

const value = ref(null);

const options = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
];
</script>
