import type { Meta, StoryObj } from '@storybook/vue3';
import Icon from '../components/Icon/Icon.vue';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['check', 'plus', 'unite', 'download', 'magnifier', 'settings'],
      description: 'Название иконки',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер иконки',
    },
    color: {
      control: 'color',
      description: 'Цвет иконки',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Базовая иконка
export const Default: Story = {
  args: {
    name: 'plus',
    size: 'medium',
  },
};

// Все иконки
export const AllIcons: Story = {
  args: {
    name: 'plus',
  },
  render: () => ({
    components: { Icon },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="check" />
          <span style="font-size: 12px;">check</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="plus" />
          <span style="font-size: 12px;">plus</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="unite" />
          <span style="font-size: 12px;">unite</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="download" />
          <span style="font-size: 12px;">download</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="magnifier" />
          <span style="font-size: 12px;">magnifier</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="settings" />
          <span style="font-size: 12px;">settings</span>
        </div>
      </div>
    `,
  }),
};

// Размеры
export const Sizes: Story = {
  args: {
    name: 'plus',
  },
  render: () => ({
    components: { Icon },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="plus" size="small" />
          <span style="font-size: 12px;">small</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="plus" size="medium" />
          <span style="font-size: 12px;">medium</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="plus" size="large" />
          <span style="font-size: 12px;">large</span>
        </div>
      </div>
    `,
  }),
};

// Цвета
export const Colors: Story = {
  args: {
    name: 'plus',
  },
  render: () => ({
    components: { Icon },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="plus" color="#0F9D3B" />
          <span style="font-size: 12px;">green</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="plus" color="#ED6E1C" />
          <span style="font-size: 12px;">orange</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Icon name="plus" color="#000000" />
          <span style="font-size: 12px;">black</span>
        </div>
      </div>
    `,
  }),
}; 