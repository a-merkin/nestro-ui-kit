<template>
  <div class="workplace-container">
    <div class="header-switcher-bg">
      <div class="header-switcher">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="[
            'header-switcher__tab',
            { 'header-switcher__tab--active': tab.value === modelValue },
          ]"
          :title="tab.label"
          @click="$emit('update:modelValue', tab.value)"
        >
          <p class="header-switcher__tab-label">{{ tab.label }}</p>
        </button>
      </div>
    </div>
    <div class="workplace-content" :class="{ 'workplace-content--no-top-left': isFirstTabActive }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { WorkPlaceProps } from './WorkPlace.types';

defineOptions({ name: 'NWorkplace' });

const props = defineProps<WorkPlaceProps>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isFirstTabActive = computed(() => {
  return props.tabs.length > 0 && props.modelValue === props.tabs[0].value;
});
</script>

<style scoped>
.workplace-container {
  width: 100%;
  max-width: var(--max-width-fullhd);
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.header-switcher-bg {
  background: none;
}

.header-switcher {
  display: flex;
  background: none;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  align-items: flex-end;
  position: relative;
  z-index: var(--z-raised);
  gap: var(--space-2);
}

.header-switcher__tab {
  background: var(--color-white);
  color: var(--color-grey-70);
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--space-4) var(--space-8);
  margin: 0 0 var(--space-2) 0;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* box-shadow: var(--shadow-sm); */
  min-width: var(--size-tab-width);
  max-width: var(--size-tab-width);
  font-weight: var(--font-weight-medium);

  transition:
    background var(--motion-hover-duration) var(--easing-standard),
    color var(--motion-hover-duration) var(--easing-standard),
    box-shadow var(--motion-hover-duration) var(--easing-standard),
    transform var(--motion-hover-duration) var(--easing-standard);
}

.header-switcher__tab:hover {
  box-shadow: var(--shadow-md);
}

.header-switcher__tab-label {
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-bold);
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}

.header-switcher__tab:last-child {
  margin-right: 0;
}

.header-switcher__tab--active {
  color: var(--color-grey-100);
  background: var(--color-blue-60);
  font-weight: var(--font-weight-bold);

  border-top: var(--border-width-sm) solid var(--color-stroke-primary);
  border-left: var(--border-width-sm) solid var(--color-stroke-primary);
  border-right: var(--border-width-sm) solid var(--color-stroke-primary);
  border-bottom: none;

  border-radius: var(--radius-md) var(--radius-md) 0 0;
  /* box-shadow: var(--shadow-md); */

  z-index: calc(var(--z-raised) + 1);

  transition:
    background var(--motion-enter-duration) var(--easing-decelerate),
    box-shadow var(--motion-enter-duration) var(--easing-decelerate);
}

.header-switcher__tab--active::after {
  content: '';
  position: absolute;

  left: calc(-1 * var(--border-width-sm));
  right: calc(-1 * var(--border-width-sm));

  bottom: calc(-1 * (var(--space-2) + var(--border-width-sm)));
  height: calc(var(--space-2) + var(--border-width-sm));

  background: var(--color-blue-60);

  border-left: var(--border-width-sm) solid var(--color-stroke-primary);
  border-right: var(--border-width-sm) solid var(--color-stroke-primary);

  z-index: calc(var(--z-raised) + 2);
}

.workplace-content {
  flex: 1 1 auto;
  overflow: auto;
  min-height: 0;
  height: 100%;

  background: var(--color-blue-60);
  border: var(--border-width-sm) solid var(--color-stroke-primary);
  border-radius: var(--radius-lg);
  /* box-shadow: var(--shadow-lg); */

  position: relative;
  z-index: var(--z-base);

  padding: var(--space-3);

  transition: box-shadow var(--duration-medium) var(--easing-standard);
}

.workplace-content--no-top-left {
  border-top-left-radius: 0;
}
</style>
