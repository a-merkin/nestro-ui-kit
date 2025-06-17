<template>
  <div class="current-scenario">
    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 20L9 11L3 2" stroke="#B6C7CF" stroke-opacity="0.3" stroke-width="5"/>
<path d="M13 20L18 11L13 2" stroke="#B6C7CF" stroke-opacity="0.3" stroke-width="5"/>
</svg>

    <template v-for="(part, idx) in scenarioParts" :key="idx">
      <span class="current-scenario__text">{{ part }}</span>
      <span v-if="idx < scenarioParts.length - 1" class="scenario-separator" />
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{ scenarioParts: string[] }>();
</script>

<style scoped>
.current-scenario {
  position: relative;
  width: max-content;
  height: 18px;
  display: flex;
  align-items: center;
  background: none;
  gap: 8px;
}
.current-scenario__text {
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.22;
  color: #3B697E;
  display: flex;
  align-items: center;
}
.scenario-separator {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #D9D9D9;
  margin: 0 8px;
}
</style> 