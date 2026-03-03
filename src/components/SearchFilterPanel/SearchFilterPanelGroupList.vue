<template>
  <div class="sfp-group-list" :class="{ 'sfp-group-list--disabled': disabled }">
    <div class="sfp-group-list__header">
      <span class="sfp-group-list__title">Группы фильтров</span>
      <button
        type="button"
        class="sfp-group-list__add"
        title="Создать группу"
        :disabled="disabled"
        @click="$emit('create')"
      >
        <NIcon name="plus" size="md" />
      </button>
    </div>

    <div class="sfp-group-list__items">
      <div
        v-for="group in groups"
        :key="group.id"
        class="sfp-group-list__item"
        :class="{
          'sfp-group-list__item--active': group.id === activeGroupId,
          'sfp-group-list__item--default': group.isDefault,
          'sfp-group-list__item--system': group.isSystem,
        }"
        @click="$emit('select', group)"
      >
        <span class="sfp-group-list__item-name">{{ group.name }}</span>

        <div class="sfp-group-list__item-actions" @click.stop>
          <button
            v-if="!group.isSystem"
            type="button"
            class="sfp-group-list__action"
            title="Редактировать"
            @click="$emit('edit', group)"
          >
            <NIcon name="edit" size="sm" />
          </button>

          <button
            v-if="!group.isSystem"
            type="button"
            class="sfp-group-list__action sfp-group-list__action--danger"
            title="Удалить"
            @click="$emit('delete', group)"
          >
            <NIcon name="delete" size="sm" />
          </button>

          <button
            type="button"
            class="sfp-group-list__action"
            :class="{ 'sfp-group-list__action--active': group.isDefault }"
            title="Сделать по умолчанию"
            @click="$emit('setDefault', group)"
          >
            <NIcon name="bookmark" size="sm" />
          </button>
        </div>

        <NIcon
          v-if="group.isDefault"
          name="bookmark"
          size="sm"
          color="green-90"
          class="sfp-group-list__item-default-icon"
        />
      </div>

      <div v-if="!groups.length" class="sfp-group-list__empty">Нет доступных групп</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NIcon from '../Icon/Icon.vue';
import type { FilterGroup } from './SearchFilterPanel.types';

defineOptions({ name: 'NSearchFilterPanelGroupList' });

defineProps<{
  groups: FilterGroup[];
  activeGroupId?: string | null;
  disabled?: boolean;
}>();

defineEmits<{
  (e: 'select', group: FilterGroup): void;
  (e: 'edit', group: FilterGroup): void;
  (e: 'delete', group: FilterGroup): void;
  (e: 'setDefault', group: FilterGroup): void;
  (e: 'create'): void;
}>();
</script>

<style scoped>
.sfp-group-list {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-stroke-primary);
  display: flex;
  flex-direction: column;
}

.sfp-group-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
  height: var(--size-height-lg);
  border-bottom: 1px solid var(--color-stroke-primary);
  flex-shrink: 0;
}

.sfp-group-list__title {
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-grey-70);
}

.sfp-group-list__add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--radius-round);
  background: transparent;
  color: var(--color-grey-70);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.sfp-group-list__add:hover {
  background: var(--color-blue-70);
  color: var(--color-green-90);
}

.sfp-group-list__items {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.sfp-group-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  cursor: pointer;
  border-radius: 0;
  transition: background-color 0.15s ease;
  min-height: var(--size-height-sm);
}

.sfp-group-list__item:hover {
  background: var(--color-blue-70);
}

.sfp-group-list__item--active {
  background: var(--color-blue-60);
}

.sfp-group-list__item--active:hover {
  background: var(--color-blue-70);
}

.sfp-group-list__item-name {
  flex: 1;
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-grey-70);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sfp-group-list__item--active .sfp-group-list__item-name {
  font-weight: var(--font-weight-medium);
}

.sfp-group-list__item--system .sfp-group-list__item-name {
  color: var(--color-grey-80);
}

.sfp-group-list__item-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.sfp-group-list__item:hover .sfp-group-list__item-actions,
.sfp-group-list__item--active .sfp-group-list__item-actions {
  opacity: 1;
}

.sfp-group-list__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-grey-80);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
  padding: 0;
}

.sfp-group-list__action:hover {
  background: var(--color-blue-40);
  color: var(--color-grey-70);
}

.sfp-group-list__action--active {
  color: var(--color-green-90);
}

.sfp-group-list__action--danger:hover {
  background: rgba(237, 110, 28, 0.1);
  color: var(--color-orange);
}

.sfp-group-list__item-default-icon {
  flex-shrink: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
}

.sfp-group-list__item:hover .sfp-group-list__item-default-icon,
.sfp-group-list__item--active .sfp-group-list__item-default-icon {
  opacity: 0;
}

.sfp-group-list--disabled .sfp-group-list__items {
  pointer-events: none;
  opacity: 0.4;
}

.sfp-group-list--disabled .sfp-group-list__add {
  pointer-events: none;
  opacity: 0.4;
}

.sfp-group-list__empty {
  padding: var(--space-4);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  color: var(--color-grey-80);
  text-align: center;
}
</style>
