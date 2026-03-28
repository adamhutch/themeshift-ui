import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from '@/ui/Button';

const meta = {
  title: 'Components/Button',
  component: Button,

  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Click me',
};

export const Primary: Story = {
  args: {
    ...defaultArgs,
    intent: 'primary',
  },
};
