<template>
  <div class="search-filter-panel">
    <div class="search-filter-panel__bar" @click="openModal">
      <NIcon name="magnifier" size="md" class="search-filter-panel__icon" />

      <NChip
        v-if="activeGroup"
        :label="activeGroup.name"
        removable
        class="search-filter-panel__chip"
        @remove.stop="removeActiveGroup"
      />

      <input
        ref="barInputRef"
        :value="props.searchQuery"
        class="search-filter-panel__input"
        :placeholder="activeGroup ? '' : placeholder"
        @click.stop="openModal"
        @input="onBarInput"
        @keydown.enter="handleSearch"
      />

      <button
        v-if="props.searchQuery"
        type="button"
        class="search-filter-panel__clear"
        @click.stop="clearQuery"
      >
        <NIcon name="close" size="md" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="sfp-fade">
      <div v-if="isOpen" class="search-filter-overlay" @click.self="closeModal">
        <div class="search-filter-dialog" role="dialog" aria-modal="true">
          <div class="search-filter-dialog__search">
            <NIcon name="magnifier" size="md" class="search-filter-dialog__search-icon" />

            <NChip
              v-if="activeGroup"
              :label="activeGroup.name"
              removable
              @remove="removeActiveGroup"
            />

            <input
              ref="modalInputRef"
              :value="props.searchQuery"
              class="search-filter-dialog__input"
              :placeholder="activeGroup ? '' : placeholder"
              @input="onModalInput"
              @keydown.enter="handleSearch"
            />

            <button
              v-if="props.searchQuery"
              type="button"
              class="search-filter-dialog__clear"
              @click="clearQuery"
            >
              <NIcon name="close" size="sm" />
            </button>
          </div>

          <!-- Two-column body -->
          <div class="search-filter-dialog__body">
            <!-- Left: groups -->
            <SearchFilterPanelGroupList
              :groups="props.groups"
              :active-group-id="localActiveGroupId"
              @select="handleGroupSelect"
              @edit="handleGroupEdit"
              @delete="handleGroupDeleteRequest"
              @set-default="handleGroupSetDefault"
              @create="$emit('groupCreate')"
            />

            <!-- Right: filters -->
            <SearchFilterPanelGroupDetail
              v-if="selectedGroup"
              :group="selectedGroup"
              :edit-mode="!!editingGroupId"
              :available-filters="props.availableFilters"
              @save="handleGroupSave"
              @cancel-edit="cancelEdit"
            />
            <div v-else class="search-filter-dialog__placeholder">
              <NIcon name="setting" size="lg" />
              <p>Выберите группу фильтров</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- ─── Delete confirm ─── -->
  <NConfirmDialog
    :open="deleteConfirmOpen"
    title="Удалить группу?"
    description="Группа и её настройки будут удалены без возможности восстановления."
    variant="danger"
    confirm-text="Удалить"
    cancel-text="Отмена"
    @update:open="deleteConfirmOpen = $event"
    @confirm="confirmDelete"
    @cancel="deleteConfirmOpen = false"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import NIcon from '../Icon/Icon.vue';
import NChip from '../Chip/Chip.vue';
import NConfirmDialog from '../ConfirmDialog/ConfirmDialog.vue';
import SearchFilterPanelGroupList from './SearchFilterPanelGroupList.vue';
import SearchFilterPanelGroupDetail from './SearchFilterPanelGroupDetail.vue';
import type {
  SearchFilterPanelProps,
  SearchFilterPanelEmits,
  FilterGroup,
  FilterGroupSavePayload,
} from './SearchFilterPanel.types';

defineOptions({ name: 'NSearchFilterPanel' });

const props = withDefaults(defineProps<SearchFilterPanelProps>(), {
  activeGroupId: null,
  availableFilters: () => [],
  placeholder: 'Поиск...',
  loading: false,
});

const emit = defineEmits<SearchFilterPanelEmits>();

// ─── State ───────────────────────────────────────────────────────────────────

const isOpen = ref(false);
const barInputRef = ref<HTMLInputElement | null>(null);
const modalInputRef = ref<HTMLInputElement | null>(null);

const localActiveGroupId = ref<string | null>(props.activeGroupId ?? null);
const editingGroupId = ref<string | null>(null);

const deleteConfirmOpen = ref(false);
const pendingDeleteId = ref<string | null>(null);

// ─── Computed ─────────────────────────────────────────────────────────────────

const activeGroup = computed<FilterGroup | null>(
  () => props.groups.find((g) => g.id === localActiveGroupId.value) ?? null,
);

const selectedGroup = computed<FilterGroup | null>(() => {
  if (editingGroupId.value) {
    return props.groups.find((g) => g.id === editingGroupId.value) ?? null;
  }
  return activeGroup.value;
});

// ─── Modal ────────────────────────────────────────────────────────────────────

const openModal = async () => {
  isOpen.value = true;
  await nextTick();
  modalInputRef.value?.focus();
};

const closeModal = () => {
  isOpen.value = false;
  editingGroupId.value = null;
};

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) closeModal();
};

