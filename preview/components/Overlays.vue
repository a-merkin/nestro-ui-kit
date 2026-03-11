<template>
  <div class="overlays">
    <section class="overlays__section">
      <NText class="overlays__label">Tooltip</NText>
      <div class="overlays__row">
        <NTooltip text="Подсказка сверху" placement="top">
          <NButton variant="secondary">Hover (top)</NButton>
        </NTooltip>
        <NTooltip text="Подсказка справа" placement="right">
          <NButton variant="secondary">Hover (right)</NButton>
        </NTooltip>
        <NTooltip text="Подсказка снизу" placement="bottom">
          <NButton variant="secondary">Hover (bottom)</NButton>
        </NTooltip>
      </div>
    </section>

    <section class="overlays__section">
      <NText class="overlays__label">Loader</NText>
      <div class="overlays__row">
        <NLoader size="sm" />
        <NLoader size="md" />
        <NLoader size="lg" />
        <NLoader size="md" text="Загрузка..." />
      </div>
    </section>

    <section class="overlays__section">
      <NText class="overlays__label">ProgressBar</NText>
      <div class="overlays__col">
        <NProgressBar :value="25" show-label />
        <NProgressBar :value="50" show-label />
        <NProgressBar :value="75" show-label />
        <NProgressBar :value="100" show-label />
      </div>
    </section>

    <section class="overlays__section">
      <NText class="overlays__label">Notification</NText>
      <div class="overlays__row">
        <NButton variant="secondary" @click="showNotification('info')">Info</NButton>
        <NButton variant="secondary" @click="showNotification('success')">Success</NButton>
        <NButton variant="secondary" @click="showNotification('warn')">Warning</NButton>
        <NButton variant="secondary" @click="showNotification('error')">Error</NButton>
      </div>
      <NNotification
        v-model:visible="notificationVisible"
        :type="notificationType"
        :title="notificationTitle"
        :message="notificationMessage"
        :duration="3000"
        closable
      />
    </section>

    <section class="overlays__section">
      <NText class="overlays__label">Modal</NText>
      <NButton variant="secondary" @click="modalOpen = true">Открыть модалку</NButton>
      <NModal v-model="modalOpen">
        <template #title>Редактирование скважины</template>
        <NText>Вы уверены, что хотите сохранить изменения для скважины Харьяга-42?</NText>
        <template #actions>
          <NButton variant="secondary" @click="modalOpen = false">Отмена</NButton>
          <NButton variant="primary" @click="modalOpen = false">Сохранить</NButton>
        </template>
      </NModal>
    </section>

    <section class="overlays__section">
      <NText class="overlays__label">BridgeModal</NText>
      <NText class="overlays__hint"
        >Симуляция дочернего окна. Кнопка «Отправить» посылает init-сообщение через
        BroadcastChannel.</NText
      >
      <div class="overlays__row">
        <NButton variant="secondary" @click="sendBridgeInit">Отправить init</NButton>
        <NText v-if="bridgeLog" class="overlays__log">{{ bridgeLog }}</NText>
      </div>
      <div class="bridge-preview">
        <NBridgeModal channel-name="nestro-bridge-preview" debug>
          <template #header>
            <NHeading :level="4">Редактор параметров</NHeading>
          </template>
          <template #default="{ initData, postEvent, close }">
            <NText v-if="initData">Получено: {{ JSON.stringify(initData) }}</NText>
            <NText v-else>Ожидание данных от родителя...</NText>
            <div class="overlays__row" style="margin-top: 12px">
              <NButton variant="secondary" @click="postEvent('saved', { ok: true })"
                >Сохранить</NButton
              >
              <NButton variant="secondary" @click="close()">Закрыть</NButton>
            </div>
          </template>
          <template #footer>
            <NText class="overlays__hint">footer слот</NText>
          </template>
        </NBridgeModal>
      </div>
    </section>

    <section class="overlays__section">
      <NText class="overlays__label">ConfirmDialog</NText>
      <div class="overlays__row">
        <NButton variant="secondary" @click="confirmOpen = true">Подтверждение</NButton>
        <NButton variant="secondary" @click="confirmDangerOpen = true">Опасное действие</NButton>
      </div>
      <NConfirmDialog
        v-model:open="confirmOpen"
        title="Подтвердите действие"
        description="Вы хотите применить изменения к выбранным скважинам?"
        @confirm="confirmOpen = false"
        @cancel="confirmOpen = false"
      />
      <NConfirmDialog
        v-model:open="confirmDangerOpen"
        variant="danger"
        title="Удалить скважину?"
        description="Это действие нельзя отменить. Все данные будут удалены."
        confirm-text="Удалить"
        @confirm="confirmDangerOpen = false"
        @cancel="confirmDangerOpen = false"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NotificationType } from 'nestro-ui-kit';

const modalOpen = ref(false);
const confirmOpen = ref(false);
const confirmDangerOpen = ref(false);

const notificationVisible = ref(false);
const notificationType = ref<NotificationType>('info');
const notificationTitle = ref('');
const notificationMessage = ref('');

const notificationMap: Record<NotificationType, { title: string; message: string }> = {
  info: { title: 'Информация', message: 'Данные успешно загружены.' },
  success: { title: 'Успешно', message: 'Изменения сохранены.' },
  warn: { title: 'Предупреждение', message: 'Проверьте введённые данные.' },
  error: { title: 'Ошибка', message: 'Не удалось выполнить операцию.' },
};

const showNotification = (type: NotificationType) => {
  notificationType.value = type;
  notificationTitle.value = notificationMap[type].title;
  notificationMessage.value = notificationMap[type].message;
  notificationVisible.value = true;
};

const bridgeLog = ref('');

const sendBridgeInit = () => {
  try {
    const ch = new BroadcastChannel('nestro-bridge-preview');
    ch.postMessage({ type: 'init', payload: { well: 'Харьяга-42', depth: 3200 } });
    ch.close();
    bridgeLog.value = 'init отправлен';
  } catch {
    bridgeLog.value = 'BroadcastChannel недоступен';
  }
};
</script>

<style scoped>
.overlays {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-4);
}

.overlays__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.overlays__label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-grey-70);
}

.overlays__row {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  align-items: center;
}

.overlays__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.overlays__hint {
  font-size: var(--font-size-xs);
  color: var(--color-grey-60);
}

.overlays__log {
  font-size: var(--font-size-xs);
  color: var(--color-green-90);
}

.bridge-preview {
  border: var(--border-width-sm) solid var(--color-stroke-primary);
  border-radius: var(--radius-md);
  height: 260px;
  overflow: hidden;
}
</style>
