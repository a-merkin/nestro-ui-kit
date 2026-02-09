import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import WorkPlace from './WorkPlace.vue';

const meta: Meta<typeof WorkPlace> = {
  title: 'Layout/WorkPlace',
  component: WorkPlace,
};
export default meta;

type Story = StoryObj<typeof WorkPlace>;

export const Default: Story = {
  render: () => ({
    components: { WorkPlace },
    setup() {
      const value = ref('one');

      return {
        value,
        tabs: [
          { label: 'Первая вкладка', value: 'one' },
          { label: 'Вторая вкладка', value: 'two' },
          { label: 'Третья вкладка', value: 'three' },
        ],
      };
    },
    template: `
      <WorkPlace v-model="value" :tabs="tabs">
        <div style="padding: 24px">Контент активной вкладки</div>
      </WorkPlace>
    `,
  }),
};
