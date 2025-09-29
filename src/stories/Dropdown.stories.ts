import type { Meta, StoryObj } from '@storybook/vue3';
import { computed, ref, watch } from 'vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Выбранное значение',
    },
    options: {
      control: 'object',
      description: 'Массив опций для выбора',
    },
    placeholder: {
      control: 'text',
      description: 'Текст подсказки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключен ли дропдаун',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
];

export const Default: Story = {
  args: {
    modelValue: '',
    options: defaultOptions,
    placeholder: 'Выберите опцию',
  },
};

export const WithSelectedValue: Story = {
  args: {
    modelValue: '2',
    options: defaultOptions,
  },
};

export const Disabled: Story = {
  args: {
    modelValue: '',
    options: defaultOptions,
    disabled: true,
    placeholder: 'Недоступный дропдаун',
  },
};

export const WithManyOptions: Story = {
  args: {
    modelValue: '',
    options: [
      { value: '1', label: 'Очень длинная опция номер один' },
      { value: '2', label: 'Опция 2' },
      { value: '3', label: 'Опция 3' },
      { value: '4', label: 'Опция 4' },
      { value: '5', label: 'Опция 5' },
      { value: '6', label: 'Опция 6' },
      { value: '7', label: 'Опция 7' },
    ],
    placeholder: 'Выберите из списка',
  },
};

export const WithClearButton: Story = {
  args: {
    modelValue: '1',
    options: defaultOptions,
    placeholder: 'Выберите опцию',
  },
  parameters: {
    docs: {
      description: {
        story: 'Дропдаун с выбранным значением и возможностью сброса через крестик.',
      },
    },
  },
};

export const InteractiveSelection: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    placeholder: 'Выберите опцию',
  },
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const selected = ref<string | number | null>(args.modelValue ?? null);

      watch(
        () => args.modelValue,
        (next) => {
          selected.value = (next !== undefined ? next : null) as string | number | null;
        }
      );

      const handleUpdate = (value: string | number) => {
        selected.value = value;
      };

      const displayedValue = computed(() => {
        if (selected.value === null || selected.value === undefined || selected.value === '') {
          return '—';
        }

        return String(selected.value);
      });

      return {
        args,
        selected,
        handleUpdate,
        displayedValue,
      };
    },
    template: `
      <div style="display: grid; gap: 12px; max-width: 320px;">
        <Dropdown
          v-bind="args"
          :modelValue="selected"
          @update:modelValue="handleUpdate"
        />
        <div>Текущее значение: {{ displayedValue }}</div>
      </div>
    `,
  }),
};
