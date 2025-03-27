<template>
  <div class="w-100% h-100% flex justify-between items-center container1">
    <dv-border-box10 class="box">
      <div class="flex flex-row items-center h-100%">
        <span class="head-text">当前仓库：</span>
        <el-select v-model="value" placeholder="仓库" size="small" class=" sbu-select">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </dv-border-box10>
    <dv-border-box10 class="box">
      <div class="flex flex-row items-center h-100%">
        <span class="head-text">报表时间：</span>
        <el-date-picker v-model="value1" type="daterange" range-separator="To" start-placeholder="Start date"
          end-placeholder="End date" size="small" />
      </div>
    </dv-border-box10>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('SBU4')
const value1 = ref('')
const options = [
  {
    value: 'SBU1',
    label: 'SBU1',
  },
  {
    value: 'SBU2',
    label: 'SBU2',
  },
  {
    value: 'SBU3',
    label: 'SBU3',
  },
  {
    value: 'SBU4',
    label: 'SBU4',
  },
  {
    value: 'SBU5',
    label: 'SBU5',
  },
  {
    value: 'SBU8',
    label: 'SBU8',
  },
]

</script>

<style lang="scss" scoped>
.container1 {
  margin-top: vh(50);
}

.sbu-select {
  width: vw(100);
}

.box {
  width: auto;
  height: vh(40);
  padding: 0 vh(10);
  margin-left: vw(20);
  margin-right: vw(20);
}

.head-text {
  font-size: vh(16);
  font-weight: bold;
  color: white;
}
</style>