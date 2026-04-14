<template>
  <div class="flex flex-col space-y-3">
    <RouterLink to="/" class="text-sm font-normal text-gray-500 dark:text-gray-400"
      >Primary link</RouterLink
    >
    <RouterLink to="/" class="text-sm font-normal text-brand-500 dark:text-brand-500"
      >Secondary link</RouterLink
    >
    <RouterLink to="/" class="text-sm font-normal text-success-500">Success link</RouterLink>
    <RouterLink to="/" class="text-sm font-normal text-error-500">Danger link</RouterLink>
    <RouterLink to="/" class="text-sm font-normal text-warning-500">Warning link</RouterLink>
    <RouterLink to="/" class="text-sm font-normal text-blue-light-500">Primary link</RouterLink>
    <RouterLink to="/" class="text-sm font-normal text-gray-400">Primary link</RouterLink>
    <RouterLink to="/" class="text-sm font-normal text-gray-800 dark:text-white/90"
      >Primary link</RouterLink
    >
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
</script>
