<template>
  <dv-border-box11 class="head" title="WMS物料超期报表" :title-width="400" :animate="false">
    <dv-border-box10 class="head_sbu">
      SBU4
    </dv-border-box10>
  </dv-border-box11>
  <dv-border-box12 class="borderA" :animate="true">
    <!-- 上部分 -->
    <div class="top">
      <IndexData6></IndexData6>
      <div class="right">
        <div>
          <IndexData8></IndexData8>
        </div>
        <div>
          <div>123123</div>
          <div>123123</div>
          <div>123123</div>
          <div>123123</div>
        </div>
      </div>
    </div>
    <!-- 下部分  -->
    <div class="boxbottom">
      <div>
        <IndexData7></IndexData7>
      </div>
      <div>
        <IndexData8></IndexData8>
      </div>
    </div>
  </dv-border-box12>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import IndexData6 from './IndexData6.vue';
import IndexData7 from './IndexData7.vue';
import IndexData8 from './IndexData8.vue';

// 定义响应式数据
const isMounted = ref(false);

onMounted(() => {
  nextTick(() => {
    isMounted.value = true;
  });
});
</script>

<style lang="scss" scoped>
.head {
  height: vh(100);
  width: vw(1280);
  padding-left: 20px;
  display: flex !important;
  /* 强制覆盖 */
  justify-content: flex-start !important;
  align-items: center !important;
  position: relative;
  /* 确保 Flex 生效 */
}

.head_sbu {
  font-size: 16px;
  font-weight: bold;
  width: 50px;
  height: 50px;
  margin: 0;
  /* 清除默认 margin */
}

.borderA {
  height: vh(900);
  width: 100%;
}

.top {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}


.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.boxbottom {
  display: flex;
  justify-content: center;
  /* 子元素整体居中 */
  align-items: center;
  min-width: 100%;
  min-height: 100px;
}

/* 每个子元素左右 margin 自动分配 */
.boxbottom>* {
  margin: 0 auto;
}
</style>
