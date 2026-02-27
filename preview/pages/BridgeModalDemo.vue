<template>
  <div class="demo">
    <header class="demo__header">
      <div class="demo__header-text">
        <h1 class="demo__title">BridgeModal</h1>
        <p class="demo__subtitle">
          Коммуникация между вкладками через <code>BroadcastChannel</code>. Левая панель —
          opener-сервис, правая — содержимое открытой вкладки.
        </p>
      </div>
      <button class="demo__btn demo__btn--primary" @click="openRealTab">
        Открыть в новой вкладке
      </button>
    </header>

    <div class="demo__panels">
      <!-- ── Opener controls ─────────────────────── -->
      <section class="panel panel--opener">
        <h2 class="panel__title">Opener (service)</h2>

        <div class="panel__group">
          <label class="panel__label">Init data (JSON)</label>
          <textarea v-model="initJson" class="panel__textarea" rows="5" spellcheck="false" />
          <p v-if="initJsonError" class="panel__error">{{ initJsonError }}</p>
          <button class="demo__btn demo__btn--secondary" @click="sendInit">Отправить init</button>
        </div>

        <div class="panel__group">
          <label class="panel__label">Тип события</label>
          <input v-model="eventType" class="panel__input" placeholder="e.g. save" />
          <label class="panel__label">Payload (JSON)</label>
          <textarea v-model="eventPayload" class="panel__textarea" rows="3" spellcheck="false" />
          <p v-if="eventPayloadError" class="panel__error">{{ eventPayloadError }}</p>
          <button class="demo__btn demo__btn--secondary" @click="sendEvent">
            Отправить событие
          </button>
        </div>

        <button class="demo__btn demo__btn--danger" @click="sendClose">Закрыть вкладку</button>

        <div class="panel__log">
          <h3 class="panel__log-title">Входящие события</h3>
          <div v-if="openerLog.length === 0" class="panel__log-empty">Событий пока нет</div>
          <div v-for="(entry, i) in openerLog" :key="i" class="panel__log-entry">
            <span class="panel__log-type">{{ entry.type }}</span>
            <pre class="panel__log-payload">{{ JSON.stringify(entry.payload, null, 2) }}</pre>
          </div>
        </div>
      </section>

      <!-- ── BridgeModal preview ─────────────────── -->
      <section class="panel panel--bridge">
        <h2 class="panel__title">Popup / Tab (BridgeModal)</h2>
        <div class="panel__frame">
          <NBridgeModal :channel-name="CHANNEL" :debug="true">
            <template #header>
              <span class="bridge-header__title">Bridge Modal — демо</span>
            </template>

            <template #default="{ initData, postEvent, close }">
              <div class="bridge-content">
                <div class="bridge-content__section">
                  <strong class="bridge-content__label">initData</strong>
                  <pre class="bridge-content__pre">{{
                    initData !== null ? JSON.stringify(initData, null, 2) : 'null'
                  }}</pre>
                </div>

                <div class="bridge-content__actions">
                  <button
                    class="demo__btn demo__btn--secondary"
                    @click="postEvent('save', { value: 42, ts: Date.now() })"
                  >
                    Отправить save
                  </button>
                  <button
                    class="demo__btn demo__btn--secondary"
                    @click="postEvent('custom', { msg: 'Привет из вкладки' })"
                  >
                    Отправить custom
                  </button>
                  <button class="demo__btn demo__btn--danger" @click="close()">Закрыть</button>
                </div>
              </div>
            </template>

            <template #footer>
              <span class="bridge-footer__hint">Симуляция открытой вкладки</span>
            </template>
          </NBridgeModal>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted, onBeforeUnmount } from 'vue';

const CHANNEL = 'nestro-bridge-demo';

const initJson = ref(JSON.stringify({ userId: 1, name: 'Тест', role: 'admin' }, null, 2));
const eventType = ref('refresh');
const eventPayload = ref(JSON.stringify({ force: true }, null, 2));
const initJsonError = ref('');
const eventPayloadError = ref('');

type LogEntry = { type: string; payload: any };
const openerLog = ref<LogEntry[]>([]);

let channel: BroadcastChannel | null = null;

onMounted(() => {
  channel = new BroadcastChannel(CHANNEL);
  channel.onmessage = (ev) => {
    openerLog.value.unshift({ type: ev.data.type, payload: ev.data.payload });
  };
});

onBeforeUnmount(() => {
  channel?.close();
  channel = null;
});

