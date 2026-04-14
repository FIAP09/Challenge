<template>
  <div>
    <h3 class="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
      {{ tab.label }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400">{{ tab.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface TabData {
  id: string
  label: string
  content: string
  count?: number
}

defineProps<{
  tab: TabData
}>()
</script>
