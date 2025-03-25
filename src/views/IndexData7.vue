<template>
  <dv-border-box8 class="BorderBox">
    <dv-loading v-if="loading1"></dv-loading>
    <div ref="refecharts" class="interior" v-else></div>
  </dv-border-box8>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import { info3 } from './api';

// 定义接口类型
interface ChartData {
  code: number;
  data: {
    [key: string]: number;
  };
}

// 定义响应式变量
const loading1 = ref(true);
const refecharts = ref<HTMLElement | null>(null);
const myChart = ref<echarts.ECharts | null>(null); // 保存图表实例
let intervalId: number | null = null; // 保存定时器ID

// 初始化图表
const echartsfun = (value: ChartData) => {
  if (!refecharts.value) {
    console.error('DOM 元素未找到');
    return;
  }

  // 如果图表实例已存在，先销毁
  if (myChart.value) {
    myChart.value.dispose();
  }

  // 创建新的图表实例
  myChart.value = echarts.init(refecharts.value);
  const option = {
    xAxis: {
      type: 'category',
      data: Object.keys(value.data),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: Object.values(value.data),
        type: 'bar',
      },
    ],
  };

  if (option) {
    myChart.value.setOption(option);
  }
};

// 获取数据
const getdata = async () => {
  try {
    const { data } = await info3();
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
  intervalId = setInterval(() => {
    getdata();
  }, 3000);
});

// 在组件卸载前清除定时器和图表实例
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (myChart.value) {
    myChart.value.dispose();
  }
});
</script>

<style lang="scss" scoped>
/*
 直接使用 vw 和 vh 函数，将像素值传进去，得到的就是具体的 vw vh 单位
 */
.interior {
  width: 100%;
  height: 100%;
  font-size: vh(16);
  margin-left: vw(10);
  margin-top: vh(10);
}

.BorderBox {
  width: vw(450);
  height: vh(400);
  max-width: 100%; // 限制最大宽度
  max-height: 100%; // 限制最大高度
}
</style>