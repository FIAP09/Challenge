<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col space-y-3">
    <RouterLink to="/" class="text-sm font-normal text-gray-500 underline dark:text-gray-400"
      >Primary link</RouterLink
    >
    <RouterLink to="/" class="text-sm font-normal underline text-brand-500"
      >Secondary link</RouterLink
    >
    <RouterLink to="/" class="text-sm font-normal underline text-success-500"
      >Success link</RouterLink
    >
    <RouterLink to="/" class="text-sm font-normal underline text-error-500">Danger link</RouterLink>
    <RouterLink to="/" class="text-sm font-normal underline text-warning-500"
      >Warning link</RouterLink
    >
    <RouterLink to="/" class="text-sm font-normal underline text-blue-light-500"
      >Primary link</RouterLink
    >
    <RouterLink to="/" class="text-sm font-normal text-gray-400 underline">Primary link</RouterLink>
    <RouterLink to="/" class="text-sm font-normal text-gray-800 underline dark:text-white/90"
      >Primary link</RouterLink
    >
  </div>
</template>
