<template>
  <div class="bg-sky h-full">
    <!-- 使用多个图表组件 -->
    <ChartWithTable v-for="(data, index) in chartDataList" :key="index" :title="data.title" :chartData="data.data"
      :keyValueData="data.keyValueData" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ChartWithTable from '../components/ChartWithTable.vue';

// 图表数据
const chartDataList = ref([
  {
    title: 'Chart 1',
    data: [{ value: 1048, name: 'Search Engine' }, { value: 735, name: 'Direct' }],
    keyValueData: { Name: 'John Doe', Age: 30, Gender: 'Male', Occupation: 'Developer' },
  },
  {
    title: 'Chart 2',
    data: [{ value: 580, name: 'Email' }, { value: 484, name: 'Union Ads' }],
    keyValueData: { Product: 'Laptop', Price: '$999', Brand: 'BrandX', Stock: 'Available' },
  },
  {
    title: 'Chart 3',
    data: [{ value: 300, name: 'Video Ads' }, { value: 150, name: 'Social Media' }],
    keyValueData: { Country: 'USA', Population: '331 million', Area: '9.8 million km²', Currency: 'USD' },
  },
  {
    title: 'Chart 4',
    data: [{ value: 900, name: 'Search Engine' }, { value: 400, name: 'Direct' }],
    keyValueData: { Car: 'Tesla Model S', Year: '2022', Price: '$80,000', Mileage: '500 miles' },
  },
  {
    title: 'Chart 5',
    data: [{ value: 1200, name: 'Email' }, { value: 650, name: 'Union Ads' }],
    keyValueData: { City: 'New York', Population: '8.4 million', Area: '789 km²', Timezone: 'EST' },
  },
  {
    title: 'Chart 6',
    data: [{ value: 800, name: 'Social Media' }, { value: 500, name: 'Direct' }],
    keyValueData: { Sport: 'Football', Teams: '32', Countries: '200+', Popularity: 'Global' },
  }
]);
</script>

<style scoped>
.bg-sky {
  background-color: #87ceeb;
  min-height: 100vh;
  padding: 20px;
}
</style>
