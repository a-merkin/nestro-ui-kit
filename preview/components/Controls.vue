<template>
  <div class="controls">
    <section class="controls__section">
      <NText class="controls__label">Button</NText>
      <div class="controls__row">
        <NButton variant="primary">Применить</NButton>
        <NButton variant="secondary">Отмена</NButton>
        <NButton variant="primary" disabled>Отключена</NButton>
      </div>
    </section>

    <section class="controls__section">
      <NText class="controls__label">Input</NText>
      <NInput v-model="inputValue" placeholder="Введите значение" />
    </section>

    <section class="controls__section">
      <NText class="controls__label">InputNumber</NText>
      <NInputNumber v-model="numberValue" placeholder="0" />
    </section>

    <section class="controls__section">
      <NText class="controls__label">Textarea</NText>
      <NTextarea v-model="textareaValue" placeholder="Введите описание..." />
    </section>

    <section class="controls__section">
      <NText class="controls__label">Checkbox</NText>
      <NCheckbox v-model="checkboxValue">Активная скважина</NCheckbox>
    </section>

    <section class="controls__section">
      <NText class="controls__label">RadioButton</NText>
      <div class="controls__row">
        <NRadioButton v-model="radioValue" value="production" name="well-type" label="Добывающая" />
        <NRadioButton v-model="radioValue" value="injection" name="well-type" label="Нагнетательная" />
        <NRadioButton v-model="radioValue" value="exploration" name="well-type" label="Разведочная" />
      </div>
    </section>

    <section class="controls__section">
      <NText class="controls__label">RadioGroup</NText>
      <NRadioGroup v-model="radioValue" :options="radioOptions" direction="horizontal" />
    </section>

    <section class="controls__section">
      <NText class="controls__label">Switch</NText>
      <NSwitch v-model="switchValue" label-before="Выкл" label-after="Вкл" />
    </section>

    <section class="controls__section">
      <NText class="controls__label">Dropdown</NText>
      <NDropdown v-model="dropdownValue" :options="dropdownOptions" placeholder="Выберите опцию" />
    </section>

    <section class="controls__section">
      <NText class="controls__label">MultiSelect</NText>
      <NMultiSelect v-model="multiSelectValue" :options="multiSelectOptions" searchable placeholder="Выберите месторождения" />
    </section>

    <section class="controls__section">
      <NText class="controls__label">SegmentedControl</NText>
      <NSegmentedControl v-model="segmentedValue" :options="segmentedOptions" />
    </section>

    <section class="controls__section">
      <NText class="controls__label">RangeSlider</NText>
      <NRangeSlider v-model="rangeValue" />
    </section>

    <section class="controls__section">
      <NText class="controls__label">DatePicker</NText>
      <NDatePicker v-model="dateValue" placeholder="Выберите дату" clearable />
    </section>

    <section class="controls__section">
      <NText class="controls__label">FileUpload</NText>
      <NFileUpload v-model="files" multiple drag-drop />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  dropdownOptions,
  multiSelectOptions,
  radioOptions,
  segmentedOptions,
} from '../mocks/controls';

const inputValue = ref('');
const numberValue = ref<number | null>(null);
const textareaValue = ref('');
const checkboxValue = ref(false);
const radioValue = ref('production');
const switchValue = ref(false);
const dropdownValue = ref<string | null>(null);
const multiSelectValue = ref<string[]>([]);
const segmentedValue = ref('day');
const rangeValue = ref(0);
const dateValue = ref<string | null>(null);
const files = ref([]);
</script>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-4);
}

.controls__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.controls__label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-grey-70);
}

.controls__row {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}
</style>
