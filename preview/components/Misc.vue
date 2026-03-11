<template>
  <div class="misc">
    <section class="misc__section">
      <NText class="misc__label">Icon</NText>
      <div class="misc__icons">
        <div v-for="icon in icons" :key="icon" class="misc__icon-item">
          <NIcon :name="icon" size="md" />
          <NText class="misc__icon-name">{{ icon }}</NText>
        </div>
      </div>
    </section>

    <section class="misc__section">
      <NText class="misc__label">Icon sizes</NText>
      <div class="misc__row">
        <NIcon name="setting" size="sm" />
        <NIcon name="setting" size="md" />
        <NIcon name="setting" size="lg" />
      </div>
    </section>

    <section class="misc__section">
      <NText class="misc__label">Chip</NText>
      <div class="misc__row">
        <NChip label="Харьягинское" />
        <NChip label="Добывающая" icon="bookmark" />
        <NChip label="Активная" removable @remove="() => {}" />
        <NChip label="Отключена" disabled />
      </div>
    </section>

    <section class="misc__section">
      <NText class="misc__label">Chip с аватаром</NText>
      <div class="misc__row">
        <NChip label="Иванов И.И." :image="avatarUrl" removable @remove="() => {}" />
        <NChip label="Петров А.С." :image="avatarUrl" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { IconName } from 'nestro-ui-kit';

const icons: IconName[] = [
  'check',
  'close',
  'arrow-down',
  'arrow-up',
  'arrow-left',
  'arrow-right',
  'edit',
  'delete',
  'plus',
  'download',
  'magnifier',
  'setting',
  'unite',
  'loading',
  'calendar',
  'minus',
  'bookmark',
  'chevrons-right',
];

const avatarUrl =
  'https://api.dicebear.com/7.x/initials/svg?seed=II&backgroundColor=009639&fontColor=ffffff';
</script>

<style scoped>
.misc {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-4);
}

.misc__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.misc__label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-grey-70);
}

.misc__icons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.misc__icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  width: 72px;
}

.misc__icon-name {
  font-size: var(--font-size-xs);
  color: var(--color-grey-60);
  text-align: center;
  word-break: break-all;
}

.misc__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
}
</style>
