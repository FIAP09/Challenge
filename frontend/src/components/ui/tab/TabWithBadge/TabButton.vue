<template>
  <button
    :class="[
      'inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out',
      isActive
        ? 'text-brand-500 dark:border-brand-400 border-brand-500 dark:text-brand-400'
        : 'bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
    ]"
    @click="$emit('click')"
  >
    {{ tab.label }}
    <span
      v-if="tab.count !== undefined"
      class="inline-block items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-center text-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400"
    >
      {{ tab.count }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface TabData {
  id: string
  label: string
  content: string
  count?: number
}

defineProps<{
  tab: TabData
  isActive: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>
