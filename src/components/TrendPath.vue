<template>
  <path :d="pathData" fill="none" :stroke="strokeUrl" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { genPath, genPoints, type Boundary, type InputData } from '../helpers/path'

export interface Props {
  data: InputData[]
  boundary: Boundary
  id: string
  smooth?: boolean
  radius?: number
  max?: number
  min?: number
}

const props = withDefaults(defineProps<Props>(), {
  smooth: false,
  radius: 10,
  max: -Infinity,
  min: Infinity
})

// Computed property for the path data 'd' attribute
const pathData = computed(() => {
  if (!props.data || props.data.length < 2) {
    return '' // Return empty path if data is insufficient
  }
  const points = genPoints(props.data, props.boundary, { max: props.max, min: props.min })
  return genPath(points, props.smooth ? props.radius : 0)
})

// Computed property for the stroke URL
const strokeUrl = computed(() => `url(#${props.id})`)
</script>
