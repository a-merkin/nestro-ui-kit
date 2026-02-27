<script setup lang="ts">
import { computed } from 'vue';
import BridgeModalDemo from './pages/BridgeModalDemo.vue';
import BridgeModalTab from './pages/BridgeModalTab.vue';

const isBridgeTab = computed(() => new URLSearchParams(window.location.search).has('bridge'));
</script>

<template>
  <BridgeModalTab v-if="isBridgeTab" />
  <BridgeModalDemo v-else />
</template>
