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
        <dv-border-box-10 class=" vw-450 vh-200 text-white justify-center items-center">
          <div class=" flex flex-row">
            <dv-border-box2 class=" vw-120 vh-70 ml-2">
              <el-statistic class=" total" title="总物料项数" :value="totaltValue" />
            </dv-border-box2>
            <dv-border-box2 class=" vw-120 vh-70">
              <el-statistic class=" Exceed" title="超期物料总数" :value="ExceedValue" />
            </dv-border-box2>
            <dv-border-box2 class=" vw-120 vh-70">
              <el-statistic class=" Recheck " title="重检物料总数" :value="RecheckValue" />
            </dv-border-box2>
            <dv-border-box2 class=" vw-120 vh-70 mr-2">
              <el-statistic class=" pass " title="重检查合格率" :value="passValue" />
            </dv-border-box2>
          </div>
          <div class="flex flex-row mt-2 ml-2">
            <span class="text-red font-bold text-vh-18">超期未处理：</span>
            <el-progress class="Pending" :percentage="80" color="red" :stroke-width="computedStrokeWidth"
              :format="formattedText1" />
          </div>
          <div class="flex flex-row mt-2 ml-2">
            <span class=" text-yellow  font-bold text-vh-18">超期待处理：</span>
            <el-progress class="Awaiting" :percentage="10" color="yellow" :stroke-width="computedStrokeWidth"
              :format="formattedText2" />
          </div>
          <div class="flex flex-row mt-2 ml-2">
            <span class=" text-sky  font-bold text-vh-18">超期已处理：</span>
            <el-progress class="Processed" :percentage="10" color="green" :stroke-width="computedStrokeWidth"
              :format="formattedText3" />
          </div>
        </dv-border-box-10>

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

const customText1 = ref('40000'); // 可以改为动态值
const formattedText1 = computed(() => {
  return (percent: number) => `${customText1.value}(${percent}%)`;
});

const customText2 = ref('5000'); // 可以改为动态值
const formattedText2 = computed(() => {
  return (percent: number) => `${customText2.value}(${percent}%)`;
});

const customText3 = ref('5000'); // 可以改为动态值
const formattedText3 = computed(() => {
  return (percent: number) => `${customText3.value}(${percent}%)`;
});




const totalsource = ref(0)
const totaltValue = useTransition(totalsource, {
  duration: 2500,
})
totalsource.value = 100000


const Exceedsource = ref(0)
const ExceedValue = useTransition(Exceedsource, {
  duration: 2500,
})
Exceedsource.value = 50000

const Rechecksource = ref(0)
const RecheckValue = useTransition(Rechecksource, {
  duration: 2500,
})
Rechecksource.value = 30000

const passsource = ref(0)
const passValue = useTransition(passsource, {
  duration: 2000,
})
passsource.value = 10

// 设计稿参数
const designHeight = 1024; // 设计稿高度
const designStrokeWidth = 25; // 设计稿上的 stroke-width

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
  :deep(.el-statistic__head) {
    font-size: vh(18);
    color: white;
    display: flex;
    margin-top: vw(10);
    justify-content: center;
    align-items: center;
  }

  :deep(.el-statistic__content) {
    display: flex;
    height: vh(20);
    justify-content: center;
    align-items: center;
  }

  :deep(.el-statistic__number) {
    font-size: vh(18);
    color: skyblue;
    font-weight: bold;
    height: vh(20);
  }
}

.Exceed {
  :deep(.el-statistic__head) {
    font-size: vh(18);
    color: white;
    display: flex;
    margin-top: vw(10);
    justify-content: center;
    align-items: center;
  }

  :deep(.el-statistic__content) {
    display: flex;
    height: vh(20);
    justify-content: center;
    align-items: center;
  }

  :deep(.el-statistic__number) {
    font-size: vh(18);
    color: red;
    font-weight: bold;
    height: vh(20);
  }
}


.Recheck {
  :deep(.el-statistic__head) {
    font-size: vh(18);
    color: white;
    display: flex;
    margin-top: vw(10);
    justify-content: center;
    align-items: center;
  }

  :deep(.el-statistic__content) {
    display: flex;
    height: vh(20);
    justify-content: center;
    align-items: center;
  }

  :deep(.el-statistic__number) {
    font-size: vh(18);
    color: yellow;
    height: vh(20);
    font-weight: bold;
  }
}

.pass {
  :deep(.el-statistic__head) {
    font-size: vh(18);
    color: white;
    display: flex;
    margin-top: vw(10);
    justify-content: center;
    align-items: center;
  }

  :deep(.el-statistic__content) {
    display: flex;
    height: vh(20);
    justify-content: center;
    align-items: center;
  }

  :deep(.el-statistic__number) {
    font-size: vh(16);
    color: green;
    font-weight: bold;
    height: vh(20);
  }

  /* 添加 % 符号 */
  :deep(.el-statistic__number)::after {
    content: "%";
  }
}

.test {
  :deep(.dv-border-box-11-title) {
    font-size: vh(36);
  }
}

.Pending {
  :deep(.el-progress__text) {
    color: red;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: left;
  }

  :deep(.el-progress-bar__outer) {
    color: red;
    font-weight: bold;
    width: vw(200);
  }

  :deep(.el-progress-bar) {
    width: vw(200);
  }
}

.Awaiting {
  :deep(.el-progress__text) {
    color: yellow;
    font-weight: bold;
  }

  :deep(.el-progress-bar__outer) {
    color: red;
    font-weight: bold;
    width: vw(200);
  }
}

.Processed {
  :deep(.el-progress__text) {
    color: green;
    font-weight: bold;
  }

  :deep(.el-progress-bar__outer) {
    color: red;
    font-weight: bold;
    width: vw(200);
  }
}
</style>
