<template>
  <div class="login-page">
    <form class="login-form" @submit.prevent="onSubmit">
      <h2 class="login-form__title">Вход в систему</h2>

      <NField
        label="Email"
        :error="form.hasError('email')"
        :error-message="form.errors.email"
        required
      >
        <NInput
          v-model="form.values.email"
          type="email"
          placeholder="user@nestro.ru"
          :error="form.hasError('email')"
        />
      </NField>

      <NField
        label="Пароль"
        :error="form.hasError('password')"
        :error-message="form.errors.password"
        required
      >
        <NInput
          v-model="form.values.password"
          type="password"
          placeholder="Введите пароль"
          :error="form.hasError('password')"
        />
      </NField>

      <NField
        :error="form.hasError('remember')"
        :error-message="form.errors.remember"
      >
        <NCheckbox v-model="form.values.remember">
          Запомнить меня
        </NCheckbox>
      </NField>

      <div class="login-form__actions">
        <NButton type="submit" variant="primary">Войти</NButton>
        <NButton type="button" variant="secondary" @click="form.reset()">Сбросить</NButton>
      </div>

      <div v-if="submitted" class="login-form__success">
        Успешная авторизация: {{ form.values.email }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '../../src/composables/useForm';

const submitted = ref(false);

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const form = useForm<LoginFormValues>({
  initialValues: {
    email: '',
    password: '',
    remember: false,
  },
  onSubmit(values) {
    submitted.value = false;

    if (!values.email) {
      form.setError('email', 'Email обязателен');
    } else if (!values.email.includes('@')) {
      form.setError('email', 'Некорректный формат email');
    }

    if (!values.password) {
      form.setError('password', 'Пароль обязателен');
    } else if (values.password.length < 6) {
      form.setError('password', 'Минимум 6 символов');
    }

    const hasErrors = form.hasError('email') || form.hasError('password');
    if (!hasErrors) {
      submitted.value = true;
    }
  },
});

function onSubmit() {
  form.handleSubmit();
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--color-grey-10, #f5f5f5);
  font-family: var(--font-family-base, 'Montserrat', sans-serif);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4, 16px);
  width: 100%;
  max-width: 380px;
  padding: var(--space-8, 32px);
  background: var(--color-white, #fff);
  border-radius: var(--radius-lg, 16px);
  box-shadow: var(--shadow-lg, 0 4px 24px rgba(0, 0, 0, 0.1));
}

.login-form__title {
  margin: 0 0 var(--space-2, 8px);
  font-size: var(--font-size-lg, 22px);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-text-primary, #1a1a1a);
  text-align: center;
}

.login-form__actions {
  display: flex;
  gap: var(--space-3, 12px);
  margin-top: var(--space-2, 8px);
}

.login-form__success {
  padding: var(--space-3, 12px);
  background: var(--color-green-10, #e6f7ed);
  border-radius: var(--radius-sm, 8px);
  color: var(--color-green-100, #097f2d);
  font-size: var(--font-size-sm, 14px);
  text-align: center;
}
</style>
