import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import RangeSlider from '../components/RangeSlider/RangeSlider.vue';

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'number' },
      description: 'Текущее значение слайдера',
    },
    min: {
      control: { type: 'number' },
      description: 'Минимальное значение',
    },
    max: {
      control: { type: 'number' },
      description: 'Максимальное значение',
    },
    minLabel: {
      control: { type: 'text' },
      description: 'Подпись минимального значения',
    },
    maxLabel: {
      control: { type: 'text' },
      description: 'Подпись максимального значения',
    },
    step: {
      control: { type: 'number' },
      description: 'Шаг изменения значения',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Отключить слайдер',
    },
    cutoffs: {
      control: { type: 'object' },
      description: 'Массив значений отсечек для отображения на слайдере',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => ({
    components: { RangeSlider },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RangeSlider
          v-model="value"
          :min="args.min"
          :max="args.max"
          :min-label="args.minLabel"
          :max-label="args.maxLabel"
          :step="args.step"
          :disabled="args.disabled"
        />
        <p style="margin-top: 16px; font-size: 14px;">Текущее значение: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    modelValue: 0,
    min: -100,
    max: 100,
    minLabel: '-100%',
    maxLabel: '100%',
    step: 1,
    disabled: false,
  },
};

export const WithCustomRange: Story = {
  render: (args: any) => ({
    components: { RangeSlider },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RangeSlider
          v-model="value"
          :min="args.min"
          :max="args.max"
          :min-label="args.minLabel"
          :max-label="args.maxLabel"
          :step="args.step"
          :disabled="args.disabled"
        />
        <p style="margin-top: 16px; font-size: 14px;">Текущее значение: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    modelValue: 50,
    min: 0,
    max: 100,
    minLabel: '0',
    maxLabel: '100',
    step: 5,
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args: any) => ({
    components: { RangeSlider },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RangeSlider
          v-model="value"
          :min="args.min"
          :max="args.max"
          :min-label="args.minLabel"
          :max-label="args.maxLabel"
          :step="args.step"
          :disabled="args.disabled"
        />
        <p style="margin-top: 16px; font-size: 14px;">Текущее значение: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    modelValue: 25,
    min: -100,
    max: 100,
    minLabel: '-100%',
    maxLabel: '100%',
    step: 1,
    disabled: true,
  },
};

export const WithCustomLabels: Story = {
  render: (args: any) => ({
    components: { RangeSlider },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <RangeSlider
          v-model="value"
          :min="args.min"
          :max="args.max"
          :min-label="args.minLabel"
          :max-label="args.maxLabel"
          :step="args.step"
          :disabled="args.disabled"
        />
        <p style="margin-top: 16px; font-size: 14px;">Текущее значение: {{ value }}°C</p>
      </div>
    `,
  }),
  args: {
    modelValue: 20,
    min: -20,
    max: 40,
    minLabel: 'Холодно',
    maxLabel: 'Жарко',
    step: 2,
    disabled: false,
  },
};

// New: Discrete values range mode (numbers)
export const DiscreteRangeNumbers: Story = {
  render: () => ({
    components: { RangeSlider },
    setup() {
      const values = [0, 10, 20, 30, 40, 50, 60];
      const selected = ref<[number, number]>([10, 50]);
      return { values, selected };
    },
    template: `
      <div>
        <RangeSlider v-model="selected" :values="values" :range="true" />
        <p style="margin-top: 16px; font-size: 14px;">Диапазон: {{ selected[0] }} — {{ selected[1] }}</p>
      </div>
    `,
  }),
};

// New: Discrete values range mode (dates)
export const DiscreteRangeDates: Story = {
  render: () => ({
    components: { RangeSlider },
    setup() {
      const values = [
        new Date('2024-01-01'),
        new Date('2024-02-01'),
        new Date('2024-03-01'),
        new Date('2024-04-01'),
        new Date('2024-05-01'),
        new Date('2024-06-01'),
      ];
      const selected = ref<[Date, Date]>([values[1], values[4]]);
      const fmt = (d: Date) => d.toLocaleDateString();
      return { values, selected, fmt };
    },
    template: `
      <div>
        <RangeSlider v-model="selected" :values="values" :range="true" :label-formatter="fmt" />
        <p style="margin-top: 16px; font-size: 14px;">Диапазон: {{ fmt(selected[0]) }} — {{ fmt(selected[1]) }}</p>
      </div>
    `,
  }),
};

// New: With cutoffs in continuous mode
export const WithCutoffsContinuous: Story = {
  render: (args: any) => ({
    components: { RangeSlider },
    setup() {
      const value = ref(args.modelValue);
      const cutoffs = [-50, 0, 50];
      return { args, value, cutoffs };
    },
    template: `
      <div>
        <RangeSlider
          v-model="value"
          :min="args.min"
          :max="args.max"
          :min-label="args.minLabel"
          :max-label="args.maxLabel"
          :step="args.step"
          :cutoffs="cutoffs"
        />
        <p style="margin-top: 16px; font-size: 14px;">Текущее значение: {{ value }}</p>
        <p style="margin-top: 8px; font-size: 12px; color: #ed6e1c;">Отсечки: -50, 0, 50</p>
      </div>
    `,
  }),
  args: {
    modelValue: 0,
    min: -100,
    max: 100,
    minLabel: '-100%',
    maxLabel: '100%',
    step: 1,
  },
};

// New: With cutoffs in discrete range mode
export const WithCutoffsDiscreteRange: Story = {
  render: () => ({
    components: { RangeSlider },
    setup() {
      const values = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      const selected = ref<[number, number]>([20, 80]);
      const cutoffs = [25, 50, 75];
      return { values, selected, cutoffs };
    },
    template: `
      <div>
        <RangeSlider 
          v-model="selected" 
          :values="values" 
          :range="true" 
          :cutoffs="cutoffs"
        />
        <p style="margin-top: 16px; font-size: 14px;">Диапазон: {{ selected[0] }} — {{ selected[1] }}</p>
        <p style="margin-top: 8px; font-size: 12px; color: #ed6e1c;">Отсечки на значениях: 25, 50, 75 (только 50 будет отображаться, т.к. есть в values)</p>
      </div>
    `,
  }),
};

// New: With cutoffs in discrete range mode (dates)
export const WithCutoffsDiscreteDates: Story = {
  render: () => ({
    components: { RangeSlider },
    setup() {
      const values = [
        new Date('2024-01-01'),
        new Date('2024-02-01'),
        new Date('2024-03-01'),
        new Date('2024-04-01'),
        new Date('2024-05-01'),
        new Date('2024-06-01'),
      ];
      const selected = ref<[Date, Date]>([values[1], values[4]]);
      const cutoffs = [new Date('2024-03-01'), new Date('2024-05-01')];
      const fmt = (d: Date) => d.toLocaleDateString();
      return { values, selected, cutoffs, fmt };
    },
    template: `
      <div>
        <RangeSlider 
          v-model="selected" 
          :values="values" 
          :range="true" 
          :label-formatter="fmt"
          :cutoffs="cutoffs"
        />
        <p style="margin-top: 16px; font-size: 14px;">Диапазон: {{ fmt(selected[0]) }} — {{ fmt(selected[1]) }}</p>
        <p style="margin-top: 8px; font-size: 12px; color: #ed6e1c;">Отсечки: март и май 2024</p>
      </div>
    `,
  }),
};
