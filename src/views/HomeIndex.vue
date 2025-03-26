<template>
  <dv-border-box11 class="head" title="WMS物料超期报表" :title-width="600" :animate="false">
    <div class="headdiv">
      <HeadView></HeadView>
    </div>
  </dv-border-box11>
  <dv-border-box12 class="borderA" :animate="true">
    <!-- 上部分 -->
    <div class="top">
      <IndexData6></IndexData6>
      <div class="right">
        <IndexData9></IndexData9>
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
        <MaterialTypeDistribution></MaterialTypeDistribution>
      </div>
      <div>
        <MaterialStatus></MaterialStatus>
      </div>
    </div>
  </dv-border-box12>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import IndexData6 from './IndexData6.vue';
import MaterialTypeDistribution from './MaterialTypeDistribution.vue';
import MaterialStatus from './MaterialStatus.vue';
import IndexData9 from './IndexData9.vue';
import HeadView from './HeadView.vue';

// 定义响应式数据
const isMounted = ref(false);

onMounted(() => {
  nextTick(() => {
    isMounted.value = true;
  });
});
</script>

<style lang="scss" scoped>
/* 让 box11（.head）成为 Flex 容器，使 box10（.head_sbu）垂直居中 */
.head {
  height: vh(120);
  width: 100%;
  display: flex;

}

.headdiv {
  width: 100% !important;
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center !important;
}

.borderA {
  height: vh(900);
  width: 100%;
}

.top {
  display: flex;
  flex-direction: row;
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
