<template>
  <div class="flex h-screen">
    <!-- 左侧卡片列表 -->
    <CardList :cards="items" :interval="5000" />

    <!-- 右侧六个卡片 -->
    <div class="flex-1 grid grid-rows-3 grid-cols-2 gap-4 p-4 ">
      <div v-for="i in 6" :key="i"
        class="border-2 border-gray-800 border-solid rounded-lg flex items-center justify-center text-xl font-bold text-white">
        卡片 {{ i }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardList from '../components/CardList.vue'

const items = ref([
  { id: 1, title: '2025-04-01', description: '这是一段描述' },
  { id: 2, title: '2025-04-02', description: '这是一段描述' },
  { id: 3, title: '2025-04-03', description: '这是一段描述' },
  { id: 4, title: '2025-04-04', description: '这是一段描述' },
  { id: 5, title: '2025-04-05', description: '这是一段描述' },
  { id: 6, title: '2025-04-06', description: '这是一段描述' },
  { id: 7, title: '2025-04-07', description: '这是一段描述' },
  { id: 8, title: '2025-04-08', description: '这是一段描述' },
  { id: 9, title: '2025-04-09', description: '这是一段描述' },
  { id: 10, title: '2025-04-10', description: '这是一段描述' },
])
</script>
