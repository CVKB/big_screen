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
const animationDuration = 1000; // 动画持续时间(ms)

// 初始化图表 - 动态排序条形图
const echartsfun = (value: ChartData) => {
  if (!refecharts.value) {
    console.error('DOM 元素未找到');
    return;
  }
  console.log(value.data);

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

  // 计算最大值，用于动态调整X轴范围
  const maxValue = Math.max(...values);
  // 设置X轴最大值比数据最大值大20%，并向上取整为整数
  const xAxisMax = Math.ceil(maxValue * 1.2);

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
    // 标题配置
    title: {
      text: '物料超期分布', // 主标题文本
      left: 'center',      // 标题水平居中
      textStyle: {         // 标题文本样式
        color: '#FFFFFFFF', // 标题颜色（白色带透明度）
        fontSize: 18       // 标题字体大小
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

    // X轴配置（数值轴）
    xAxis: {
      type: 'value',  // 数值轴类型
      axisLabel: {    // 坐标轴刻度标签
        formatter: '{value}' // 标签格式器，直接显示数值
      },
      max: xAxisMax, // 坐标轴最大值（动态计算得出）
      boundaryGap: ['0%', '30%'], // 坐标轴两端空白策略
      // 第一个参数0%表示起始不留白
      // 第二个参数50%表示末端留50%的空白区
      splitLine: {    // 分隔线配置
        show: true   // 显示网格线（X轴方向）
      }
    },

    // Y轴配置（类目轴）
    yAxis: {
      type: 'category', // 类目轴类型
      data: categories, // 类目数据（物料名称数组）
      axisLabel: {      // 坐标轴刻度标签
        interval: 0,    // 强制显示所有标签（不自动间隔）
        width: 100,     // 标签文本最大宽度（像素）
        overflow: 'truncate', // 文本超出时截断处理
        ellipsis: '...' // 截断时显示的省略符号
      },
      animationDuration: animationDuration,          // 初始动画时长
      animationDurationUpdate: animationDuration   // 数据更新动画时长
    },

    // 系列列表（这里只有一个柱状图系列）
    series: [{
      name: '数值',    // 系列名称（用于提示框和图例）
      type: 'bar',    // 柱状图类型
      data: values,   // 系列数据（对应Y轴类别的数值）
      label: {        // 图形上的文本标签
        show: true,   // 显示标签
        position: 'right', // 标签位置（柱条右侧）
        formatter: '{c}',  // 标签内容格式器（c表示数据值）
        color: '#FFFFFFFF' // 标签文字颜色（白色）
      },
      itemStyle: {     // 图形样式
        // 柱条颜色（使用动态渐变色函数）
        color: (params) => getItemColor(params.dataIndex),
        borderRadius: [0, 4, 4, 0] // 柱条圆角（右上和右下角）
      },
      animationDuration: animationDuration,          // 初始动画时长
      animationDurationUpdate: animationDuration,   // 数据更新动画时长
      animationEasing: 'linear',      // 初始动画缓动效果
      animationEasingUpdate: 'linear' // 更新动画缓动效果
    }],

    // 全局动画配置
    animationDuration: animationDuration,          // 初始动画时长
    animationDurationUpdate: animationDuration,   // 数据更新动画时长
    animationEasing: 'linear' as const,      // 初始动画缓动效果
    animationEasingUpdate: 'linear' as const, // 更新动画缓动效果

    // 提示框配置
    tooltip: {
      trigger: 'axis',      // 触发类型（坐标轴触发）
      axisPointer: {        // 坐标轴指示器配置
        type: 'shadow'      // 阴影指示器类型
      }
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
    newData[randomIndex].value = Math.round(newData[randomIndex].value * (0.9 + Math.random() * 0.2));

    newData.sort((a, b) => b.value - a.value);

    // 计算新的X轴最大值并向上取整
    const newMaxValue = Math.ceil(Math.max(...newData.map(item => item.value)) * 1.2);

    myChart.value?.setOption({
      xAxis: {
        max: newMaxValue // 更新为新的整数最大值
      },
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
  intervalId = setInterval(updateChart, 500);
};

// 获取数据
const getdata = async () => {
  try {
    const { data } = await infotype();
    if (data.code === 200) {
      console.log(data.data);
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