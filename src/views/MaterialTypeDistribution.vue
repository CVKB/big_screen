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
import { infotype } from './api';

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

// 初始化图表 - 基础柱形图
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
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 修改渐变方向为垂直
      { offset: 0, color: colorList[index][0] },
      { offset: 1, color: colorList[index][1] }
    ]);
  };

  // 图表配置项，使用正确的类型
  const option: EChartsOption = {
    // 标题配置
    title: {
      text: '超期物料类型分布图', // 主标题文本
      left: 'center',      // 标题水平居中
      textStyle: {         // 标题文本样式
        color: '#FFFFFF', // 修改为纯白色（去掉透明度）
        fontSize: 18,     // 增大字体大小
        fontWeight: 'bold', // 加粗
      }
    },
    // 图表网格配置
    grid: {
      left: '10%',    // 图表与容器左侧的距离（为Y轴长标签留空间）
      right: '10%',   // 图表与容器右侧的距离（为数值标签留空间）
      bottom: '5%',   // 图表与容器底部的距离
      top: '15%',     // 图表与容器顶部的距离（防止标题与图表重叠）
      containLabel: true // 网格区域是否包含坐标轴的刻度标签
    },
    // X轴配置（类目轴）
    xAxis: {
      type: 'category',  // 类目轴类型
      data: categories,  // 类目数据（物料名称数组）
      axisLabel: {
        color: '#FFFFFF', // 标签颜色
        fontSize: 14,
        interval: 0,     // 强制显示所有标签
      },
      axisTick: {
        alignWithLabel: true // 刻度与标签对齐
      }
    },

    // Y轴配置（数值轴）
    yAxis: {
      type: 'value', // 数值轴类型
      axisLabel: {
        color: '#FFFFFF',
        fontSize: 12,
      },
      boundaryGap: ['0%', '15%'], // 坐标轴两端空白策略
      splitLine: {    // 分隔线配置
        show: true   // 显示网格线（Y轴方向）
      }
    },

    // 系列列表（这里只有一个柱状图系列）
    series: [{
      name: '数值',    // 系列名称（用于提示框和图例）
      type: 'bar',    // 柱状图类型
      data: values,   // 系列数据（对应X轴类别的数值）
      label: {
        show: true,
        position: 'top', // 标签显示在柱子上方
        formatter: '{c}',
        color: '#FFFFFF',
        fontSize: 14,
        backgroundColor: 'rgba(0,0,0,0.7)',
      },
      itemStyle: {     // 图形样式
        color: (params) => getItemColor(params.dataIndex),
        borderRadius: [4, 4, 0, 0] // 柱条圆角（左上和右上角）
      },
      barWidth: '60%' // 控制柱条宽度
    }],
    // 提示框配置
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(50,50,50,0.7)', // 背景色
      borderColor: '#FFFFFF',
      borderWidth: 1,
      textStyle: {
        color: '#FFFFFF',
        fontSize: 12,
        lineHeight: 36
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(150,150,150,0.2)'
        }
      },
    }
  };
  // 设置图表选项
  if (option) {
    myChart.value?.setOption(option);
  }

  // 窗口大小改变时重新调整图表大小
  window.addEventListener('resize', () => {
    myChart.value?.resize();
  });

  // 模拟数据变化，实现动态排序效果
  const updateChart = () => {
    const newData = [...sourceData];
    const randomIndex = Math.floor(Math.random() * newData.length);
    newData[randomIndex].value = Math.round(newData[randomIndex].value * (Math.random() * 0.5 + 0.7));

    newData.sort((a, b) => b.value - a.value);
    myChart.value?.setOption({
      xAxis: {
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
  intervalId = setInterval(updateChart, 5000);
};

// 获取数据
const getdata = async () => {
  try {
    const { data } = await infotype();
    if (data.code === 200) {
     (data.data);
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
  // 移除窗口大小改变事件监听
  window.removeEventListener('resize', () => {
    myChart.value?.resize();
  });
});
</script>

<style lang="scss" scoped>
.interior {
  width: 90%;
  height: 90%;
  font-size: vh(16);
  align-items: center;
  justify-content: center;
}

.box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.BorderBox {
  width: 45%;
  height: vh(300);
  max-width: 100%; // 限制最大宽度
  max-height: 100%; // 限制最大高度
  align-items: center;
  justify-content: center;
}
</style>