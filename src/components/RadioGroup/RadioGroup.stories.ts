import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import RadioGroup from './RadioGroup.vue';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Vertical: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref('one');

      return {
        value,
        options: [
          { label: 'Option 1', value: 'one' },
          { label: 'Option 2', value: 'two' },
          { label: 'Option 3', value: 'three', disabled: true },
        ],
      };
    },
    template: `
      <RadioGroup
        v-model="value"
        label="Choose option"
        :options="options"
      />
    `,
  }),
};

export const Horizontal: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref('one');

      return {
        value,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ],
      };
    },
    template: `
      <RadioGroup
        v-model="value"
        direction="horizontal"
        :options="options"
      />
    `,
  }),
};
