<template>
  <div class="chart-with-table">
    <!-- 标题 -->
    <h3 class="chart-title">{{ title }}</h3>

    <!-- 图表 -->
    <div ref="chartRef" class="chart" />

    <!-- 表格 -->
    <div class="table-container">
      <div class="table-header">
        <span>Key</span>
        <span>Value</span>
      </div>
      <div class="table-body">
        <div v-for="(value, key) in keyValueData" :key="key" class="table-row">
          <span class="table-cell">{{ key }}</span>
          <span class="table-cell">{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const { title, chartData, keyValueData } = defineProps<{
  title: string
  chartData: unknown[]
  keyValueData: Record<string, unknown>
}>()

const chartRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (chartRef.value) {
    const myChart = echarts.init(chartRef.value);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#ffffff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: chartData, // 使用传入的图表数据
        },
      ],
    };

    myChart.setOption(option);

    let currentIndex = -1;
    setInterval(() => {
      const dataLen = chartData.length;

      // 取消之前的高亮
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });

      // 更新索引
      currentIndex = (currentIndex + 1) % dataLen;

      // 高亮当前项
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });

      // 显示 tooltip
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex,
      });
    }, 1500); // 每2秒轮播一次
  }
});
</script>

<style scoped>
.chart-with-table {
  width: 100%;
  margin: 20px 0;
}

.chart-title {
  text-align: center;
  margin-bottom: 15px;
}

.chart {
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
}

.table-container {
  margin-top: 20px;
  width: 100%;
}

.table-header {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background-color: #f0f0f0;
  font-weight: bold;
}

.table-body {
  padding: 8px;
}

.table-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid #ddd;
}

.table-cell {
  padding: 4px;
}
</style>
