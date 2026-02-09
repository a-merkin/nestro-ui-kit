<template>
  <section>
    <Workplace v-model="activeTab" :tabs="tabs">
      <template v-if="activeTab === 'main'">
        <h2>Кнопка</h2>
        <Button>Кнопка</Button>

        <h2 style="margin-top: 20px">Чекбокс</h2>
        <Checkbox v-model="checkboxValue">Опция</Checkbox>

        <h2 style="margin-top: 20px">Dropdown</h2>
        <Dropdown v-model="dropdownValue" :options="dropdownOptions" placeholder="Выберите опцию" />

        <h2 style="margin-top: 20px">Input</h2>
        <Input v-model="inputValue" placeholder="Введите текст" />

        <h2 style="margin-top: 20px">Loader</h2>
        <Loader text="Загрузка..." />

        <h2 style="margin-top: 20px">ProgressBar</h2>
        <ProgressBar :value="progressValue" />

        <h2 style="margin-top: 20px">RadioButton</h2>
        <div style="display: flex; gap: 16px">
          <RadioButton
            v-for="option in radioOptions"
            :key="option.value"
            v-model="radioValue"
            :value="option.value"
            :label="option.label"
          />
        </div>

        <h2 style="margin-top: 20px">RangeSlider</h2>
        <RangeSlider v-model="rangeValue" />

        <h2 style="margin-top: 20px">SegmentedControl</h2>
        <SectionWrapper title="SegmentedControl" style="margin-top: 20px">
          <SegmentedControl v-model="segmentedValue" :options="segmentedOptions" />
        </SectionWrapper>

        <h2 style="margin-top: 20px">Switch</h2>
        <Switch v-model="switchValue" label-before="Включить" label-after="Отключить" />

        <h2 style="margin-top: 20px">Tooltip</h2>
        <Tooltip text="Подсказка" :only-if-truncated="false">
          <span>Наведи на меня</span>
        </Tooltip>

        <h2 style="margin-top: 20px">MultiSelect</h2>
        <MultiSelect v-model="multiValue" :options="multiOptions" searchable />

        <h2 style="margin-top: 20px">CurrentScenario</h2>
        <CurrentScenario :scenario-parts="scenarioParts" />
      </template>

      <template v-else-if="activeTab === 'pricing'">
        <p>Информация о ценах</p>
      </template>

      <template v-else-if="activeTab === 'specs'">
        <p>Технические характеристики</p>
      </template>
    </Workplace>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Workplace from '../../src/components/Workplace.vue';
import Button from '../../src/components/Button/Button.vue';
import Checkbox from '../../src/components/Checkbox/Checkbox.vue';
import Dropdown from '../../src/components/Dropdown/Dropdown.vue';
import Input from '../../src/components/Input/Input.vue';
import Loader from '../../src/components/Loader/Loader.vue';
import ProgressBar from '../../src/components/ProgressBar/ProgressBar.vue';
import RadioButton from '../../src/components/RadioButton/RadioButton.vue';
import RangeSlider from '../../src/components/RangeSlider/RangeSlider.vue';
import SectionWrapper from '../../src/components/SectionWrapper/SectionWrapper.vue';
import SegmentedControl, {
  SegmentedControlOption,
} from '../../src/components/SegmentedControl/SegmentedControl.vue';
import Switch from '../../src/components/Switch/Switch.vue';
import Tooltip from '../../src/components/Tooltip/Tooltip.vue';
import MultiSelect from '../../src/components/MultiSelect.vue';
import CurrentScenario from '../../src/components/CurrentScenario.vue';

const activeTab = ref('main');
const checkboxValue = ref(false);
const dropdownValue = ref<string | number | null>(null);
const inputValue = ref('');
const progressValue = ref(45);
const radioValue = ref<string | number | null>(null);
const rangeValue = ref(0);
const segmentedValue = ref('1');
const switchValue = ref(false);
const multiValue = ref<Array<string | number>>([]);

const dropdownOptions = [
  { label: 'Опция 1', value: 1 },
  { label: 'Опция 2', value: 2 },
  { label: 'Опция 3', value: 3 },
];

const radioOptions = [
  { label: 'Вариант A', value: 'A' },
  { label: 'Вариант B', value: 'B' },
  { label: 'Вариант C', value: 'C' },
];

const segmentedOptions: SegmentedControlOption[] = [
  { label: 'Сегмент 1', value: '1' },
  { label: 'Сегмент 2', value: '2' },
  { label: 'Сегмент 3', value: '3' },
];

const multiOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Mango', value: 'mango' },
];

const scenarioParts = ['Шаг 1', 'Подшаг', 'Финал'];

const tabs = [
  { label: 'Основное', value: 'main' },
  { label: 'Цены', value: 'pricing' },
  { label: 'Характеристики', value: 'specs' },
];
</script>
