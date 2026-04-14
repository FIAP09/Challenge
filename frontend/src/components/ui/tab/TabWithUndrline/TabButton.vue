<template>
  <button
    :class="[
      'inline-flex items-center border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out',
      isActive
        ? 'text-brand-500 dark:text-brand-400 border-brand-500 dark:border-brand-400'
        : 'bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
    ]"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label: string
  isActive: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>
