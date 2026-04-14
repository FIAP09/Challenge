<script setup lang="ts">
import { BoxIcon } from '@/icons'
</script>

<template>
  <div class="max-w-full pb-3 overflow-x-auto custom-scrollbar sm:pb-0">
    <div class="min-w-[393px]">
      <div class="inline-flex items-center shadow-theme-xs">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition bg-brand-500 ring-1 ring-inset ring-brand-500 first:rounded-l-lg last:rounded-r-lg hover:bg-brand-500"
        >
          Button Text
          <BoxIcon />
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-3 -ml-px text-sm font-medium bg-transparent text-brand-500 ring-1 ring-inset ring-brand-500 first:rounded-l-lg last:rounded-r-lg hover:bg-brand-500 hover:text-white"
        >
          Button Text
          <BoxIcon />
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-3 -ml-px text-sm font-medium bg-transparent text-brand-500 ring-1 ring-inset ring-brand-500 first:rounded-l-lg last:rounded-r-lg hover:bg-brand-500 hover:text-white"
        >
          Button Text
          <BoxIcon />
        </button>
      </div>
    </div>
  </div>
</template>
