<template>
  <dv-border-box8 class="BorderBox">
    <div class="box">
      <dv-loading v-if="loading1"></dv-loading>
      <div ref="refecharts" class="interior" v-else></div>
    </div>
  </dv-border-box8>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption, ECharts } from 'echarts';
import { info3 } from './api';

// 定义接口类型 - 图表数据结构
interface ChartData {
  code: number;          // 状态码
  data: {
    [key: string]: number; // 键值对数据，表示不同类别及其数值
  };
}

// 定义响应式变量
const loading1 = ref(true);          // 加载状态
const refecharts = ref<HTMLElement | null>(null);  // ECharts DOM引用
const myChart = ref<ECharts | null>(null); // 图表实例
let intervalId: number | null = null; // 定时器ID
const animationDuration = 1000; // 动画持续时间(ms)

// 初始化图表 - 动态排序条形图
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

  // 准备数据 - 转换为数组并排序
  const sourceData = Object.entries(value.data)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // 降序排列

  // 提取类别名称和数值
  const categories = sourceData.map(item => item.name);
  const values = sourceData.map(item => item.value);

  // 定义正确的颜色渐变函数类型
  const getItemColor = (dataIndex: number) => {
    const colorList = [
      ['#67C23A', '#95DE64'],
      ['#409EFF', '#69C0FF'],
      ['#E6A23C', '#FFD666'],
      ['#F56C6C', '#FF9E9E']
    ];
    const index = dataIndex % colorList.length;
    return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: colorList[index][0] },
      { offset: 1, color: colorList[index][1] }
    ]);
  };

  // 图表配置项，使用正确的类型
  const option: EChartsOption = {
    title: {
      text: '超期物料处理状态对比',//标题
      left: 'center',
      textStyle: {
        color: '#FFFFFFFF',
        fontSize: 18
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        interval: 0
      },
      animationDuration: animationDuration,
      animationDurationUpdate: animationDuration
    },
    series: [{
      name: '数值',
      type: 'bar',
      data: values,
      label: {
        show: true,
        position: 'right',
        formatter: '{c}'
      },
      itemStyle: {
        color: (params) => getItemColor(params.dataIndex),
        borderRadius: [0, 4, 4, 0]
      },
      animationDuration: animationDuration,
      animationDurationUpdate: animationDuration,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    }],
    animationDuration: animationDuration,
    animationDurationUpdate: animationDuration,
    animationEasing: 'linear' as const,
    animationEasingUpdate: 'linear' as const
  };

  // 设置图表选项
  if (option) {
    myChart.value?.setOption(option);
  }

  // 模拟数据变化，实现动态排序效果
  const updateChart = () => {
    // 随机修改部分数据
    const newData = [...sourceData];
    const randomIndex = Math.floor(Math.random() * newData.length);
    newData[randomIndex].value = Math.round(newData[randomIndex].value * (0.9 + Math.random() * 0.2));

    // 重新排序
    newData.sort((a, b) => b.value - a.value);

    // 更新图表
    myChart.value?.setOption({
      yAxis: {
        data: newData.map(item => item.name)
      },
      series: [{
        data: newData.map(item => item.value)
      }]
    } as EChartsOption);
  };

  // 启动定时器模拟数据变化
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(updateChart, 3000);
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

// 组件挂载时获取数据
onMounted(() => {
  getdata();
});

// 组件卸载前清除定时器和图表实例
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
.interior {
  width: 90%;
  height: 90%;
  font-size: vh(16);
  align-items: center !important;
  justify-content: center !important;
}

.box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
}

.BorderBox {
  width: vw(450);
  height: vh(300);
  max-width: 100%; // 限制最大宽度
  max-height: 100%; // 限制最大高度
  align-items: center !important;
  justify-content: center !important;
}
</style>