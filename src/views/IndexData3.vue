<template>
  <dv-loading v-if="loading1"></dv-loading>
  <div ref="refecharts" class="interior" v-else></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { info2 } from './api';

// 定义接口类型
interface ChartData {
  code: number;
  data: {
    value: number;
    name: string;
  }[];
}

// 定义响应式变量
const loading1 = ref(true);
const refecharts = ref<HTMLElement | null>(null);

// 初始化图表
const echartsfun = (value: ChartData) => {
  if (!refecharts.value) {
    console.error('DOM 元素未找到');
    return;
  }

  const myChart = echarts.init(refecharts.value);
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        data: value.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  myChart.setOption(option);
};

// 获取数据
const getdata = async () => {
  try {
    const { data } = await info2();
    if (data.code === 200) {
      loading1.value = false;
      nextTick(() => {
        if (refecharts.value) {
          echartsfun(data);
        }
      });
    }
  } catch (error) {
    console.error('获取数据失败:', error);
    loading1.value = false;
  }
};

// 在组件挂载时获取数据
onMounted(() => {
  getdata();
  setInterval(() => {
    getdata();
  }, 360000);
});
</script>

<style scoped>
.interior {
  height: 230px;
  width: 615px;
}
</style>