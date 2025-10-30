import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import RadioButton from '../components/RadioButton/RadioButton.vue';

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Значение радио-кнопки',
    },
    checked: {
      control: 'boolean',
      description: 'Выбрана ли радио-кнопка',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключена ли радио-кнопка',
    },
    label: {
      control: 'text',
      description: 'Текст метки',
    },
    name: {
      control: 'text',
      description: 'Имя группы радио-кнопок',
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'option1',
    checked: false,
    label: 'Радио-кнопка',
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    value: 'option1',
    checked: true,
    label: 'Выбранная радио-кнопка',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    value: 'option1',
    checked: false,
    label: 'Отключенная радио-кнопка',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    value: 'option1',
    checked: true,
    label: 'Отключенная выбранная',
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    value: 'option1',
    checked: false,
    disabled: false,
  },
};

export const Group: Story = {
  args: {
    value: 'option1',
  },
  render: () => ({
    components: { RadioButton },
    setup() {
      const selectedValue = ref('option2');

      const handleChange = (value: string | number) => {
        selectedValue.value = value as string;
      };

      return { selectedValue, handleChange };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <RadioButton
          value="option1"
          :checked="selectedValue === 'option1'"
          label="Вариант 1"
          name="demo-group"
          @change="handleChange"
        />
        <RadioButton
          value="option2"
          :checked="selectedValue === 'option2'"
          label="Вариант 2"
          name="demo-group"
          @change="handleChange"
        />
        <RadioButton
          value="option3"
          :checked="selectedValue === 'option3'"
          label="Вариант 3"
          name="demo-group"
          @change="handleChange"
        />
        <p style="margin-top: 16px;">Выбрано: <strong>{{ selectedValue }}</strong></p>
      </div>
    `,
  }),
};
