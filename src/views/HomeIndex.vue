<template>
  <dv-border-box11 class="vh-120 w-100% flex test" title="WMS物料超期报表" :title-width="600" :animate="true">
    <div class="w-100% h-100% flex flex-1 items-center">
      <HeadView></HeadView>
    </div>
  </dv-border-box11>
  <dv-border-box12 class="vh-900 w-100% " :animate="true">
    <!-- 上部分 -->
    <div class="flex flex-row">
      <DataTable></DataTable>
      <div class="flex flex-col justify-between">
        <DaysProportion></DaysProportion>
        <!-- <CapsuleChart></CapsuleChart> -->
        <dv-border-box-8 class=" vw-450 vh-200 text-white justify-center items-center">
          <div class=" flex flex-row">
            <el-statistic class=" total" title="总物料项数" :value="outputValue" />
            <el-statistic class=" total" title="超期物料总数" :value="outputValue" />
            <el-statistic class=" total " title="重检物料总数" :value="outputValue" />
            <el-statistic class=" total " title="重检查合格率" :value="outputValue" />
          </div>
          <div class="flex flex-row mt-2 ml-2">
            <span class="text-red ">超期未处理：</span>
            <el-progress class="vw-300" :percentage="10" color="red" :stroke-width="computedStrokeWidth"
              :format="formattedText" />
          </div>
          <div class="flex flex-row mt-2 ml-2">
            <span class=" text-yellow">超期待处理：</span>
            <el-progress class="vw-300" :percentage="10" color="yellow" :stroke-width="computedStrokeWidth"
              :format="formattedText" />
          </div>
          <div class="flex flex-row mt-2 ml-2">
            <span class=" text-sky ">超期未处理：</span>
            <el-progress class="vw-300" :percentage="10" color="skyblue" :stroke-width="computedStrokeWidth"
              :format="formattedText" />
          </div>
        </dv-border-box-8>

      </div>
    </div>
    <!-- 下部分  -->
    <div class="flex justify-center items-center min-w100% mx-a gap-10 mt-4">
      <MaterialTypeDistribution></MaterialTypeDistribution>
      <MaterialStatus></MaterialStatus>
    </div>
  </dv-border-box12>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, computed, onBeforeUnmount } from "vue";
import DataTable from './DataTable.vue';
import MaterialTypeDistribution from './MaterialTypeDistribution.vue';
import MaterialStatus from './MaterialStatus.vue';
import DaysProportion from './DaysProportion.vue';
// import CapsuleChart from './CapsuleChart.vue';

import HeadView from './HeadView.vue';
import { useTransition } from "@vueuse/core";

const customText = ref('999'); // 可以改为动态值

const formattedText = computed(() => {
  return (percent: number) => `${customText.value}(${percent}%)`;
});

const source = ref(0)
const outputValue = useTransition(source, {
  duration: 500,
})
source.value = 172000

// 设计稿参数
const designHeight = 1024; // 设计稿高度
const designStrokeWidth = 20; // 设计稿上的 stroke-width

// 动态计算 stroke-width
const computedStrokeWidth = ref(designStrokeWidth);

const calculateStrokeWidth = () => {
  const currentViewportHeight = window.innerHeight;
  computedStrokeWidth.value = (designStrokeWidth / designHeight) * currentViewportHeight;
};

// 初始化 + 监听窗口变化
onMounted(() => {
  calculateStrokeWidth();
  window.addEventListener('resize', calculateStrokeWidth);
});

// 组件卸载时移除监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateStrokeWidth);
});


const isMounted = ref(false);
onMounted(() => {
  nextTick(() => {
    isMounted.value = true;
  });
});
</script>

<style lang="scss" scoped>
.total {
  :deep(.el-statistic__number) {
    font-size: vh(16);
    color: white;
    margin-left: vw(10);
  }

  :deep(.el-statistic__head) {
    font-size: vh(18);
    color: white;
    margin-left: vw(10);
    margin-top: vw(10);
  }
}

.test {
  :deep(.dv-border-box-11-title) {
    font-size: vh(36);
  }
}
</style>
