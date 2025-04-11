<template>
  <div class="bg-[#0071FE70] h-full flex flex-row">
    <ChartWithTable class="mx-1" v-for="(item, index) in chartDataList" :key="index" :title="item.title"
      :chartData="item.data" :keyValueData="item.keyValueData" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { infopie } from './api';
import type { ChartItem } from '../types/types';
import ChartWithTable from '../components/ChartWithTable.vue'

const chartDataList = ref<ChartItem[]>([]);

const getdata = async () => {
  try {
    const res = await infopie();
    if (res.data.code === 200) {
      chartDataList.value = res.data.data;
    }
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

onMounted(() => {
  getdata();
});
</script>