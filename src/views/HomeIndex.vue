<template>
  <dv-border-box11 class="vh-120 w-100% flex" title="WMS物料超期报表" :title-width="600" :animate="true">
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
        <dv-border-box-8 class=" vh-270 text-white justify-center items-center">
          <div class="flex flex-row ">
            <span class="text-red ">超期未处理：</span>
            <el-progress class="vw-200" :percentage="50" :stroke-width="15" striped :format="formatFunction" />
          </div>
          <!-- <div class="flex flex-row ">
            <span class=" text-yellow ">超期待处理：</span>
            <el-progress class="vw-200" percentage=30 color="yellow" stroke-width="vh-10" striped striped-flow
              :show-text="false" />
          </div>
          <div class="flex flex-row ">
            <span class=" text-green ">超期已处理：</span>
            <el-progress class="vw-200" percentage=30 color="green" stroke-width="vh-10" striped striped-flow
              :show-text="false" />
          </div> -->
        </dv-border-box-8>

      </div>
    </div>
    <!-- 下部分  -->
    <div class="flex justify-center items-center min-w100% mx-a gap-10">
      <MaterialTypeDistribution></MaterialTypeDistribution>
      <MaterialStatus></MaterialStatus>
    </div>
  </dv-border-box12>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import DataTable from './DataTable.vue';
import MaterialTypeDistribution from './MaterialTypeDistribution.vue';
import MaterialStatus from './MaterialStatus.vue';
import DaysProportion from './DaysProportion.vue';
// import CapsuleChart from './CapsuleChart.vue';

import HeadView from './HeadView.vue';


const formatFunction = (percent: number) => {
  return `${percent}% 已完成`;
};


const isMounted = ref(false);

onMounted(() => {
  nextTick(() => {
    isMounted.value = true;
  });
});
</script>

<style lang="scss" scoped>
// .rightSide2 {
//   ::v-deep .border-box-content {
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     justify-items: center;
//     height: vh(32);
//     font-size: vh(12);
//     color: white;
//     margin-top: 10px;
//   }
// }</style>
