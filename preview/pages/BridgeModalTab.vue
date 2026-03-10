<template>
  <NBridgeModal channel-name="nestro-bridge-demo" :debug="true">
    <template #header>
      <span class="tab-header__title">Bridge Modal — новая вкладка</span>
      <span class="tab-header__badge">nestro-bridge-demo</span>
    </template>

    <template #default="{ initData, postEvent, close }">
      <div class="tab-content">
        <section class="tab-content__section">
          <h3 class="tab-content__label">Init данные от opener</h3>
          <pre class="tab-content__pre">{{
            initData !== null ? JSON.stringify(initData, null, 2) : 'Ожидание init...'
          }}</pre>
        </section>

        <section class="tab-content__section">
          <h3 class="tab-content__label">Отправить событие</h3>
          <div class="tab-content__actions">
            <button
              class="tab-btn tab-btn--secondary"
              @click="postEvent('save', { value: 42, ts: Date.now() })"
            >
              save
            </button>
            <button
              class="tab-btn tab-btn--secondary"
              @click="postEvent('custom', { msg: 'Привет из вкладки' })"
            >
              custom
            </button>
            <button class="tab-btn tab-btn--danger" @click="close()">Закрыть вкладку</button>
          </div>
        </section>
      </div>
    </template>
  </NBridgeModal>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.tab-header__title {
  font-weight: 600;
  font-size: 1rem;
}

.tab-header__badge {
  font-size: 0.7rem;
  color: var(--color-blue-50);
  background: var(--color-blue-60);
  padding: 2px var(--space-2);
  border-radius: var(--radius-toggle-sm);
  font-family: 'Menlo', 'Consolas', monospace;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.tab-content__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.tab-content__label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-grey-70);
}

.tab-content__pre {
  margin: 0;
  padding: var(--space-3) var(--space-4);
  background: var(--color-blue-60);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-family: 'Menlo', 'Consolas', monospace;
  color: var(--color-grey-70);
  white-space: pre-wrap;
  word-break: break-all;
}

.tab-content__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
  border: var(--border-width-sm) solid transparent;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color var(--motion-standard);

  &--secondary {
    background: var(--color-white);
    color: var(--color-grey-70);
    border-color: var(--color-grey-40);

    &:hover {
      background: var(--color-blue-60);
    }
  }

  &--danger {
    background: transparent;
    color: var(--color-text-error);
    border-color: var(--color-stroke-error);

    &:hover {
      background: rgba(237, 110, 28, 0.06);
    }
  }
}
</style>
