<template>
  <div ref="rootRef" class="speed-dial" :class="rootClasses">
    <!-- Main trigger button -->
    <slot name="button" :open="isOpen" :toggle="toggle">
      <button
        class="speed-dial__trigger"
        :class="triggerClasses"
        type="button"
        :disabled="disabled"
        @click="toggle"
      >
        <NIcon :name="currentIcon" size="md" />
      </button>
    </slot>

    <!-- Actions container -->
    <Transition name="speed-dial-actions">
      <div v-if="isOpen" class="speed-dial__actions" :class="actionsClasses">
        <template v-for="(action, index) in visibleActions" :key="action.key || index">
          <slot name="action" :action="action" :index="index" :on-click="() => handleAction(action)">
            <button
              class="speed-dial__action"
              :class="getActionClasses(action)"
              type="button"
              :disabled="action.disabled"
              :title="action.label"
              :style="getActionDelay(index)"
              @click="handleAction(action)"
            >
              <NIcon :name="action.icon" size="sm" />
            </button>
          </slot>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { SpeedDialProps, SpeedDialEmits, SpeedDialAction } from './SpeedDial.types';
import NIcon from '../Icon/Icon.vue';

defineOptions({ name: 'NSpeedDial' });

const props = withDefaults(defineProps<SpeedDialProps>(), {
  direction: 'up',
  type: 'floating',
  icon: 'plus',
  disabled: false,
});

const emit = defineEmits<SpeedDialEmits>();

const rootRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);

// --- Computed ---

const visibleActions = computed(() => {
  return props.model.filter((a) => a.visible !== false);
});

const currentIcon = computed(() => {
  return isOpen.value ? 'close' : props.icon;
});

const rootClasses = computed(() => ({
  'speed-dial--floating': props.type === 'floating',
  'speed-dial--static': props.type === 'static',
  'speed-dial--open': isOpen.value,
  'speed-dial--disabled': props.disabled,
  [`speed-dial--${props.direction}`]: true,
}));

const triggerClasses = computed(() => ({
  'speed-dial__trigger--open': isOpen.value,
}));

const actionsClasses = computed(() => ({
  [`speed-dial__actions--${props.direction}`]: true,
}));

// --- Methods ---

function toggle() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    emit('open');
  } else {
    emit('close');
  }
}

function handleAction(action: SpeedDialAction) {
  if (action.disabled) return;
  if (action.command) {
    action.command();
  }
  isOpen.value = false;
  emit('close');
}

function getActionClasses(action: SpeedDialAction) {
  return [action.class, { 'speed-dial__action--disabled': action.disabled }];
}

function getActionDelay(index: number) {
  return { '--action-delay': `${index * 40}ms` };
}

function handleClickOutside(event: MouseEvent) {
  if (!isOpen.value) return;
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    isOpen.value = false;
    emit('close');
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside, true);
});

defineExpose({ toggle });
</script>

<style scoped lang="scss">
.speed-dial {
  $self: &;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &--floating {
    position: fixed;
    bottom: var(--space-8);
    right: var(--space-8);
    z-index: var(--z-popover);
  }

  // Trigger button
  &__trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: var(--radius-round);
    border: none;
    background: var(--color-green-90);
    color: var(--color-white);
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(15, 157, 59, 0.3);
    transition:
      background-color 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;
    z-index: 2;
    position: relative;

    &:hover:not(:disabled) {
      background: var(--color-green-100);
      box-shadow: 0 6px 24px rgba(15, 157, 59, 0.4);
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    &:disabled {
      background: var(--color-grey-20);
      color: var(--color-grey-80);
      cursor: not-allowed;
      box-shadow: none;
    }

    &--open {
      background: var(--color-grey-70);
      box-shadow: 0 4px 16px rgba(70, 78, 86, 0.3);

      &:hover:not(:disabled) {
        background: var(--color-grey-100);
        box-shadow: 0 6px 24px rgba(70, 78, 86, 0.4);
      }
    }
  }

  // Actions container — direction
  &__actions {
    position: absolute;
    display: flex;
    gap: var(--space-3);
    z-index: 1;

    &--up {
      flex-direction: column-reverse;
      bottom: calc(100% + var(--space-3));
      left: 50%;
      transform: translateX(-50%);
    }

    &--down {
      flex-direction: column;
      top: calc(100% + var(--space-3));
      left: 50%;
      transform: translateX(-50%);
    }

    &--left {
      flex-direction: row-reverse;
      right: calc(100% + var(--space-3));
      top: 50%;
      transform: translateY(-50%);
    }

    &--right {
      flex-direction: row;
      left: calc(100% + var(--space-3));
      top: 50%;
      transform: translateY(-50%);
    }
  }

  // Individual action button
  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-round);
    border: none;
    background: var(--color-white);
    color: var(--color-grey-70);
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(31, 41, 55, 0.12);
    transition:
      background-color 0.15s ease,
      color 0.15s ease,
      transform 0.15s ease,
      box-shadow 0.15s ease;
    animation: speed-dial-action-in 0.2s ease both;
    animation-delay: var(--action-delay, 0ms);

    &:hover:not(:disabled) {
      background: var(--color-green-90);
      color: var(--color-white);
      box-shadow: 0 4px 16px rgba(15, 157, 59, 0.3);
      transform: scale(1.08);
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}

// Transition for actions container
.speed-dial-actions-enter-active {
  transition: opacity 0.15s ease;
}

.speed-dial-actions-leave-active {
  transition: opacity 0.1s ease;
}

.speed-dial-actions-enter-from,
.speed-dial-actions-leave-to {
  opacity: 0;
}

@keyframes speed-dial-action-in {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
