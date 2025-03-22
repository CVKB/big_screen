<template>
  <div class="ScreenAdapter" :style="style">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  width: {
    type: String,
    default: '1920',
  },
  height: {
    type: String,
    default: '1080',
  },
});

const style = ref({
  width: `${props.width}px`,
  height: `${props.height}px`,
  transform: 'scale(1) translate(-50%, -50%)',
});

const getScale = () => {
  const w = window.innerWidth / +props.width;
  const h = window.innerHeight / +props.height;
  return Math.min(w, h);
};

const setScale = () => {
  const scale = getScale();
  style.value.transform = `scale(${scale}) translate(-50%, -50%)`;
};

const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const handleResize = debounce(setScale, 100);

onMounted(() => {
  setScale();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.ScreenAdapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: transform 0.3s;
  overflow: hidden;
  /* 隐藏滚动条 */
}
</style>