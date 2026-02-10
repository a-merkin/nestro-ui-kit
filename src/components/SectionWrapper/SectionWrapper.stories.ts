import type { Meta, StoryObj } from '@storybook/vue3';
import SectionWrapper from './SectionWrapper.vue';

const meta = {
  title: 'UI/SectionWrapper',
  component: SectionWrapper,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок секции',
    },
    modelValue: {
      control: 'boolean',
      description: 'Открыто / закрыто (v-model)',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Начальное состояние, если v-model не используется',
    },
  },
} satisfies Meta<typeof SectionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Заголовок секции',
    defaultOpen: true,
  },
  render: (args) => ({
    components: { SectionWrapper },
    setup() {
      return { args };
    },
    template: `
      <SectionWrapper v-bind="args">
        <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
          Содержимое секции. Здесь может быть любой контент.
        </div>
      </SectionWrapper>
    `,
  }),
};

export const Controlled: Story = {
  args: {
    title: 'Управляемое состояние',
    modelValue: true,
  },
  render: (args) => ({
    components: { SectionWrapper },
    setup() {
      return { args };
    },
    template: `
      <SectionWrapper v-model="args.modelValue" :title="args.title">
        <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
          Открытие и закрытие управляется извне через v-model.
        </div>
      </SectionWrapper>
    `,
  }),
};

export const WithCustomHeader: Story = {
  args: {
    title: 'Кастомный хедер',
  },
  render: (args) => ({
    components: { SectionWrapper },
    setup() {
      return { args };
    },
    template: `
      <SectionWrapper :title="args.title">
        <template #header>
          <div style="font-weight: 600; font-size: 18px;">Мой кастомный заголовок</div>
        </template>

        <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
          Контент с кастомным хедером.
        </div>
      </SectionWrapper>
    `,
  }),
};
