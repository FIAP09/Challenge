<script setup lang="ts">
import { BoxIcon } from '@/icons'
</script>

<template>
  <div class="max-w-full pb-3 overflow-x-auto custom-scrollbar sm:pb-0">
    <div class="min-w-[393px]">
      <div class="inline-flex items-center shadow-theme-xs">
        <button
          type="button"
          class="inline-flex items-center gap-2 bg-transparent px-4 py-3 text-sm font-medium text-gray-800 ring-1 ring-inset ring-gray-300 transition first:rounded-l-lg last:rounded-r-lg hover:bg-gray-50 dark:bg-white/[0.03] dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-white/[0.03]"
        >
          Button Text
          <BoxIcon />
        </button>
        <button
          type="button"
          class="-ml-px inline-flex items-center gap-2 bg-transparent px-4 py-3 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition first:rounded-l-lg last:rounded-r-lg hover:bg-gray-50 hover:text-gray-800 dark:bg-transparent dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]"
        >
          Button Text
          <BoxIcon />
        </button>
        <button
          type="button"
          class="-ml-px inline-flex items-center gap-2 bg-transparent px-4 py-3 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 transition first:rounded-l-lg last:rounded-r-lg hover:bg-gray-50 hover:text-gray-800 dark:bg-transparent dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]"
        >
          Button Text
          <BoxIcon />
        </button>
      </div>
    </div>
  </div>
</template>
