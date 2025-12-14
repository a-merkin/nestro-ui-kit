import type { Meta, StoryObj } from '@storybook/vue3';
import Tooltip from '../components/Tooltip/Tooltip.vue';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст тултипа',
    },
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Позиция тултипа',
    },
    onlyIfTruncated: {
      control: 'boolean',
      description: 'Показывать только если текст обрезан',
    },
  },
  args: {
    text: 'Полный текст тултипа',
    placement: 'right',
    onlyIfTruncated: true,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 140px">
        <Tooltip v-bind="args">
          Очень длинный текст, который не помещается
        </Tooltip>
      </div>
    `,
  }),
};

export const AlwaysVisible: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 140px">
        <Tooltip v-bind="args">
          Очень длинный текст, который не помещается
        </Tooltip>
      </div>
    `,
  }),
  args: {
    onlyIfTruncated: false,
  },
};

export const Top: Story = {
  ...Default,
  args: {
    placement: 'top',
  },
};

export const Bottom: Story = {
  ...Default,
  args: {
    placement: 'bottom',
  },
};

export const Left: Story = {
  ...Default,
  args: {
    placement: 'left',
  },
};

export const CustomTooltipSlot: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div style="width: 140px">
        <Tooltip>
          Очень длинный текст
          <template #tooltip>
            <strong>Кастомный</strong><br />тултип 🔥
          </template>
        </Tooltip>
      </div>
    `,
  }),
};
