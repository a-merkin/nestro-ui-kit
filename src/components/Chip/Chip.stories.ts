import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import NChip from './Chip.vue';

const meta = {
  title: 'UI/Chip',
  component: NChip,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Текст чипа' },
    icon: {
      control: 'select',
      options: [
        undefined,
        'check',
        'close',
        'edit',
        'delete',
        'plus',
        'download',
        'magnifier',
        'setting',
      ],
      description: 'Иконка',
    },
    image: { control: 'text', description: 'URL изображения' },
    removable: { control: 'boolean', description: 'Возможность удаления' },
    disabled: { control: 'boolean', description: 'Заблокирован' },
  },
} satisfies Meta<typeof NChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'По умолчанию',
  args: {
    label: 'Chip',
  },
};

export const WithIcon: Story = {
  name: 'С иконкой',
  args: {
    label: 'Настройки',
    icon: 'setting',
  },
};

export const WithImage: Story = {
  name: 'С изображением',
  args: {
    label: 'Пользователь',
    image: 'https://i.pravatar.cc/32',
  },
};

export const Removable: Story = {
  name: 'С удалением',
  args: {
    label: 'Удаляемый',
    removable: true,
  },
  render: (args) => ({
    components: { NChip },
    setup() {
      const visible = ref(true);
      const handleRemove = () => {
        visible.value = false;
      };
      return { args, visible, handleRemove };
    },
    template: `
      <NChip v-if="visible" v-bind="args" @remove="handleRemove" />
      <span v-else style="color: #999; font-size: 14px;">Чип удалён</span>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Заблокирован',
  args: {
    label: 'Заблокирован',
    disabled: true,
  },
};

export const Group: Story = {
  name: 'Группа чипов',
  render: () => ({
    components: { NChip },
    setup() {
      const chips = ref(['Скважина 1', 'Скважина 2', 'Скважина 3', 'Пласт А']);
      const remove = (index: number) => {
        chips.value.splice(index, 1);
      };
      return { chips, remove };
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <NChip
          v-for="(chip, i) in chips"
          :key="chip"
          :label="chip"
          removable
          @remove="remove(i)"
        />
      </div>
    `,
  }),
};

export const WithIconRemovable: Story = {
  name: 'С иконкой и удалением',
  args: {
    label: 'Фильтр',
    icon: 'check',
    removable: true,
  },
};
