import type { Meta, StoryObj } from '@storybook/vue3';
import NSpeedDial from './SpeedDial.vue';

const meta = {
  title: 'UI/SpeedDial',
  component: NSpeedDial,
  tags: ['autodocs'],
  argTypes: {
    model: { control: 'object', description: 'Массив действий' },
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
      description: 'Направление раскрытия',
    },
    type: {
      control: 'select',
      options: ['floating', 'static'],
      description: 'Тип: floating (FAB) или static',
    },
    icon: { control: 'text', description: 'Иконка основной кнопки' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof NSpeedDial>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultActions = [
  { icon: 'edit' as const, label: 'Редактировать', command: () => console.log('edit') },
  { icon: 'download' as const, label: 'Скачать', command: () => console.log('download') },
  { icon: 'delete' as const, label: 'Удалить', command: () => console.log('delete') },
  { icon: 'setting' as const, label: 'Настройки', command: () => console.log('settings') },
];

// Helper wrapper to position static dials with enough space
const wrapStatic = (direction: string, template: string) => `
  <div style="display: flex; align-items: center; justify-content: center;
              min-height: 320px; min-width: 320px; position: relative;">
    ${template}
  </div>
`;

export const DirectionUp: Story = {
  name: 'Направление: вверх',
  args: {
    model: defaultActions,
    direction: 'up',
    type: 'static',
  },
  render: (args) => ({
    components: { NSpeedDial },
    setup: () => ({ args }),
    template: wrapStatic('up', '<NSpeedDial v-bind="args" />'),
  }),
};

export const DirectionDown: Story = {
  name: 'Направление: вниз',
  args: {
    model: defaultActions,
    direction: 'down',
    type: 'static',
  },
  render: (args) => ({
    components: { NSpeedDial },
    setup: () => ({ args }),
    template: wrapStatic('down', '<NSpeedDial v-bind="args" />'),
  }),
};

export const DirectionLeft: Story = {
  name: 'Направление: влево',
  args: {
    model: defaultActions,
    direction: 'left',
    type: 'static',
  },
  render: (args) => ({
    components: { NSpeedDial },
    setup: () => ({ args }),
    template: wrapStatic('left', '<NSpeedDial v-bind="args" />'),
  }),
};

export const DirectionRight: Story = {
  name: 'Направление: вправо',
  args: {
    model: defaultActions,
    direction: 'right',
    type: 'static',
  },
  render: (args) => ({
    components: { NSpeedDial },
    setup: () => ({ args }),
    template: wrapStatic('right', '<NSpeedDial v-bind="args" />'),
  }),
};

export const CustomIcon: Story = {
  name: 'Кастомная иконка',
  args: {
    model: defaultActions,
    direction: 'up',
    type: 'static',
    icon: 'setting',
  },
  render: (args) => ({
    components: { NSpeedDial },
    setup: () => ({ args }),
    template: wrapStatic('up', '<NSpeedDial v-bind="args" />'),
  }),
};

export const Disabled: Story = {
  name: 'Заблокирован',
  args: {
    model: defaultActions,
    direction: 'up',
    type: 'static',
    disabled: true,
  },
  render: (args) => ({
    components: { NSpeedDial },
    setup: () => ({ args }),
    template: wrapStatic('up', '<NSpeedDial v-bind="args" />'),
  }),
};

export const WithDisabledActions: Story = {
  name: 'С заблокированными действиями',
  args: {
    model: [
      { icon: 'edit' as const, label: 'Редактировать' },
      { icon: 'download' as const, label: 'Скачать', disabled: true },
      { icon: 'delete' as const, label: 'Удалить', disabled: true },
      { icon: 'setting' as const, label: 'Настройки' },
    ],
    direction: 'up',
    type: 'static',
  },
  render: (args) => ({
    components: { NSpeedDial },
    setup: () => ({ args }),
    template: wrapStatic('up', '<NSpeedDial v-bind="args" />'),
  }),
};

export const CustomButtonSlot: Story = {
  name: 'Кастомная кнопка (slot)',
  args: {
    model: defaultActions,
    direction: 'right',
    type: 'static',
  },
  render: (args) => ({
    components: { NSpeedDial },
    setup: () => ({ args }),
    template: wrapStatic(
      'right',
      `<NSpeedDial v-bind="args">
        <template #button="{ toggle, open }">
          <button
            @click="toggle"
            style="width: 56px; height: 56px; border-radius: 50%; border: 2px solid #009639;
                   background: white; color: #009639; cursor: pointer; font-size: 20px;
                   transition: all 0.2s ease;"
            :style="open ? 'background: #009639; color: white;' : ''"
          >
            {{ open ? '×' : '☰' }}
          </button>
        </template>
      </NSpeedDial>`
    ),
  }),
};
