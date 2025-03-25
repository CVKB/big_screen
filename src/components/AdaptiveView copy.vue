<template>
  <!-- 屏幕适配容器，通过缩放实现不同屏幕尺寸的适配 -->
  <div class="ScreenAdapter" :style="style">
    <!-- 插槽用于放置内容 -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 定义组件属性
const props = defineProps({
  width: {
    type: String,
    default: '1280', // 默认设计稿宽度
  },
  height: {
    type: String,
    default: '1024', // 默认设计稿高度
  },
  backgroundImage: {
    type: String,
    default: '' // 可以传入背景图片路径
  }
});

// 样式对象，使用ref使其响应式
const style = ref({
  width: `${props.width}px`, // 设置容器宽度
  height: `${props.height}px`, // 设置容器高度
  transform: 'scale(1) translate(-50%, -50%)', // 初始缩放和位置变换
});

/**
 * 计算缩放比例
 * @returns {number} 返回基于窗口尺寸和设计稿尺寸的最小缩放比例
 */
const getScale = () => {
  const w = window.innerWidth / +props.width; // 计算宽度比例
  const h = window.innerHeight / +props.height; // 计算高度比例
  return Math.min(w, h); // 取较小的比例保证内容完全显示
};

/**
 * 设置缩放比例
 */
const setScale = () => {
  const scale = getScale();
  // 更新transform样式，缩放并居中
  style.value.transform = `scale(${scale}) translate(-50%, -50%)`;
};

/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} delay 延迟时间(毫秒)
 * @returns {Function} 返回防抖处理后的函数
 */
const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer); // 清除之前的定时器
    timer = setTimeout(() => fn(...args), delay); // 设置新的定时器
  };
};

// 创建防抖的resize事件处理函数
const handleResize = debounce(setScale, 100);

// 组件挂载时
onMounted(() => {
  setScale(); // 初始设置缩放比例
  window.addEventListener('resize', handleResize); // 监听窗口resize事件
});

// 组件卸载时
onUnmounted(() => {
  window.removeEventListener('resize', handleResize); // 移除resize事件监听
});
</script>

<style scoped>
.ScreenAdapter {
  transform-origin: 0 0;
  /* 缩放原点设置为左上角 */
  position: absolute;
  /* 绝对定位 */
  left: 50%;
  /* 水平居中 */
  top: 50%;
  /* 垂直居中 */
  transition: transform 0.3s;
  /* 缩放过渡动画 */
  overflow: hidden;
  /* 隐藏溢出内容 */
  background-image: url('../assets/pageBg.png');
  /* 背景图片 */
  background-size: cover;
  /* 背景图片覆盖整个容器 */
  background-repeat: no-repeat;
  /* 背景不重复 */
  z-index: -1;
  /* 设置z-index */
}
</style>