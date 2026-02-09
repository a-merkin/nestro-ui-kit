<template>
  <section>
    <NWorkplace v-model="activeTab" :tabs="tabs">
      <template v-if="activeTab === 'ui'">
        <NButton>Кнопка</NButton>
        <NCheckbox v-model="checkTest" />
        <NDropdown v-model="value" :options="options" />
        <NInput v-model="inputValue" placeholder="Введите текст" />
        <NProgressBar />
        <NLoader size="md" />
      </template>

      <template v-else-if="activeTab === 'layout'">
        <div>Контент второй вкладки</div>
      </template>

      <template v-else>
        <div>Контент третьей вкладки</div>
      </template>
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

const checkTest = ref(false);
const value = ref(null);
const inputValue = ref('');

const options = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
];
</script>
