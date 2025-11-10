import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Checkbox from '../components/Checkbox/Checkbox.vue';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Значение чекбокса (boolean) или массив выбранных значений (any[])',
    },
    value: {
      control: 'text',
      description: 'Значение для режима массива (опционально)',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключен ли чекбокс',
    },
    default: {
      control: 'text',
      description: 'Текст метки чекбокса',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
    default: 'Чекбокс',
  },
};

export const Checked: Story = {
  args: {
    modelValue: true,
    default: 'Отмеченный чекбокс',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: false,
    disabled: true,
    default: 'Отключенный чекбокс',
  },
};

export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    disabled: true,
    default: 'Отключенный отмеченный чекбокс',
  },
};

export const WithoutLabel: Story = {
  args: {
    modelValue: false,
  },
};

// Примеры работы с массивами
export const ArrayMode = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const selectedFruits = ref<string[]>(['apple']);
      return { selectedFruits };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Checkbox v-model="selectedFruits" value="apple">Яблоко</Checkbox>
        <Checkbox v-model="selectedFruits" value="banana">Банан</Checkbox>
        <Checkbox v-model="selectedFruits" value="orange">Апельсин</Checkbox>
        <Checkbox v-model="selectedFruits" value="grape">Виноград</Checkbox>
        <div style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <strong>Выбрано:</strong> {{ selectedFruits.join(', ') || 'Ничего не выбрано' }}
        </div>
      </div>
    `,
  }),
};

export const ArrayModeWithObjects = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const selectedUsers = ref<number[]>([1, 3]);
      const users = [
        { id: 1, name: 'Иван Иванов' },
        { id: 2, name: 'Петр Петров' },
        { id: 3, name: 'Мария Сидорова' },
        { id: 4, name: 'Анна Кузнецова' },
      ];
      return { selectedUsers, users };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <Checkbox 
          v-for="user in users" 
          :key="user.id"
          v-model="selectedUsers" 
          :value="user.id"
        >
          {{ user.name }}
        </Checkbox>
        <div style="margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <strong>Выбраны ID:</strong> {{ selectedUsers.join(', ') || 'Ничего не выбрано' }}
        </div>
      </div>
    `,
  }),
};
