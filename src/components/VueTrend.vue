<template>
  <svg v-if="data && data.length >= 2" :width :height :viewBox="`0 0 ${viewWidth} ${viewHeight}`">
    <TrendGradient :id="gradientId" :gradient="gradient" :gradient-direction="gradientDirection" />
    <TrendPath
      ref="pathRef"
      :data="data"
      :boundary="boundary"
      :smooth="smooth"
      :radius="radius"
      :id="gradientId"
      :max="max"
      :min="min"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { type Boundary, type InputData } from '../helpers/path'
import TrendGradient, { type GradientDirection } from './TrendGradient.vue'
import TrendPath from './TrendPath.vue'

export interface Props {
  data: InputData[]
  autoDraw?: boolean
  autoDrawDuration?: number
  autoDrawEasing?: string
  gradient?: string[]
  gradientDirection?: GradientDirection
  max?: number
  min?: number
  height?: number | string
  width?: number | string
  viewHeight?: number
  viewWidth?: number
  padding?: number
  radius?: number
  smooth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoDraw: false,
  autoDrawDuration: 2000,
  autoDrawEasing: 'ease',
  gradient: () => ['#000'], // Default factory for array
  gradientDirection: 'top',
  max: -Infinity,
  min: Infinity,
  height: '100%',
  width: '100%',
  viewHeight: 75,
  viewWidth: 300,
  padding: 8,
  radius: 10,
  smooth: false
  // Default width/height handled in computed properties if not provided
})

// Template refs
// Specify the component type for better type checking
const pathRef = ref<InstanceType<typeof TrendPath> | null>(null)

// Unique ID for gradient
const gradientId = computed(() => `vue-trend-${Math.random().toString(36).substring(7)}`)

const boundary = computed<Boundary>(() => ({
  minX: props.padding,
  minY: props.padding,
  maxX: props.viewWidth - props.padding,
  maxY: props.viewHeight - props.padding
}))

// Auto-draw animation logic
const lastLength = ref<number>(0) // Store the last path length for smooth transitions

watch(
  () => props.data,
  async (newData, oldData) => {
    // Ensure data is actually new and autoDraw is enabled
    // Comparing stringified versions is a simple way to check deep equality for basic data structures
    if (props.autoDraw && JSON.stringify(newData) !== JSON.stringify(oldData)) {
      await nextTick() // Wait for the DOM to update

      // Check if running in server environment or if pathRef is not yet available
      if (typeof window === 'undefined' || !pathRef.value?.$el) {
        return
      }

      const pathElement = pathRef.value.$el as SVGPathElement // Type assertion
      const length = pathElement.getTotalLength()

      if (!isNaN(length)) {
        // Ensure length is a valid number
        pathElement.style.transition = 'none'
        pathElement.style.strokeDasharray = `${length} ${length}`
        // Use lastLength.value for the offset, default to 0 if it's the first draw
        pathElement.style.strokeDashoffset = Math.abs(length - (lastLength.value || 0)).toString()

        // Force reflow to apply the initial state before transition
        pathElement.getBoundingClientRect()

        // Apply the transition
        pathElement.style.transition = `stroke-dashoffset ${props.autoDrawDuration}ms ${props.autoDrawEasing}`
        pathElement.style.strokeDashoffset = '0'

        lastLength.value = length // Update last length
      } else {
        console.warn('VueTrend: Could not get path length for autoDraw animation.')
      }
    } else if (!props.autoDraw && pathRef.value?.$el) {
      // Reset styles if autoDraw is turned off
      const pathElement = pathRef.value.$el as SVGPathElement
      pathElement.style.transition = ''
      pathElement.style.strokeDasharray = ''
      pathElement.style.strokeDashoffset = ''
      lastLength.value = 0 // Reset last length
    }
  },
  {
    immediate: true, // Run the watcher immediately on component mount
    deep: true // Watch for changes within the data array/objects
  }
)
</script>
