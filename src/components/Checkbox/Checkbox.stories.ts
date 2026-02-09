import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Значение чекбокса или массив выбранных значений',
    },
    value: { control: 'text', description: 'Значение для массива (опционально)' },
    disabled: { control: 'boolean', description: 'Отключен ли чекбокс' },
    default: { control: 'text', description: 'Текст метки чекбокса' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { modelValue: false, default: 'Чекбокс' } };
export const Checked: Story = { args: { modelValue: true, default: 'Отмеченный чекбокс' } };
export const Disabled: Story = {
  args: { modelValue: false, disabled: true, default: 'Отключенный чекбокс' },
};
export const DisabledChecked: Story = {
  args: { modelValue: true, disabled: true, default: 'Отключенный отмеченный чекбокс' },
};
export const WithoutLabel: Story = { args: { modelValue: false } };

export const ArrayMode = {
  render: () => ({
    components: { Checkbox },
    setup() {
      const selected = ref(['apple']);
      return { selected };
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <Checkbox v-model="selected" value="apple">Яблоко</Checkbox>
        <Checkbox v-model="selected" value="banana">Банан</Checkbox>
        <Checkbox v-model="selected" value="orange">Апельсин</Checkbox>
        <Checkbox v-model="selected" value="grape">Виноград</Checkbox>
        <div style="margin-top:20px;padding:12px;background:#f5f5f5;border-radius:4px;">
          <strong>Выбрано:</strong> {{ selected.join(', ') || 'Ничего не выбрано' }}
        </div>
      </div>
    `,
  }),
};