onMounted(() => document.addEventListener('keydown', handleEsc));
onBeforeUnmount(() => document.removeEventListener('keydown', handleEsc));

// ─── Search ───────────────────────────────────────────────────────────────────

const onBarInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  emit('update:searchQuery', val);
  if (!isOpen.value) openModal();
};

const onModalInput = (e: Event) => {
  emit('update:searchQuery', (e.target as HTMLInputElement).value);
};

const clearQuery = () => {
  emit('update:searchQuery', '');
};

const handleSearch = () => {
  emit('search', props.searchQuery);
};

// ─── Group actions ────────────────────────────────────────────────────────────

const handleGroupSelect = (group: FilterGroup) => {
  localActiveGroupId.value = group.id;
  editingGroupId.value = null;
  emit('update:activeGroupId', group.id);
  emit('groupSelect', group);
};

const removeActiveGroup = () => {
  localActiveGroupId.value = null;
  editingGroupId.value = null;
  emit('update:activeGroupId', null);
};

const handleGroupEdit = (group: FilterGroup) => {
  localActiveGroupId.value = group.id;
  editingGroupId.value = group.id;
  if (!isOpen.value) openModal();
};

const handleGroupDeleteRequest = (group: FilterGroup) => {
  pendingDeleteId.value = group.id;
  deleteConfirmOpen.value = true;
};

const confirmDelete = () => {
  if (!pendingDeleteId.value) return;
  if (localActiveGroupId.value === pendingDeleteId.value) {
    localActiveGroupId.value = null;
    editingGroupId.value = null;
    emit('update:activeGroupId', null);
  }
  emit('groupDelete', pendingDeleteId.value);
  pendingDeleteId.value = null;
  deleteConfirmOpen.value = false;
};

const handleGroupSetDefault = (group: FilterGroup) => {
  emit('groupSetDefault', group);
};

const handleGroupSave = (payload: FilterGroupSavePayload) => {
  emit('groupSave', payload);
  editingGroupId.value = null;
};

const cancelEdit = () => {
  editingGroupId.value = null;
};

// ─── Sync activeGroupId prop → local ─────────────────────────────────────────

watch(
  () => props.activeGroupId,
  (id) => {
    localActiveGroupId.value = id ?? null;
  },
);
</script>

<style scoped>
/* ─── Search bar ─────────────────────────────────────────────────────────── */

.search-filter-panel {
  display: inline-flex;
  width: 100%;
}

.search-filter-panel__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  height: var(--size-height-md);
  padding: 0 var(--size-padding-horizontal-md);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-stroke-primary);
  background: var(--color-bg-input);
  cursor: text;
  transition: border-color 0.2s ease;
}

.search-filter-panel__bar:hover {
  border-color: var(--color-blue-50);
}

.search-filter-panel__icon {
  flex-shrink: 0;
  color: var(--color-text-placeholder);
}

.search-filter-panel__chip {
  flex-shrink: 0;
}

.search-filter-panel__input {
  flex: 1;
  min-width: 60px;
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-grey-70);
  cursor: text;
}

.search-filter-panel__input::placeholder {
  color: var(--color-text-placeholder);
}

.search-filter-panel__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: none;
  border-radius: var(--radius-round);
  background: transparent;
  color: var(--color-grey-80);
  cursor: pointer;
  padding: 0;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.search-filter-panel__clear:hover {
  background: var(--color-blue-40);
  color: var(--color-grey-70);
}

/* ─── Overlay ────────────────────────────────────────────────────────────── */

.search-filter-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg-backdrop);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  padding: var(--space-4);
}

.search-filter-dialog {
  width: 100%;
  max-width: 860px;
  max-height: 80vh;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ─── Dialog search bar ──────────────────────────────────────────────────── */

.search-filter-dialog__search {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-6);
  height: var(--size-height-lg);
  border-bottom: 1px solid var(--color-stroke-primary);
  flex-shrink: 0;
}

.search-filter-dialog__search-icon {
  flex-shrink: 0;
  color: var(--color-text-placeholder);
}

.search-filter-dialog__input {
  flex: 1;
  min-width: 60px;
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--color-grey-70);
}

.search-filter-dialog__input::placeholder {
  color: var(--color-text-placeholder);
}

.search-filter-dialog__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: none;
  border-radius: var(--radius-round);
  background: transparent;
  color: var(--color-grey-80);
  cursor: pointer;
  padding: 0;
  transition: background-color 0.15s ease;
}

.search-filter-dialog__clear:hover {
  background: var(--color-blue-40);
}

/* ─── Two-column body ────────────────────────────────────────────────────── */

.search-filter-dialog__body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.search-filter-dialog__placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  color: var(--color-grey-80);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
}

.search-filter-dialog__placeholder p {
  margin: 0;
}

/* ─── Transition ─────────────────────────────────────────────────────────── */

.sfp-fade-enter-active {
  animation: sfp-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.sfp-fade-leave-active {
  animation: sfp-out 0.2s ease forwards;
}

@keyframes sfp-in {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes sfp-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.97);
  }
}
</style>
