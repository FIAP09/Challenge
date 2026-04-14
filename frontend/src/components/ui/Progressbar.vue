<template>
  <div :class="['flex items-center', className]">
    <div :class="[baseClasses, sizeClasses[size]]">
      <div
        :class="[progressClasses, { 'flex items-center justify-center': label === 'inside' }]"
        :style="{ width: `${progress}%` }"
      >
        <span
          v-if="label === 'inside'"
          class="absolute inset-0 flex items-center justify-center text-white font-medium text-[10px] leading-tight"
        >
          {{ progress }}%
        </span>
      </div>
    </div>
    <span
      v-if="label === 'outside'"
      class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-400"
    >
      {{ progress }}%
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ProgressBarProps {
  progress: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  label?: 'none' | 'outside' | 'inside'
  className?: string
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  size: 'sm',
  label: 'none',
  className: '',
})

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
  xl: 'h-5',
}

const baseClasses = 'relative w-full bg-gray-200 rounded-full dark:bg-gray-800'
const progressClasses = 'absolute left-0 h-full bg-brand-500 rounded-full'

const sizeClass = computed(() => sizeClasses[props.size])
</script>
