import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import NavBar from './NavBar.vue';

const meta: Meta<typeof NavBar> = {
  title: 'Components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  render: () => ({
    components: { NavBar },
    setup() {
      const active = ref('datavault');
      const items = [
        { id: 'upload', label: 'Загрузка' },
        { id: 'datavault', label: 'Данные МЭР' },
        { id: 'patterns', label: 'Паттерны' },
        { id: 'gdis', label: 'ГДИС' },
        { id: 'sppr', label: 'СППР ГТМ' },
        { id: 'settings', label: 'Настройки' },
      ];
      return { active, items };
    },
    template: `
      <div style="display: flex; height: 100vh;">
        <NavBar v-model="active" :items="items">
          <template #icon-upload>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </template>
          <template #icon-datavault>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
              <path d="M6 8h4v5H6z"/>
              <path d="M12 6h2v7h-2z"/>
              <path d="M16 9h2v4h-2z"/>
            </svg>
          </template>
          <template #icon-patterns>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 3v18h18"/>
              <path d="M7 16l4-6 4 4 5-8"/>
            </svg>
          </template>
          <template #icon-gdis>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </template>
          <template #icon-sppr>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 3v18h18"/>
              <rect x="7" y="10" width="3" height="8"/>
              <rect x="12" y="6" width="3" height="12"/>
              <rect x="17" y="3" width="3" height="15"/>
            </svg>
          </template>
          <template #icon-settings>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
            </svg>
          </template>
        </NavBar>
        <div style="flex: 1; background: #fff; padding: 32px; border-radius: 16px 0 0 16px;">
          <h2 style="margin: 0; font-family: Montserrat, sans-serif;">
            Активный модуль: {{ active }}
          </h2>
        </div>
      </div>
    `,
  }),
};
