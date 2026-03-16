import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Switch from './Switch.vue';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Состояние переключателя (v-model)',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние',
    },
    labelBefore: {
      control: 'text',
      description: 'Текстовая метка перед переключателем',
    },
    labelAfter: {
      control: 'text',
      description: 'Текстовая метка после переключателя',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
  },
  render: (args) => ({
    components: { Switch },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <Switch v-model="value" />
      <p style="margin-top: 12px;">Значение: <strong>{{ value }}</strong></p>
    `,
  }),
};

export const WithLabelProps: Story = {
  args: {
    modelValue: false,
  },
  render: (args) => ({
    components: { Switch },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <Switch v-model="value" label-before="Выкл" label-after="Вкл" />
      <p style="margin-top: 12px;">Значение: <strong>{{ value }}</strong></p>
    `,
  }),
};

export const WithLabelAfter: Story = {
  args: {
    modelValue: true,
  },
  render: (args) => ({
    components: { Switch },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <Switch v-model="value">Включено</Switch>
    `,
  }),
};

export const WithLabelBefore: Story = {
  args: {
    modelValue: false,
  },
  render: (args) => ({
    components: { Switch },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <Switch v-model="value">
        <template #before>Уведомления</template>
        Вкл
      </Switch>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    modelValue: true,
    disabled: true,
    labelAfter: 'Заблокировано',
  },
  render: (args) => ({
    components: { Switch },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <Switch v-model="value" :disabled="args.disabled" :label-after="args.labelAfter" />
    `,
  }),
};
