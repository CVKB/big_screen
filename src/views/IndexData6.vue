<template>
  <dv-border-box6 class=" table container">
    <dv-scroll-board ref="scrollBoard" :config="config" style="width:100%;height:100%" />
  </dv-border-box6>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'; // 导入 reactive 和 ref
import type { ScrollBoard } from '@kjgl77/datav-vue3';

// 使用 reactive 创建响应式对象
const config = reactive({
  header: ['列1', '列2', '列3'],
  data: [
    ['<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3'],
    ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
    ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
    ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
    ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
    ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
    ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
    ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
    ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
    ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
    ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
    ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
    ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
    ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
    ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
    ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
    ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
    ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
    ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
    ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
    ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
    ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
    ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
    ['行9列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3'],
  ],
  index: true,
  rowNum: 15,
  headerHeight: 30,
  columnWidth: [50, 100, 100, 100],
  indexHeader: "序号",
  oddRowBGC: "",
  evenRowBGC: "",
  headerBGC: "",
  align: ['center'],
});

const scrollBoard = ref<InstanceType<typeof ScrollBoard>>();
</script>

<style scoped>
.container {
  width: 60vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>