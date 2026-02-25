<template>
  <ul class="menu-list">
    <template v-for="(item, index) in visibleItems" :key="item.key || index">
      <li v-if="item.separator" class="menu-list__separator" />

      <li
        v-else-if="item.items && item.items.length"
        class="menu-list__group"
      >
        <span v-if="item.label" class="menu-list__group-label">
          {{ item.label }}
        </span>
        <MenuList :items="item.items" @select="(e) => $emit('select', e)" />
      </li>

      <li v-else class="menu-list__item" :class="getItemClasses(item)">
        <a
          v-if="item.url"
          :href="item.url"
          :target="item.target"
          class="menu-list__link"
          :class="{ 'menu-list__link--disabled': item.disabled }"
          @click="(e) => handleClick(e, item)"
        >
          <NIcon v-if="item.icon" :name="item.icon" size="sm" class="menu-list__icon" />
          <span class="menu-list__label">{{ item.label }}</span>
        </a>
        <button
          v-else
          class="menu-list__link"
          :class="{ 'menu-list__link--disabled': item.disabled }"
          type="button"
          :disabled="item.disabled"
          @click="(e) => handleClick(e, item)"
        >
          <NIcon v-if="item.icon" :name="item.icon" size="sm" class="menu-list__icon" />
          <span class="menu-list__label">{{ item.label }}</span>
        </button>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MenuItem, MenuCommandEvent } from './Menu.types';
import NIcon from '../Icon/Icon.vue';

const props = defineProps<{
  items: MenuItem[];
}>();

const emit = defineEmits<{
  (e: 'select', event: MenuCommandEvent): void;
}>();

const visibleItems = computed(() => {
  return props.items.filter((item) => item.visible !== false);
});

function getItemClasses(item: MenuItem) {
  return [item.class, { 'menu-list__item--disabled': item.disabled }];
}

function handleClick(event: Event, item: MenuItem) {
  if (item.disabled) {
    event.preventDefault();
    return;
  }

  const commandEvent: MenuCommandEvent = {
    originalEvent: event,
    item,
  };

  if (item.command) {
    item.command(commandEvent);
  }

  emit('select', commandEvent);
}
</script>

<style scoped lang="scss">
.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;

  &__separator {
    height: 1px;
    margin: var(--space-2) 0;
    background: var(--color-blue-70);
  }

  // Group (submenu with label)
  &__group {
    display: flex;
    flex-direction: column;
  }

  &__group-label {
    display: block;
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-grey-80);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    user-select: none;
  }

  // Item
  &__item {
    display: flex;

    &--disabled {
      opacity: 0.5;
    }
  }

  // Link / Button
  &__link {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-3) var(--space-4);
    border: none;
    background: none;
    cursor: pointer;
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
    color: var(--color-grey-100);
    text-decoration: none;
    text-align: left;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;

    &:hover:not(&--disabled) {
      background: var(--color-blue-60);
      color: var(--color-green-90);
    }

    &:active:not(&--disabled) {
      background: var(--color-blue-70);
    }

    &--disabled {
      cursor: not-allowed;
      color: var(--color-grey-40);
    }
  }

  &__icon {
    flex-shrink: 0;
    color: var(--color-grey-80);

    .menu-list__link:hover:not(.menu-list__link--disabled) & {
      color: var(--color-green-90);
    }
  }

  &__label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
