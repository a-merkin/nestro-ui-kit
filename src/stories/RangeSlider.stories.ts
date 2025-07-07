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