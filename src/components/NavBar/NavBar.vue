<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li v-for="item in items" :key="item.id" class="navbar__item-wrapper">
        <button
          :class="[
            'navbar__button',
            {
              'navbar__button--active': modelValue === item.id,
            },
          ]"
          :title="item.label"
          :aria-current="modelValue === item.id ? 'page' : undefined"
          type="button"
          @click="handleClick(item.id)"
        >
          <slot :name="`icon-${item.id}`" :item="item" :active="modelValue === item.id">
            <NIcon v-if="item.icon" :name="item.icon" size="lg" />
          </slot>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { NavBarProps, NavBarEmits } from './NavBar.types';
import NIcon from '../Icon/Icon.vue';

defineOptions({ name: 'NNavBar' });

withDefaults(defineProps<NavBarProps>(), {
  modelValue: '',
});

const emit = defineEmits<NavBarEmits>();

const handleClick = (id: string) => {
  emit('update:modelValue', id);
};
</script>

<style scoped>
.navbar {
  --_btn-size: 50px;
  --_sidebar-w: 78px;
  --_sidebar-pad-x: var(--space-4);
  --_btn-radius: var(--radius-md);

  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--_sidebar-w);
  height: 100%;
  padding: var(--space-8) 0 var(--space-6);
  box-sizing: border-box;
  background: transparent;
  position: relative;
  z-index: var(--z-raised);
  flex-shrink: 0;
}

.navbar__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
}

.navbar__item-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 var(--_sidebar-pad-x);
  box-sizing: border-box;
}

.navbar__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--_btn-size);
  height: var(--_btn-size);
  border: none;
  cursor: pointer;
  position: relative;
  z-index: var(--z-base);
  padding: var(--space-3);
  box-sizing: border-box;
  background: var(--color-blue-60);
  border-radius: var(--_btn-radius);
  color: var(--color-blue-50);
  transition:
    background var(--duration-normal) var(--easing-standard),
    color var(--duration-normal) var(--easing-standard),
    border-radius var(--duration-normal) var(--easing-standard);
}

.navbar__button :deep(svg) {
  width: var(--size-icon-lg);
  height: var(--size-icon-lg);
  color: inherit;
  opacity: 0.4;
  transition:
    color var(--duration-normal) var(--easing-standard),
    opacity var(--duration-normal) var(--easing-standard);
}

.navbar__button:hover:not(.navbar__button--active) {
  background: var(--color-grey-50);
  color: var(--color-grey-70);
}

.navbar__button:hover:not(.navbar__button--active) :deep(svg) {
  opacity: 0.6;
}

.navbar__button--active {
  background: var(--color-white);
  border-radius: var(--_btn-radius) 0 0 var(--_btn-radius);
  color: var(--color-grey-70);
  margin-right: calc(-1 * var(--_sidebar-pad-x));
  padding-right: calc(var(--space-3) + var(--_sidebar-pad-x));
  width: calc(var(--_btn-size) + var(--_sidebar-pad-x));
  z-index: var(--z-raised);
}

.navbar__button--active :deep(svg) {
  opacity: 1;
}
</style>
