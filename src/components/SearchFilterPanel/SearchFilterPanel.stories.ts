import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import NSearchFilterPanel from './SearchFilterPanel.vue';
import type {
  FilterGroup,
  FilterGroupItem,
  FilterGroupSavePayload,
} from './SearchFilterPanel.types';

const meta = {
  title: 'UI/SearchFilterPanel',
  component: NSearchFilterPanel,
  tags: ['autodocs'],
  argTypes: {
    searchQuery: { control: 'text', description: 'Текст поискового запроса' },
    groups: { control: 'object', description: 'Список групп фильтров' },
    activeGroupId: { control: 'text', description: 'ID активной группы' },
    availableFilters: {
      control: 'object',
      description: 'Доступные фильтры для добавления в режиме редактирования',
    },
    placeholder: { control: 'text', description: 'Placeholder строки поиска' },
    loading: { control: 'boolean', description: 'Состояние загрузки' },
  },
} satisfies Meta<typeof NSearchFilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const systemGroup: FilterGroup = {
  id: 'system-1',
  name: 'Все скважины',
  moduleId: 'wells',
  isSystem: true,
  isDefault: true,
  items: [
    {
      id: 'f1',
      key: 'status',
      label: 'Статус',
      type: 'dropdown',
      order: 0,
      config: {
        options: [
          { label: 'Активная', value: 'active' },
          { label: 'В ремонте', value: 'repair' },
          { label: 'Заглушена', value: 'closed' },
        ],
      },
    },
    {
      id: 'f2',
      key: 'field',
      label: 'Месторождение',
      type: 'dropdown',
      order: 1,
      config: {
        options: [
          { label: 'Самотлорское', value: 'sam' },
          { label: 'Ромашкинское', value: 'rom' },
          { label: 'Приобское', value: 'pri' },
        ],
      },
    },
  ],
  values: { status: 'active', field: 'sam' },
};

const userGroup1: FilterGroup = {
  id: 'user-1',
  name: 'Аварийные скважины',
  moduleId: 'wells',
  isSystem: false,
  isDefault: false,
  items: [
    {
      id: 'f3',
      key: 'status',
      label: 'Статус',
      type: 'multiselect',
      order: 0,
      config: {
        options: [
          { label: 'Аварийная', value: 'emergency' },
          { label: 'В ремонте', value: 'repair' },
        ],
      },
    },
    {
      id: 'f4',
      key: 'depth',
      label: 'Глубина',
      type: 'number',
      order: 1,
      config: { min: 0, max: 5000, step: 100 },
    },
    {
      id: 'f5',
      key: 'commissioned',
      label: 'Дата ввода',
      type: 'date',
      order: 2,
    },
    {
      id: 'f6',
      key: 'active',
      label: 'Действующая',
      type: 'boolean',
      order: 3,
    },
  ],
  values: {
    status: ['emergency', 'repair'],
    depth: 1500,
    commissioned: '2023-01-15',
    active: true,
  },
};

const userGroup2: FilterGroup = {
  id: 'user-2',
  name: 'Нагнетательные',
  moduleId: 'wells',
  isSystem: false,
  isDefault: false,
  items: [
    {
      id: 'f7',
      key: 'type',
      label: 'Тип',
      type: 'dropdown',
      order: 0,
      config: {
        options: [
          { label: 'Нагнетательная', value: 'injection' },
          { label: 'Добывающая', value: 'production' },
        ],
      },
    },
    {
      id: 'f8',
      key: 'comment',
      label: 'Примечание',
      type: 'text',
      order: 1,
    },
  ],
  values: { type: 'injection', comment: 'Требует обследования' },
};

