<template>
  <div v-if="isActive">
    <h3 class="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      {{ title }} ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas
      donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et
      tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  title: string
  isActive: boolean
}>()
</script>
