<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    currentValue: number | string  // 当前值（必传）
    percentage: number            // 百分比（0-100，必传）
    borderSize?: string           // 边框大小（如：border、border-2）
    borderColor?: string          // 边框颜色（如：border-gray-300）
    barColor?: string             // 进度条颜色（如：bg-blue-500）
    height?: string               // 进度条高度（如：h-4）
    showValue?: boolean           // 是否显示数值
    showPercentage?: boolean      // 是否显示百分比
  }>(),
  {
    borderSize: 'border',
    borderColor: 'border-gray-300',
    barColor: 'bg-blue-500',
    height: 'h-4',
    showValue: true,
    showPercentage: true,
  }
)

// 确保百分比在0-100范围内
const displayPercentage = computed(() => {
  return Math.min(100, Math.max(0, props.percentage))
})

// 获取进度条颜色类名
const barColorClass = computed(() => {
  return props.barColor.startsWith('bg-') ? props.barColor : `bg-${props.barColor}`
})

// 获取文本颜色类名（基于进度条颜色）
const textColorClass = computed(() => {
  const baseColor = props.barColor.startsWith('bg-')
    ? props.barColor.replace('bg-', 'text-')
    : `text-${props.barColor}`
  return baseColor
})
</script>

<template>
  <div class="w-full">
    <!-- 进度条容器（带边框） -->
    <div class="rounded-full bg-gray-200 overflow-hidden box-border" :class="[borderSize, borderColor, height]">
      <!-- 进度条 -->
      <div class="h-full rounded-full transition-all duration-300 flex items-center justify-end box-border"
        :class="barColorClass" :style="{ width: `${displayPercentage}%` }">
        <!-- 内部文本（可选） -->
        <span v-if="(showValue || showPercentage) && displayPercentage > 15"
          class="text-white text-xs px-2 font-medium">
          <template v-if="showValue">{{ currentValue }}</template>
          <template v-if="showValue && showPercentage">(</template>
          <template v-if="showPercentage">{{ Math.round(displayPercentage) }}%)</template>
        </span>
      </div>
    </div>

    <!-- 外部文本（当进度条太窄时显示在外部） -->
    <div v-if="(showValue || showPercentage) && displayPercentage <= 15" class="text-xs mt-1 flex gap-1"
      :class="textColorClass">
      <template v-if="showValue">{{ currentValue }}</template>
      <template v-if="showValue && showPercentage">(</template>
      <template vif="showPercentage">{{ Math.round(displayPercentage) }}%)</template>
    </div>
  </div>
</template>