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
    searchable: {
      control: 'boolean',
      description: 'Включить поиск в основном поле ввода',
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

export const WithSearch: Story = {
  args: {
    modelValue: '',
    options: defaultOptions,
    placeholder: 'Начните печатать...',
    searchable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Дропдаун с функцией поиска. Начните печатать в поле для фильтрации опций.',
      },
    },
  },
};

export const SearchWithManyOptions: Story = {
  args: {
    modelValue: '',
    options: [
      { value: '1', label: 'Москва' },
      { value: '2', label: 'Санкт-Петербург' },
      { value: '3', label: 'Новосибирск' },
      { value: '4', label: 'Екатеринбург' },
      { value: '5', label: 'Казань' },
      { value: '6', label: 'Нижний Новгород' },
      { value: '7', label: 'Челябинск' },
      { value: '8', label: 'Самара' },
      { value: '9', label: 'Омск' },
      { value: '10', label: 'Ростов-на-Дону' },
      { value: '11', label: 'Уфа' },
      { value: '12', label: 'Красноярск' },
      { value: '13', label: 'Воронеж' },
      { value: '14', label: 'Пермь' },
      { value: '15', label: 'Волгоград' },
    ],
    placeholder: 'Поиск города...',
    searchable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Дропдаун с большим списком городов и поиском. Попробуйте найти "Москва" или "Новосибирск".',
      },
    },
  },
};

export const SearchSelected: Story = {
  args: {
    modelValue: '2',
    options: [
      { value: '1', label: 'JavaScript' },
      { value: '2', label: 'TypeScript' },
      { value: '3', label: 'Python' },
      { value: '4', label: 'Java' },
      { value: '5', label: 'C++' },
      { value: '6', label: 'C#' },
      { value: '7', label: 'Ruby' },
      { value: '8', label: 'Go' },
      { value: '9', label: 'Rust' },
      { value: '10', label: 'PHP' },
    ],
    placeholder: 'Выберите язык программирования',
    searchable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Дропдаун с предварительно выбранным значением и поиском.',
      },
    },
  },
};