function parseJson(raw: string, errorRef: Ref<string>): any | null {
  try {
    errorRef.value = '';
    return JSON.parse(raw);
  } catch {
    errorRef.value = 'Невалидный JSON';
    return null;
  }
}

function sendInit() {
  const payload = parseJson(initJson.value, initJsonError);
  if (payload === null && initJsonError.value) return;
  channel?.postMessage({ type: 'init', payload });
}

function sendEvent() {
  const payload = parseJson(eventPayload.value, eventPayloadError);
  if (payload === null && eventPayloadError.value) return;
  channel?.postMessage({ type: eventType.value, payload });
}

function sendClose() {
  channel?.postMessage({ type: 'close', payload: { reason: 'manual' } });
}

function openRealTab() {
  const url = `${window.location.origin}${window.location.pathname}?bridge=1`;
  window.open(url, '_blank');
  setTimeout(() => sendInit(), 400);
}
</script>

<style scoped lang="scss">
.demo {
  min-height: 100vh;
  background: var(--color-blue-60);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-6);
  box-sizing: border-box;
}

.demo__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.demo__title {
  margin: 0 0 var(--space-1);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-grey-100);
}

.demo__subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: var(--color-grey-70);

  code {
    background: var(--color-blue-40);
    border-radius: var(--radius-toggle-sm);
    padding: 1px 5px;
    font-size: 0.8rem;
  }
}

// ── Shared buttons ────────────────────────────────
.demo__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
  border: var(--border-width-sm) solid transparent;
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    background-color var(--motion-standard),
    border-color var(--motion-standard);
  white-space: nowrap;

  &--primary {
    background: var(--color-green-90);
    color: var(--color-white);
    border-color: var(--color-green-100);

    &:hover {
      background: var(--color-green-100);
    }
  }

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

// ── Panels layout ─────────────────────────────────
.demo__panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  flex: 1;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.panel__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-100);
  padding-bottom: var(--space-3);
  border-bottom: var(--border-width-sm) solid var(--color-grey-20);
}

.panel__group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.panel__label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-grey-70);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.panel__input,
.panel__textarea {
  width: 100%;
  box-sizing: border-box;
  padding: var(--space-2) var(--space-3);
  border: var(--border-width-sm) solid var(--color-grey-40);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-family: 'Menlo', 'Consolas', monospace;
  color: var(--color-grey-70);
  background: var(--color-grey-50);
  resize: vertical;
  transition: border-color var(--motion-standard);

  &:focus {
    outline: none;
    border-color: var(--color-green-90);
  }
}

.panel__error {
  margin: 0;
  font-size: 0.75rem;
  color: var(--color-text-error);
}

// ── Log ───────────────────────────────────────────
.panel__log {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-height: 120px;
}

.panel__log-title {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-grey-70);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.panel__log-empty {
  font-size: 0.8rem;
  color: var(--color-blue-50);
  font-style: italic;
}

.panel__log-entry {
  background: var(--color-blue-60);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.panel__log-type {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-green-90);
}

.panel__log-payload {
  margin: 0;
  font-size: 0.75rem;
  font-family: 'Menlo', 'Consolas', monospace;
  color: var(--color-grey-70);
  white-space: pre-wrap;
  word-break: break-all;
}

// ── Bridge panel ──────────────────────────────────
.panel--bridge {
  padding: 0;
  overflow: hidden;
}

.panel--bridge .panel__title {
  padding: var(--space-4) var(--space-6) var(--space-3);
  margin: 0;
}

.panel__frame {
  flex: 1;
  border-top: var(--border-width-sm) solid var(--color-grey-20);
  overflow: hidden;

  :deep(.bridge-modal) {
    height: 100%;
    min-height: 400px;
  }
}

// ── BridgeModal slot content ──────────────────────
.bridge-header__title {
  font-weight: 600;
  font-size: 1rem;
}

.bridge-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.bridge-content__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-grey-70);
}

.bridge-content__pre {
  margin: var(--space-1) 0 0;
  padding: var(--space-2) var(--space-3);
  background: var(--color-blue-60);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-family: 'Menlo', 'Consolas', monospace;
  color: var(--color-grey-70);
  white-space: pre-wrap;
  word-break: break-all;
}

.bridge-content__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.bridge-footer__hint {
  font-size: 0.75rem;
  color: var(--color-blue-50);
  font-style: italic;
}
</style>
