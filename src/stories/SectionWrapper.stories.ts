import type { Meta, StoryObj } from '@storybook/vue3';
import SectionWrapper from '../components/SectionWrapper/SectionWrapper.vue';

const meta = {
  title: 'UI/SectionWrapper',
  component: SectionWrapper,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок секции',
    },
  },
} satisfies Meta<typeof SectionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Заголовок секции',
  },
  render: (args) => ({
    components: { SectionWrapper },
    setup() {
      return { args };
    },
    template: `
      <SectionWrapper :title="args.title">
        <template #content>
          <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
            Содержимое секции. Здесь может быть любой контент.
          </div>
        </template>
      </SectionWrapper>
    `,
  }),
};

export const WithComplexContent: Story = {
  args: {
    title: 'Сложный контент',
  },
  render: (args) => ({
    components: { SectionWrapper },
    setup() {
      return { args };
    },
    template: `
      <SectionWrapper :title="args.title">
        <template #content>
          <div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <h3>Вложенный заголовок</h3>
            <p>Это пример более сложного контента внутри секции.</p>
            <ul>
              <li>Элемент списка 1</li>
              <li>Элемент списка 2</li>
              <li>Элемент списка 3</li>
            </ul>
          </div>
        </template>
      </SectionWrapper>
    `,
  }),
};
