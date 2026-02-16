import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import NMenu from './Menu.vue';
import NButton from '../Button/Button.vue';

const meta = {
  title: 'UI/Menu',
  component: NMenu,
  tags: ['autodocs'],
  argTypes: {
    model: { control: 'object', description: 'Массив пунктов меню' },
    popup: { control: 'boolean', description: 'Режим popup' },
  },
} satisfies Meta<typeof NMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  {
    label: 'Файл',
    icon: 'plus' as const,
    command: () => console.log('Файл'),
  },
  {
    label: 'Редактировать',
    icon: 'edit' as const,
    command: () => console.log('Редактировать'),
  },
  { separator: true },
  {
    label: 'Настройки',
    icon: 'setting' as const,
    command: () => console.log('Настройки'),
  },
  {
    label: 'Скачать',
    icon: 'download' as const,
    command: () => console.log('Скачать'),
  },
];

export const Default: Story = {
  args: {
    model: basicItems,
  },
  render: (args) => ({
    components: { NMenu },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 280px;">
        <NMenu v-bind="args" />
      </div>
    `,
  }),
};

export const WithGroups: Story = {
  name: 'С группами',
  args: {
    model: [
      {
        label: 'Документы',
        items: [
          { label: 'Создать', icon: 'plus' as const },
          { label: 'Открыть', icon: 'download' as const },
        ],
      },
      {
        label: 'Профиль',
        items: [
          { label: 'Настройки', icon: 'setting' as const },
          { label: 'Выйти', icon: 'close' as const },
        ],
      },
    ],
  },
  render: (args) => ({
    components: { NMenu },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 280px;">
        <NMenu v-bind="args" />
      </div>
    `,
  }),
};

export const WithDisabled: Story = {
  name: 'С заблокированными пунктами',
  args: {
    model: [
      { label: 'Копировать', icon: 'check' as const },
      { label: 'Вставить', icon: 'plus' as const, disabled: true },
      { separator: true },
      { label: 'Удалить', icon: 'delete' as const },
    ],
  },
  render: (args) => ({
    components: { NMenu },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 280px;">
        <NMenu v-bind="args" />
      </div>
    `,
  }),
};

export const WithHiddenItems: Story = {
  name: 'Со скрытыми пунктами',
  args: {
    model: [
      { label: 'Видимый пункт 1', icon: 'check' as const },
      { label: 'Скрытый пункт', icon: 'close' as const, visible: false },
      { label: 'Видимый пункт 2', icon: 'edit' as const },
    ],
  },
  render: (args) => ({
    components: { NMenu },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 280px;">
        <NMenu v-bind="args" />
      </div>
    `,
  }),
};

export const Popup: Story = {
  name: 'Popup режим',
  args: {
    model: basicItems,
    popup: true,
  },
  render: (args) => ({
    components: { NMenu, NButton },
    setup() {
      const menuRef = ref();
      const toggleMenu = (event: MouseEvent) => {
        menuRef.value?.toggle(event);
      };
      return { args, menuRef, toggleMenu };
    },
    template: `
      <div>
        <NButton variant="secondary" @click="toggleMenu">Открыть меню</NButton>
        <NMenu ref="menuRef" v-bind="args" />
      </div>
    `,
  }),
};

export const PopupWithGroups: Story = {
  name: 'Popup с группами',
  args: {
    model: [
      {
        label: 'Навигация',
        items: [
          { label: 'Карта', icon: 'magnifier' as const },
          { label: 'Таблицы', icon: 'unite' as const },
        ],
      },
      { separator: true },
      {
        label: 'Действия',
        items: [
          { label: 'Скачать отчёт', icon: 'download' as const },
          { label: 'Настройки', icon: 'setting' as const },
        ],
      },
    ],
    popup: true,
  },
  render: (args) => ({
    components: { NMenu, NButton },
    setup() {
      const menuRef = ref();
      const toggleMenu = (event: MouseEvent) => {
        menuRef.value?.toggle(event);
      };
      return { args, menuRef, toggleMenu };
    },
    template: `
      <div>
        <NButton variant="secondary" @click="toggleMenu">Меню с группами</NButton>
        <NMenu ref="menuRef" v-bind="args" />
      </div>
    `,
  }),
};

export const WithLinks: Story = {
  name: 'С внешними ссылками',
  args: {
    model: [
      { label: 'Документация', icon: 'download' as const, url: '#docs' },
      { label: 'GitHub', icon: 'plus' as const, url: '#github', target: '_blank' },
      { separator: true },
      { label: 'Поддержка', icon: 'magnifier' as const, url: '#support' },
    ],
  },
  render: (args) => ({
    components: { NMenu },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 280px;">
        <NMenu v-bind="args" />
      </div>
    `,
  }),
};
