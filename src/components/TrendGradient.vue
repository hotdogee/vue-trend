<template>
  <defs>
    <linearGradient :id="props.id" :x1="x1" :y1="y1" :x2="x2" :y2="y2">
      <stop
        v-for="(color, index) in reversedGradient"
        :key="index"
        :offset="calculateOffset(index)"
        :stop-color="color"
      />
    </linearGradient>
  </defs>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Define type alias for gradient direction
export type GradientDirection = 'top' | 'bottom' | 'left' | 'right'

export interface Props {
  gradient?: string[]
  gradientDirection?: GradientDirection
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  gradient: () => ['#000'],
  gradientDirection: 'top'
})

// Compute reversed gradient array for v-for
const reversedGradient = computed(() => {
  // Ensure gradient is always an array, provide default if needed
  return [...props.gradient].reverse() // Use spread syntax for shallow clone before reversing
})

// Calculate gradient direction coordinates
const x1 = computed(() => +(props.gradientDirection === 'left'))
const y1 = computed(() => +(props.gradientDirection === 'top'))
const x2 = computed(() => +(props.gradientDirection === 'right'))
const y2 = computed(() => +(props.gradientDirection === 'bottom'))

// Calculate stop offset
const calculateOffset = (index: number): number => {
  const len = reversedGradient.value.length - 1 || 1
  return index / len
}
</script>
