<!-- ColorPalette.vue -->
<template>
  <div class="color-palette">
    <section v-for="(group, groupName) in colorGroups" :key="groupName" class="color-group">
      <h2>{{ formatGroupName(String(groupName)) }}</h2>
      <div class="color-grid">
        <div v-for="(color, name) in group" :key="name" class="color-item">
          <div class="color-preview" :style="{ backgroundColor: `var(${String(name)})` }"></div>
          <div class="color-info">
            <div class="color-name">{{ formatColorName(String(name)) }}</div>
            <div class="color-value">{{ String(name) }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '../styles/colors.css'

interface ColorGroups {
  [key: string]: {
    [key: string]: string
  }
}

export default defineComponent({
  name: 'ColorPalette',
  setup() {
    const colorGroups: ColorGroups = {
      base: {
        '--color-white': '--color-white',
        '--color-black': '--color-black',
      },
      green: {
        '--color-green-100': '--color-green-100',
        '--color-green-90': '--color-green-90',
        '--color-green-80': '--color-green-80',
        '--color-green-50': '--color-green-50',
      },
      blue: {
        '--color-blue-70': '--color-blue-70',
        '--color-blue-60': '--color-blue-60',
        '--color-blue-50': '--color-blue-50',
        '--color-blue-40': '--color-blue-40',
        '--color-blue-30': '--color-blue-30',
      },
      grey: {
        '--color-grey-100': '--color-grey-100',
        '--color-grey-80': '--color-grey-80',
        '--color-grey-70': '--color-grey-70',
        '--color-grey-50': '--color-grey-50',
        '--color-grey-40': '--color-grey-40',
        '--color-grey-20': '--color-grey-20',
      },
      accent: {
        '--color-orange': '--color-orange',
      },
      background: {
        '--color-background-primary': '--color-background-primary',
        '--color-background-secondary': '--color-background-secondary',
        '--color-background-tertiary': '--color-background-tertiary',
      },
      text: {
        '--color-text-primary': '--color-text-primary',
        '--color-text-secondary': '--color-text-secondary',
        '--color-text-tertiary': '--color-text-tertiary',
        '--color-text-accent': '--color-text-accent',
        '--color-text-disabled': '--color-text-disabled',
        '--color-text-white': '--color-text-white',
      },
      icon: {
        '--color-icon-primary': '--color-icon-primary',
        '--color-icon-secondary': '--color-icon-secondary',
        '--color-icon-accent': '--color-icon-accent',
        '--color-icon-stroke': '--color-icon-stroke',
        '--color-icon-stroke-secondary': '--color-icon-stroke-secondary',
      },
      stroke: {
        '--color-stroke-primary': '--color-stroke-primary',
        '--color-stroke-error': '--color-stroke-error',
        '--color-stroke-secondary': '--color-stroke-secondary',
        '--color-stroke-tertiary': '--color-stroke-tertiary',
        '--color-stroke-disabled': '--color-stroke-disabled',
      },
      button: {
        '--color-button-primary': '--color-button-primary',
        '--color-button-primary-hover': '--color-button-primary-hover',
        '--color-button-primary-pressed': '--color-button-primary-pressed',
        '--color-button-primary-disabled': '--color-button-primary-disabled',
        '--color-button-secondary': '--color-button-secondary',
        '--color-button-tertiary': '--color-button-tertiary',
        '--color-button-light': '--color-button-light',
      },
    }

    const formatGroupName = (name: string): string => {
      const groupNames: { [key: string]: string } = {
        base: 'Базовые цвета',
        green: 'Зеленые цвета',
        blue: 'Синие цвета',
        grey: 'Серые цвета',
        accent: 'Акцентные цвета',
        background: 'Фоновые цвета',
        text: 'Цвета текста',
        icon: 'Цвета иконок',
        stroke: 'Цвета обводки',
        button: 'Цвета кнопок',
      }
      return groupNames[name]
    }

    const formatColorName = (name: string): string => {
      return name
        .replace('--color-', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    return {
      colorGroups,
      formatGroupName,
      formatColorName,
    }
  },
})
</script>

<style scoped>
.color-palette {
  padding: 2rem;
  font-family: Inter, sans-serif;
}

.color-group {
  margin-bottom: 2rem;
}

.color-group h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.color-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-background-secondary);
  border-radius: 8px;
}

.color-preview {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  margin-right: 1rem;
  border: 1px solid var(--color-stroke-primary);
}

.color-info {
  flex: 1;
}

.color-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: var(--color-text-primary);
}

.color-value {
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}
</style> 