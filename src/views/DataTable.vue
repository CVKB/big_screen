<template>
  <dv-border-box6 class="containerMain">
    <dv-border-box10 class="containertHead m-a mt-10px items-center justify-center">
      <div>
        <text class="mx-1 text-white text ">批 次:</text>
        <input class="textinput" v-model="input" placeholder="批次" />
        <text class="mx-1 text-white text ml-2">料 号:</text>
        <input class="textinput" v-model="input" placeholder="料号" />
        <text class="mx-1 text-white text ml-2">状 态:</text>
        <input class="textinput" v-model="input" placeholder="状态" />
        <text class="mx-1 text-white text ">供应商:</text>
        <input class="textinput" v-model="input" placeholder="供应商" />
      </div>
      <div class="flex justify-end gap-4 mr-4 mt-2">
        <el-button class="button  ml-50px text-vh-18 vw-50 vh-30">查询</el-button>
        <el-button class="button vw-50 text-vh-18 vh-30">导出</el-button>
        <el-button class="button vw-50 text-vh-18 vh-30">打印</el-button>
      </div>
    </dv-border-box10>
    <div class="containertable items-center justify-center  m-a">
      <dv-scroll-board ref="scrollBoard" :config="config" style="width:100%;height:100%" />
    </div>
  </dv-border-box6>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, nextTick } from 'vue';
import type { ScrollBoard } from '@kjgl77/datav-vue3';
import { info } from './api';

const input = ref('')

const DEFAULT_COLUMN_WIDTH = 80;
const COLUMN_PADDING = 20;
const MAX_COLUMN_WIDTH = 300;

const config = reactive({
  header: ['到期时间', '批次', '物料号', '物料描述', '数量', '位置', '超期天数', '供应商', '供应商名称', '计划重检', '实际重检', '重检结果', '状态描述'],
  data: [],
  index: true,
  headerHeight: 30,
  columnWidth: [] as number[],
  indexHeader: "#",
  oddRowBGC: "#0a273250",
  evenRowBGC: "#0C315250",
  headerBGC: "#1a3a6250",
  align: ['left'],
  waitTime: 2000
});

const scrollBoard = ref<InstanceType<typeof ScrollBoard>>();

// 计算文本宽度
const getTextWidth = (text: string, fontSize: number = 12) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return DEFAULT_COLUMN_WIDTH;

  context.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial`;
  const metrics = context.measureText(text);
  return metrics.width;
};

// 计算合适的列宽
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const calculateColumnWidths = (headers: string[], data: [][]) => {
  const columnWidths = headers.map((header, index) => {
    // 计算表头宽度
    const headerWidth = getTextWidth(header, 14) + COLUMN_PADDING;

    // 计算该列所有数据内容的宽度
    let contentWidth = 0;
    data.forEach(row => {
      const cellText = (row[index] as string | number)?.toString() || '';
      const width = getTextWidth(cellText) + COLUMN_PADDING;
      if (width > contentWidth) {
        contentWidth = width;
      }
    });

    // 取表头宽度和内容宽度的较大值，但不超过最大宽度
    const finalWidth = Math.min(
      Math.max(headerWidth, contentWidth, DEFAULT_COLUMN_WIDTH),
      MAX_COLUMN_WIDTH
    );

    return Math.ceil(finalWidth);
  });
  console.log(columnWidths);
  return columnWidths;
};

// 获取数据
const fetchData = async () => {
  try {
    const { data } = await info();
    if (data.code === 200) {
      config.data = data.data;
      // 计算并设置列宽
      nextTick(() => {
        // config.columnWidth = calculateColumnWidths(config.header, data.data);
      });

      // 如果需要自动更新数据，可以设置定时器
      setTimeout(fetchData, 60000); // 每分钟更新一次
    }
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.containerMain {
  width: vw(800);
  height: vh(550);
}

.containertHead {
  width: vw(780);
  height: vh(100);
}

.containertable {
  width: vw(780);
  height: vh(420);
}

.textinput {
  font-size: vh(18);
  width: vw(120);
  height: vh(30);
}

.text {
  font-size: vh(18);
  width: vw(120);
  height: vh(30);
}
</style>