import type { Meta, StoryObj } from '@storybook/vue3';
import NToolbar from './Toolbar.vue';
import NButton from '../Button/Button.vue';

const meta = {
  title: 'UI/Toolbar',
  component: NToolbar,
  tags: ['autodocs'],
  argTypes: {
    ariaLabel: { control: 'text', description: 'aria-label для тулбара' },
  },
} satisfies Meta<typeof NToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'По умолчанию',
  render: () => ({
    components: { NToolbar, NButton },
    template: `
      <NToolbar aria-label="Основной тулбар">
        <template #start>
          <NButton variant="secondary">Предложения</NButton>
        </template>
        <template #center>
          <span style="font-weight: 700; font-size: 18px; color: #009639; letter-spacing: 2px;">
            PLAN
          </span>
        </template>
        <template #end>
          <NButton variant="circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </NButton>
          <NButton variant="circle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </NButton>
        </template>
      </NToolbar>
    `,
  }),
};

export const StartOnly: Story = {
  name: 'Только левая часть',
  render: () => ({
    components: { NToolbar, NButton },
    template: `
      <NToolbar>
        <template #start>
          <NButton variant="secondary">Действие 1</NButton>
          <NButton variant="secondary">Действие 2</NButton>
          <NButton variant="secondary">Действие 3</NButton>
        </template>
      </NToolbar>
    `,
  }),
};

export const CenterOnly: Story = {
  name: 'Только центр',
  render: () => ({
    components: { NToolbar },
    template: `
      <NToolbar>
        <template #center>
          <span style="font-weight: 700; font-size: 18px;">Название проекта</span>
        </template>
      </NToolbar>
    `,
  }),
};

export const AllSections: Story = {
  name: 'Все секции',
  render: () => ({
    components: { NToolbar, NButton },
    template: `
      <NToolbar>
        <template #start>
          <NButton variant="text">Назад</NButton>
        </template>
        <template #center>
          <span style="font-weight: 600; font-size: 16px;">Название проекта</span>
        </template>
        <template #end>
          <NButton variant="secondary">Сохранить</NButton>
          <NButton variant="primary">Применить</NButton>
        </template>
      </NToolbar>
    `,
  }),
};
