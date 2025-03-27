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
</style>
