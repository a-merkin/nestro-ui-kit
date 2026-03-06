<template>
    <component :is="asTag" class="n-box" :style="styles">
      <slot />
    </component>
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
import type { NBoxProps } from './Box.types';

defineOptions({ name: 'NBox' });

const props = withDefaults(defineProps<NBoxProps>(), {
    as: 'div',
    padding: undefined,
    margin: undefined,
    radius: undefined,
    bg: undefined,
});

const asTag = computed(() => props.as);

function spacingValue(token?: string) {
    if (!token) return undefined;
    if (token === '0') return '0px';
    return `var(--${token})`;
}

function radiusValue(token?: string) {
    if (!token) return undefined;
    return `var(--${token})`;
}

function colorValue(token?: string) {
    if (!token) return undefined;
    return `var(--${token})`;
}

const styles = computed(() => ({
    padding: spacingValue(props.padding),
    margin: spacingValue(props.margin),
    borderRadius: radiusValue(props.radius),
    backgroundColor: colorValue(props.bg),
}));
</script>

<style scoped>
.n-box {
    display: block;
}
</style>