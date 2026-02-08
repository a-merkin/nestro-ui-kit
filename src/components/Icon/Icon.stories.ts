import Icon from './Icon.vue';
import type { Meta, StoryFn } from '@storybook/vue3';
import type { IconProps } from './Icon.types';

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: ['check', 'close', 'arrow-down', 'edit', 'delete', 'plus'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: { control: 'color' },
  },
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args: IconProps) => ({
  components: { Icon },
  setup: () => ({ args }),
  template: '<Icon v-bind="args" />',
});

export const Check = Template.bind({});
Check.args = {
  name: 'check',
  size: 'sm',
  color: 'green-100',
};

export const Close = Template.bind({});
Close.args = {
  name: 'close',
  size: 'lg',
  color: 'white',
};

export const ArrowDown = Template.bind({});
ArrowDown.args = {
  name: 'arrow-down',
  size: 'md',
  color: 'black',
};

export const Edit = Template.bind({});
Edit.args = {
  name: 'edit',
  size: 'sm',
  color: 'black',
};

export const Delete = Template.bind({});
Delete.args = {
  name: 'delete',
  size: 'sm',
  color: 'orange',
};

export const Plus = Template.bind({});
Plus.args = {
  name: 'plus',
  size: 'md',
  color: 'green-90',
};
