<template>
  <div class="h-screen overflow-y-auto w-300px" ref="scrollContainer" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <div class="p-10px">
      <div v-for="(item, index) in cards" :key="item.id"
        class="card-item  h-60px mb-10px p-15px rounded-6px cursor-pointer transition-all duration-300 border-5 bg-white/40"
        :class="{
          'border-green border-5px !bg-green/50 translate-x-5px shadow-md':
            selectedIndex === index,
          'border-gray-500 bg-white/50 translate-x-2px':
            hoverIndex === index && selectedIndex !== index,
          'border-gray-300':
            selectedIndex !== index && hoverIndex !== index
        }" @click="selectCard(index)" @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = -1">
        <slot name="card" :item="item">
          <h3 class="m-0 mb-2 text-base font-medium text-white">{{ item.title }}</h3>
          <p class="m-0 text-sm text-white">{{ item.description }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface CardItem {
  id: string | number
  title: string
  description: string
  [key: string]: unknown
}

const props = defineProps<{
  cards: CardItem[]
  interval?: number
}>()

const selectedIndex = ref(0)
const hoverIndex = ref(-1)
const scrollContainer = ref<HTMLElement | null>(null)

let timer: number | null = null
let resumeTimeout: number | null = null
const allowAutoScroll = ref(true)

const selectCard = (index: number) => {
  selectedIndex.value = index
  if (!scrollContainer.value || !allowAutoScroll.value) return

  const container = scrollContainer.value
  const cards = container.querySelectorAll('.card-item')
  if (index >= 0 && index < cards.length) {
    const card = cards[index] as HTMLElement
    const cardTop = card.offsetTop
    const cardHeight = card.offsetHeight
    const containerHeight = container.clientHeight

    container.scrollTo({
      top: Math.max(cardTop - containerHeight / 2 + cardHeight / 2, 0),
      behavior: 'smooth'
    })
  }
}

const autoSelectNext = () => {
  const nextIndex = (selectedIndex.value + 1) % props.cards.length
  selectCard(nextIndex)
}

const startTimer = () => {
  stopTimer()
  if (props.interval && allowAutoScroll.value) {
    timer = window.setInterval(autoSelectNext, props.interval)
  }
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// 触发后暂停跳转，10秒无操作后恢复跳转
const handleUserActivity = () => {
  stopTimer()
  allowAutoScroll.value = false

  // 重置计时器
  if (resumeTimeout) clearTimeout(resumeTimeout)
  resumeTimeout = window.setTimeout(() => {
    allowAutoScroll.value = true
    startTimer()
  }, 10000)
}

const handleMouseEnter = () => stopTimer()
const handleMouseLeave = () => {
  if (allowAutoScroll.value) startTimer()
}

onMounted(() => {
  if (props.cards.length > 0) {
    selectCard(0)
    startTimer()
  }

  // 监听全局点击和移动
  window.addEventListener('mousemove', handleUserActivity)
  window.addEventListener('mousedown', handleUserActivity)
})

onBeforeUnmount(() => {
  stopTimer()
  if (resumeTimeout) clearTimeout(resumeTimeout)
  window.removeEventListener('mousemove', handleUserActivity)
  window.removeEventListener('mousedown', handleUserActivity)
})
</script>

<style>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 100, 100, 0.8);
}
</style>
