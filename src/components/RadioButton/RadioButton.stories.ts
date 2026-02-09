import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import RadioButton from './RadioButton.vue';

const meta: Meta<typeof RadioButton> = {
  title: 'Form/RadioButton',
  component: RadioButton,
};
export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  render: () => ({
    components: { RadioButton },
    setup() {
      const value = ref('one');

      return { value };
    },
    template: `
      <div style="display:flex; gap:16px;">
        <RadioButton v-model="value" value="one" label="Option 1" />
        <RadioButton v-model="value" value="two" label="Option 2" />
        <RadioButton v-model="value" value="three" disabled label="Disabled" />
      </div>
    `,
  }),
};
