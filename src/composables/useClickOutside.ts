import { onMounted, onBeforeUnmount, type Ref } from 'vue';

export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void) {
  const handler = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handler, true);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handler, true);
  });
}
