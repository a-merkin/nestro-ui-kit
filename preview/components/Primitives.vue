<template>
  <div class="primitives">
    <section class="primitives__section">
      <NText class="primitives__label">Heading</NText>
      <NHeading :level="1" size="lg">Заголовок H1 lg</NHeading>
      <NHeading :level="2" size="md">Заголовок H2 md</NHeading>
      <NHeading :level="3" size="sm">Заголовок H3 sm</NHeading>
      <NHeading :level="4" size="xs">Заголовок H4 xs</NHeading>
    </section>

    <section class="primitives__section">
      <NText class="primitives__label">Text</NText>
      <NText size="lg" weight="bold">Текст lg bold</NText>
      <NText size="md" weight="medium">Текст md medium</NText>
      <NText size="sm" weight="normal">Текст sm normal</NText>
      <NText size="xs" color="color-grey-60">Текст xs grey-60</NText>
      <NText size="md" truncate style="max-width: 200px">Очень длинный текст с truncate — обрезается многоточием</NText>
    </section>

    <section class="primitives__section">
      <NText class="primitives__label">Label</NText>
      <NLabel>Обычная метка</NLabel>
      <NLabel required>Обязательное поле</NLabel>
      <NLabel size="md" weight="bold">Метка md bold</NLabel>
    </section>

    <section class="primitives__section">
      <NText class="primitives__label">Field</NText>
      <NField label="Месторождение" hint="Введите название месторождения">
        <NInput placeholder="Харьягинское" />
      </NField>
      <NField label="Скважина" error error-message="Поле обязательно для заполнения" required>
        <NInput placeholder="Введите номер" />
      </NField>
    </section>

    <section class="primitives__section">
      <NText class="primitives__label">Box</NText>
      <NBox padding="space-4" radius="radius-md" bg="color-blue-60">
        <NText>Box с padding, radius и bg</NText>
      </NBox>
      <NBox padding="space-3" radius="radius-lg" bg="color-green-10">
        <NText>Box другой вариант</NText>
      </NBox>
    </section>

    <section class="primitives__section">
      <NText class="primitives__label">Flex</NText>
      <NFlex gap="space-3" align="center">
        <NBox padding="space-3" bg="color-blue-60" radius="radius-sm"><NText>A</NText></NBox>
        <NBox padding="space-3" bg="color-blue-60" radius="radius-sm"><NText>B</NText></NBox>
        <NBox padding="space-3" bg="color-blue-60" radius="radius-sm"><NText>C</NText></NBox>
      </NFlex>
      <NFlex gap="space-3" justify="between">
        <NText>Слева</NText>
        <NText>Справа</NText>
      </NFlex>
    </section>

    <section class="primitives__section">
      <NText class="primitives__label">Stack</NText>
      <NStack gap="space-2">
        <NBox padding="space-2" bg="color-blue-60" radius="radius-sm"><NText>Элемент 1</NText></NBox>
        <NBox padding="space-2" bg="color-blue-60" radius="radius-sm"><NText>Элемент 2</NText></NBox>
        <NBox padding="space-2" bg="color-blue-60" radius="radius-sm"><NText>Элемент 3</NText></NBox>
      </NStack>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.primitives {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-4);
  max-width: 480px;
}

.primitives__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.primitives__label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-grey-70);
  border-bottom: var(--border-width-sm) solid var(--color-stroke-primary);
  padding-bottom: var(--space-1);
  margin-bottom: var(--space-1);
}
</style>
