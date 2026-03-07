<template>
  <div class="home">
    <NHeading :level="2" class="home__title">Nestro UI Kit — Preview</NHeading>
    <div class="home__buttons">
      <RouterLink to="/nestro-demo">
        <NButton variant="primary">Nestro Demo</NButton>
      </RouterLink>
      <RouterLink to="/oil-tools-demo">
        <NButton variant="secondary">Oil Tools Demo</NButton>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: var(--space-8);
}

.home__buttons {
  display: flex;
  gap: var(--space-4);
}
</style>
