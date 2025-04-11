<template>
  <div class=" w-full my-2 py-5 px-2 flex justify-center flex-col items-center border-2 border-solid ">
    <!-- 标题 -->
    <h1 class=" text-center mb-15px text-white">{{ title }}</h1>

    <!-- 图表 -->
    <div ref="chartRef" class="w-full vh-400 mb-15px justify-center items-center"></div>

    <!-- 表格 -->
    <div class=" mt-2 w-full mx-2">
      <div class="font-bold p-1 flex  items-center justify-center border-2 border-solid border-black text-white">统计信息
      </div>
      <div v-for="(value, key) in keyValueData" :key="key"
        class=" flex justify-between border-1 border-solid border-black">
        <!-- 左侧 key -->
        <div class="h-30px w-50% border-1 border-solid border-black flex items-center text-white">
          <span class=" ml-1">{{ key }}</span>
        </div>
        <!-- 右侧 value -->
        <div
          class=" h-30px w-50% border-1 border-solid border-black flex items-center justify-center text-right text-white">
          <span>{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';

const { title, chartData, keyValueData } = defineProps<{
  title: string
  chartData: unknown[]
  keyValueData: Record<string, unknown>
}>()

const chartRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!chartRef.value) return;

  const myChart = echarts.init(chartRef.value);
  let intervalId: number | null = null;
  let currentIndex = -1;
  let isPaused = false;

  const option = {
    // 提示框配置
    tooltip: {
      trigger: 'item',
      confine: true, // 强制 tooltip 不超出容器边界
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      top: '5%',
      left: 'center',
      itemStyle: {
        borderRadius: 5, // 饼图区块的圆角半径
        borderColor: '#ffffff', // 区块边框颜色
        borderWidth: 2, // 区块边框宽度
      },
      textStyle: {
        color: '#ffffff',
      }
    },
    // 系列列表，每个系列通过 type 决定自己的图表类型
    series: [
      {
        name: '超期天数', // 系列名称，用于提示框显示和图例筛选
        type: 'pie', // 图表类型，这里是饼图
        top: '20%',
        // 饼图的半径配置，['40%', '70%']表示内半径40%，外半径70%，形成环形图效果
        radius: ['40%', '70%'],
        // 是否避免标签重叠，默认为true，这里设为false可能为了特定布局需求
        avoidLabelOverlap: true,
        // 图形样式配置
        itemStyle: {
          borderRadius: 5, // 饼图区块的圆角半径
          borderColor: '#ffffff', // 区块边框颜色
          borderWidth: 2, // 区块边框宽度
        },
        color: ['#73C0DE', '#0B4FB4', '#FAC858', '#D037F7', '#EE6666'],
        // 标签配置
        label: {
          show: false, // 默认不显示标签
          position: 'center', // 标签位置居中
        },
        // 高亮状态下的样式配置
        emphasis: {
          label: {
            show: true, // 高亮时显示标签
            fontSize: 20, // 标签字体大小
            fontWeight: 'bold', // 标签字体粗细
          },
        },
        // 标签的视觉引导线配置
        labelLine: {
          show: true, // 不显示视觉引导线
        },
        data: chartData,
      },
    ],
  };

  myChart.setOption(option);

  const clearCurrent = () => {
    if (currentIndex >= 0 && currentIndex < chartData.length) {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
      myChart.dispatchAction({
        type: 'hideTip',
      });
    }
  };

  const highlightNext = () => {
    if (isPaused || chartData.length === 0) return;

    clearCurrent();

    currentIndex = (currentIndex + 1) % chartData.length;

    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: currentIndex,
    });
  };

  const startLoop = () => {
    if (intervalId === null) {
      intervalId = window.setInterval(highlightNext, 5000);
    }
  };

  const stopLoop = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // 鼠标悬停暂停
  const handleMouseOver = () => {
    isPaused = true;
    stopLoop();
    clearCurrent();
  };

  // 鼠标移出继续循环
  const handleMouseOut = () => {
    isPaused = false;
    startLoop();
    highlightNext(); // 立即切换一次，避免等待5秒
  };

  myChart.getZr().on('mouseover', handleMouseOver);
  myChart.getZr().on('mouseout', handleMouseOut);

  // 初始化启动循环
  startLoop();

  onUnmounted(() => {
    stopLoop();
    myChart.getZr().off('mouseover', handleMouseOver);
    myChart.getZr().off('mouseout', handleMouseOut);
    myChart.dispose();
  });
});
</script>

<style scoped></style>
