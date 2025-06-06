import type { Meta, StoryObj } from '@storybook/vue3'
import '../styles/typography.css'

const meta = {
  title: 'Design System/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Типографика дизайн-системы Nestro UI Kit. Все стили текста соответствуют макету Figma.'
      }
    }
  }
} satisfies Meta

export default meta

type Story = StoryObj

export const H1: Story = {
  render: () => ({
    template: `<div class="text-h1">Заголовок H1 (text-h1)</div>`
  })
}

export const H1Regular: Story = {
  render: () => ({
    template: `<div class="text-h1-regular">Заголовок H1 Regular (text-h1-regular)</div>`
  })
}

export const H2: Story = {
  render: () => ({
    template: `<div class="text-h2">Заголовок H2 (text-h2)</div>`
  })
}

export const TextM: Story = {
  render: () => ({
    template: `<div class="text-m">Текст M (text-m)</div>`
  })
}

export const TextS: Story = {
  render: () => ({
    template: `<div class="text-s">Текст S (text-s)</div>`
  })
}

export const TextSBold: Story = {
  render: () => ({
    template: `<div class="text-s-bold">Текст S Bold (text-s-bold)</div>`
  })
}

export const TextXS: Story = {
  render: () => ({
    template: `<div class="text-xs">Текст XS (text-xs)</div>`
  })
} 