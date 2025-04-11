<template>
  <dv-border-box13 class="vw-450 vh-340 max-w100% max-h100% mt-2">
    <dv-loading v-if="loading1"></dv-loading>
    <div ref="refecharts" class="w-95% h-95% text-vh-16" v-else></div>
  </dv-border-box13>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import { infopie } from '../api';

// 定义接口类型 - 图表数据结构
// 状态码
interface ChartData {
  code: number;
  data: {
    [key: string]: number; // 键值对数据，表示不同来源及其数值
  };
}

// 定义响应式变量
const loading1 = ref(true);          // 加载状态
const refecharts = ref<HTMLElement | null>(null);  // ECharts DOM引用
const myChart = ref<echarts.ECharts | null>(null); // 图表实例
let intervalId: number | null = null; // 定时器ID

// 初始化图表 - 网站流量来源图表
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

  // 准备数据 - 转换为ECharts需要的格式
  const data = Object.entries(value.data).map(([name, value]) => ({
    value,
    name
  }));

  // 图表配置项
  const option = {
    title: {
      show: true,
      text: '超期天数区间占比',  // 图表标题
      left: 'center',
      top: 15,
      padding: 5,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 18,
      }
    },
    tooltip: {//悬停提示
      trigger: 'item',     // 触发类型为数据项
      formatter: '{a}<br/>{b}: {c} ({d}%)'  // 提示框格式'{a}<br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',   // 图例排列
      bottom: 0,
      data: Object.keys(value.data),  // 图例数据
      textStyle: {
        color: '#FFFFFF',
        fontSize: 15,
      }
    },
    series: [
      {
        name: '超期天数',   // 系列名称
        type: 'pie',       // 饼图类型
        radius: '50%',     // 饼图半径
        center: ['50%', '50%'],  // 饼图位置
        data: data,        // 数据
        label: {           // 标签设置
          show: true,
          formatter: '{b}（{d}%）',
          color: '#FFFFFF',
          fontSize: 10,
        },
        emphasis: {        // 高亮样式
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: {      // 图形样式
          borderRadius: 5,  // 圆角
          borderColor: '#ffffff',  // 边框颜色
          borderWidth: 1    // 边框宽度
        }
      }
    ],
  };

  // 设置图表选项
  if (option) {
    myChart.value.setOption(option);
  }

  // 窗口大小改变时重新调整图表大小
  window.addEventListener('resize', () => {
    myChart.value?.resize();
  });
};

// 获取数据
const getdata = async () => {
  try {
    const { data } = await infopie();
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

// 组件挂载时获取数据
onMounted(() => {
  getdata();
  // 设置10秒自动刷新
  intervalId = setInterval(() => {
    getdata();
  }, 10000);
});

// 组件卸载前清除定时器和图表实例
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (myChart.value) {
    myChart.value.dispose();
  }
  // 移除窗口大小改变事件监听
  window.removeEventListener('resize', () => {
    myChart.value?.resize();
  });
});
</script>

<style lang="scss" scoped>
.interior {
  width: 95%;
  height: 95%;
  font-size: vh(16);
  margin-left: vw(10);
  margin-top: vh(10);
}
</style>
