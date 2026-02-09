import type { Meta, StoryObj } from '@storybook/vue3';
import Tooltip from './Tooltip.vue';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  args: {
    text: 'Подсказка',
    placement: 'top',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup: () => ({ args }),
    template: `
      <Tooltip v-bind="args">
        <span style="max-width: 120px; display: inline-block;">
          Очень длинный текст который не помещается
        </span>
      </Tooltip>
    `,
  }),
};

export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
    text: 'Открывается по клику',
  },
};
