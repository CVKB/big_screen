<template>
  <div class="app-container">
    <router-view /> <!-- 你的页面内容 -->
  </div>
</template>

<style lang="scss">
.app-container {
  background-image: url('@/assets/pageBg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: vh(1024);
  width: vw(1280);
}
</style>
