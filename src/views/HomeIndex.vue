<template>
  <dv-border-box11 class="head" title="WMS物料超期报表" :title-width="600" :animate="true">
    <div class="w-100% h-100% flex flex-1 items-center">
      <HeadView></HeadView>
    </div>
  </dv-border-box11>
  <dv-border-box12 class="borderA" :animate="true">
    <!-- 上部分 -->
    <div class="flex flex-row">
      <DataTable></DataTable>
      <div class="flex flex-col justify-between">
        <DaysProportion></DaysProportion>
        <div>
          <dv-border-box-8 class="rightSide2  vh-270 vw-450 text-white">
            <dv-border-box-10>统计信息</dv-border-box-10>
            <dv-border-box-12>总物料项数：56100PCS</dv-border-box-12>
            <dv-border-box-12>超期物料总数：9000PCS</dv-border-box-12>
            <dv-border-box-12>重检物料总数：1000PCS</dv-border-box-12>
            <dv-border-box-12>重检合格率：20%</dv-border-box-12>
            <dv-border-box-12>
              <span class="text-red ">超期未处理：200(20%)</span>
            </dv-border-box-12>
            <dv-border-box-12>
              <span class=" text-yellow ">超期待处理：200(20%)</span>
            </dv-border-box-12>
            <dv-border-box-12>
              <span class=" text-green ">超期已处理：200(20%)</span>
            </dv-border-box-12>
          </dv-border-box-8>
        </div>

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
.head {
  height: vh(120);
  width: 100%;
  display: flex;
}

.borderA {
  height: vh(900);
  width: 100%;
}

.rightSide2 {
  ::v-deep .border-box-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-items: center;
    height: vh(32);
    font-size: vh(12);
    color: white;
    margin-top: 10px;
  }
}
</style>