const availableFilters: FilterGroupItem[] = [
  {
    id: 'av1',
    key: 'organization',
    label: 'Организация',
    type: 'dropdown',
    order: 0,
    config: {
      options: [
        { label: 'ООО Нефтедобыча', value: 'nd' },
        { label: 'ПАО Нефтегаз', value: 'ng' },
      ],
    },
  },
  {
    id: 'av2',
    key: 'region',
    label: 'Регион',
    type: 'multiselect',
    order: 1,
    config: {
      options: [
        { label: 'ХМАО', value: 'hmao' },
        { label: 'ЯНАО', value: 'yanao' },
        { label: 'Томская обл.', value: 'tomsk' },
      ],
    },
  },
  {
    id: 'av3',
    key: 'production_rate',
    label: 'Дебит',
    type: 'number',
    order: 2,
    config: { min: 0, max: 1000, step: 10 },
  },
];

const renderTemplate = (args: any) => ({
  components: { NSearchFilterPanel },
  setup() {
    const searchQuery = ref<string>(args.searchQuery ?? '');
    const activeGroupId = ref<string | null>(args.activeGroupId ?? null);
    const groups = ref<FilterGroup[]>(args.groups ?? []);

    const onSearch = (q: string) => console.log('search:', q);
    const onGroupSelect = (g: FilterGroup) => console.log('groupSelect:', g.name);
    const onGroupSetDefault = (g: FilterGroup) => {
      groups.value = groups.value.map((gr) => ({
        ...gr,
        isDefault: !g.isSystem ? gr.id === g.id : gr.isDefault,
      }));
      console.log('groupSetDefault:', g.name);
    };
    const onGroupSave = (payload: FilterGroupSavePayload) => {
      groups.value = groups.value.map((gr) =>
        gr.id === payload.id
          ? { ...gr, name: payload.name, items: payload.items, values: payload.values }
          : gr
      );
      console.log('groupSave:', payload);
    };
    const onGroupDelete = (id: string) => {
      groups.value = groups.value.filter((gr) => gr.id !== id);
      if (activeGroupId.value === id) activeGroupId.value = null;
      console.log('groupDelete:', id);
    };
    const onGroupCreate = () => console.log('groupCreate');

    return {
      args,
      searchQuery,
      activeGroupId,
      groups,
      onSearch,
      onGroupSelect,
      onGroupSetDefault,
      onGroupSave,
      onGroupDelete,
      onGroupCreate,
    };
  },
  template: `
    <div style="padding: 24px; background: #f4f7f8; min-height: 120px;">
      <NSearchFilterPanel
        v-model:search-query="searchQuery"
        v-model:active-group-id="activeGroupId"
        :groups="groups"
        :available-filters="args.availableFilters"
        :placeholder="args.placeholder"
        :loading="args.loading"
        @search="onSearch"
        @group-select="onGroupSelect"
        @group-set-default="onGroupSetDefault"
        @group-save="onGroupSave"
        @group-delete="onGroupDelete"
        @group-create="onGroupCreate"
      />
    </div>
  `,
});

export const Default: Story = {
  args: {
    searchQuery: '',
    activeGroupId: null,
    groups: [systemGroup, userGroup1, userGroup2],
    availableFilters,
    placeholder: 'Поиск по скважинам...',
    loading: false,
  },
  render: renderTemplate,
};

export const WithActiveGroup: Story = {
  name: 'С активной группой',
  args: {
    searchQuery: '',
    activeGroupId: 'user-1',
    groups: [systemGroup, userGroup1, userGroup2],
    availableFilters,
    placeholder: 'Поиск...',
  },
  render: renderTemplate,
};

export const OnlySystemGroups: Story = {
  name: 'Только системные группы',
  args: {
    searchQuery: '',
    activeGroupId: 'system-1',
    groups: [systemGroup],
    availableFilters,
    placeholder: 'Поиск...',
  },
  render: renderTemplate,
};

export const WithSearchQuery: Story = {
  name: 'С поисковым запросом',
  args: {
    searchQuery: 'Самотлор',
    activeGroupId: null,
    groups: [systemGroup, userGroup1, userGroup2],
    availableFilters,
    placeholder: 'Поиск...',
  },
  render: renderTemplate,
};
