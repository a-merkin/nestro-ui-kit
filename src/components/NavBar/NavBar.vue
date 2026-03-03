<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="navbar__item-wrapper"
      >
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
            <span class="navbar__icon-placeholder" />
          </slot>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { NavBarProps, NavBarEmits } from './NavBar.types';

defineOptions({ name: 'NNavBar' });

const props = withDefaults(defineProps<NavBarProps>(), {
  modelValue: '',
});

const emit = defineEmits<NavBarEmits>();

const handleClick = (id: string) => {
  emit('update:modelValue', id);
};
</script>

<style scoped>
.navbar {
  --_ear-size: 16px;
  --_btn-size: 50px;
  --_sidebar-w: 78px;
  --_sidebar-pad-x: 14px;
  --_btn-radius: 10px;
}

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--_sidebar-w);
  height: 100%;
  padding: var(--space-8) 0 var(--space-6);
  box-sizing: border-box;
  background: linear-gradient(180deg, #d2dfe6 0%, #dde8ed 50%, #d2dfe6 100%);
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
  z-index: 1;
  padding: 10px;
  box-sizing: border-box;
  background: var(--color-blue-60, #f4f7f8);
  border-radius: var(--_btn-radius);
  box-shadow: none;
  color: #a0a8ae;
  transition:
    background var(--duration-normal) var(--easing-standard),
    box-shadow var(--duration-normal) var(--easing-standard),
    color var(--duration-normal) var(--easing-standard),
    border-radius var(--duration-normal) var(--easing-standard);
}

.navbar__button :deep(svg) {
  width: 30px;
  height: 30px;
  color: inherit;
  opacity: 0.4;
  transition:
    color var(--duration-normal) var(--easing-standard),
    opacity var(--duration-normal) var(--easing-standard);
}

.navbar__icon-placeholder {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  background: var(--color-grey-40);
  opacity: 0.3;
}

.navbar__button:hover:not(.navbar__button--active) {
  background: #f8fbfc;
  color: var(--color-grey-70);
}

.navbar__button:hover:not(.navbar__button--active) :deep(svg) {
  opacity: 0.6;
}

.navbar__button--active {
  background: var(--color-white);
  border-radius: var(--_btn-radius) 0 0 var(--_btn-radius);
  box-shadow: none;
  color: var(--color-grey-70);
  margin-right: calc(-1 * var(--_sidebar-pad-x));
  padding-right: calc(10px + var(--_sidebar-pad-x));
  width: calc(var(--_btn-size) + var(--_sidebar-pad-x));
  z-index: 2;
}

.navbar__button--active :deep(svg) {
  opacity: 1;
}

.navbar__button--active:hover {
  background: var(--color-white);
  box-shadow: none;
}
</style>
