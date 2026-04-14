<template>
  <div class="flex flex-col space-y-3">
    <RouterLink
      to="/"
      class="text-sm font-normal text-gray-500 transition-colors hover:text-gray-500/10 dark:hover:text-gray-400/10"
    >
      Link opacity 10
    </RouterLink>
    <RouterLink
      to="/"
      class="text-sm font-normal text-gray-500 transition-colors hover:text-gray-500/25 dark:hover:text-gray-400/25"
    >
      Link opacity 25
    </RouterLink>
    <RouterLink
      to="/"
      class="text-sm font-normal text-gray-500 transition-colors hover:text-gray-500/50 dark:hover:text-gray-400/50"
    >
      Link opacity 50
    </RouterLink>
    <RouterLink
      to="/"
      class="text-sm font-normal text-gray-500 transition-colors hover:text-gray-500/75 dark:hover:text-gray-400/75"
    >
      Link opacity 75
    </RouterLink>
    <RouterLink
      to="/"
      class="text-sm font-normal text-gray-500 transition-colors dark:hover:text-gray-400/100"
    >
      Link opacity 50
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
