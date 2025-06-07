import type { Meta, StoryObj } from '@storybook/vue3';
import ColorPalette from '../components/ColorPalette.vue';

const meta = {
  title: 'Design System/Colors',
  component: ColorPalette,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Цветовая палитра дизайн-системы Nestro UI Kit. Включает в себя основные цвета, семантические цвета для текста, иконок, фонов и кнопок.',
      },
    },
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
