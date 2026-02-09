import type { Meta, StoryObj } from '@storybook/vue3';
import RangeSlider from './RangeSlider.vue';

const meta: Meta<typeof RangeSlider> = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
};
export default meta;

type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  args: {
    values: [0, 20, 40, 60, 80, 100],
    modelValue: [20, 60],
  },
};

export const SingleValue: Story = {
  args: {
    values: [0, 20, 40, 60, 80, 100],
    modelValue: 40,
  },
};
