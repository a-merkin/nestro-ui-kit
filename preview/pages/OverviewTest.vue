<template>
  <section>
    <NWorkplace v-model="activeTab" :tabs="tabs">
      <template v-if="activeTab === 'ui'">
        <NButton>Кнопка</NButton>

        <NCheckbox v-model="checkTest" />

        <NDropdown v-model="value" :options="options" />

        <NInput v-model="inputValue" placeholder="Введите текст" />

        <div style="display: flex; gap: 16px; align-items: center">
          <NRadioButton v-model="radioValue" value="one" label="Option 1" />
          <NRadioButton v-model="radioValue" value="two" label="Option 2" />
          <NRadioButton v-model="radioValue" value="three" disabled label="Disabled" />
        </div>

        <NRadioGroup v-model="radioGroupValue" label="Radio group" :options="radioGroupOptions" />

        <NRadioGroup
          v-model="radioGroupInlineValue"
          direction="horizontal"
          :options="radioGroupInlineOptions"
        />

        <div style="margin-top: 24px; max-width: 400px">
          <NRangeSlider
            v-model="rangeValue"
            :values="rangeValues"
            :cutoffs="[2, 4]"
            min-label="Min"
            max-label="Max"
          />
        </div>

        <div style="margin-top: 16px; max-width: 400px">
          <NRangeSlider v-model="singleValue" :values="rangeValues" />
        </div>

        <NProgressBar />
        <NLoader size="md" />

        <!-- SIDEBAR FILTERS SHOWCASE -->
        <div style="margin-top: 32px; max-width: 300px">
          <h3 style="margin-bottom: 12px; font-size: 14px; font-weight: 600">SidebarFilters</h3>
          <NSidebarFilters
            v-model="filterValues"
            :filters="sidebarFilters"
            :show-all-option="['do', 'field']"
            :all-option-labels="{ do: 'организации', field: 'месторождения', well: 'скважины' }"
            @apply="onFiltersApply"
            @clear="onFiltersClear"
          />
        </div>

        <!-- DATEPICKER SHOWCASE -->
        <div style="margin-top: 32px; display: flex; gap: 24px; flex-wrap: wrap">
          <NDatePicker v-model="dateValue" label="Дата начала" clearable />
          <NDatePicker
            v-model="dateValue2"
            label="Дата окончания"
            min-date="2025-01-01"
            max-date="2025-12-31"
            placeholder="Только 2025 год"
          />
        </div>

        <!-- TOOLTIP SHOWCASE -->
        <div
          style="margin-top: 32px; display: flex; gap: 24px; flex-wrap: wrap; align-items: center"
        >
          <NTooltip text="Подсказка справа" placement="right">
            <NButton size="sm" variant="secondary">Hover right</NButton>
          </NTooltip>

          <NTooltip text="Снизу" placement="bottom">
            <NButton size="sm" variant="secondary">Bottom</NButton>
          </NTooltip>

          <NTooltip text="По клику" trigger="click">
            <NButton size="sm" variant="secondary">Click me</NButton>
          </NTooltip>

          <NTooltip text="Только если обрезан" only-if-truncated>
            <span style="max-width: 120px; display: inline-block">
              Очень длинный текст который точно не помещается
            </span>
          </NTooltip>

          <NTooltip placement="top">
            <template #tooltip>
              <strong>Кастомный слот</strong><br />
              <small>Любой контент</small>
            </template>
            <NButton size="sm" variant="ghost">Slot tooltip</NButton>
          </NTooltip>
        </div>
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

const radioValue = ref<'one' | 'two' | 'three'>('one');

const radioGroupValue = ref<'a' | 'b' | 'c'>('a');
const radioGroupInlineValue = ref<'yes' | 'no'>('yes');

const radioGroupOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c', disabled: true },
];

const radioGroupInlineOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const options = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
];

const rangeValues = [10, 20, 30, 40, 50, 60];
const rangeValue = ref<[number, number]>([20, 50]);
const singleValue = ref<number>(30);

// SidebarFilters
const filterValues = ref<Record<string, string | number | null>>({
  do: null,
  field: null,
  well: null,
});

const sidebarFilters = [
  {
    key: 'do',
    label: 'Организация',
    options: [
      { value: '1', label: 'ООО Нефтедобыча' },
      { value: '2', label: 'ПАО Нефтегаз' },
      { value: '3', label: 'АО Ресурс' },
    ],
  },
  {
    key: 'field',
    label: 'Месторождение',
    options: [
      { value: '10', label: 'Самотлорское' },
      { value: '20', label: 'Ромашкинское' },
      { value: '30', label: 'Приобское' },
    ],
  },
  {
    key: 'well',
    label: 'Скважина',
    options: [
      { value: '100', label: 'Скважина №1' },
      { value: '200', label: 'Скважина №2' },
      { value: '300', label: 'Скважина №3' },
    ],
  },
];

const onFiltersApply = () => console.log('Filters applied:', filterValues.value);
const onFiltersClear = () => console.log('Filters cleared');

// DatePicker
const dateValue = ref<string | null>(null);
const dateValue2 = ref<string | null>(null);
</script>
