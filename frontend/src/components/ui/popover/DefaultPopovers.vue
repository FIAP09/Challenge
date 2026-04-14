<template>
  <div class="max-w-full overflow-auto custom-scrollbar sm:overflow-visible">
    <div class="min-w-[750px]">
      <div class="flex flex-col flex-wrap items-center gap-4 sm:flex-row sm:gap-5">
        <Popover position="top">
          <template #trigger>
            <Button size="sm"> Top Popover </Button>
          </template>
          <!-- Popover Header -->
          <div
            class="relative rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]"
          >
            <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">Popover Title</h4>
          </div>
          <!-- Popover Body -->
          <div class="p-5">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consect adipiscing elit. Mauris facilisis congue exclamate
              justo nec facilisis.
            </p>
          </div>
        </Popover>

        <Popover position="right">
          <template #trigger>
            <Button size="sm"> Right Popover </Button>
          </template>
          <!-- Popover Header -->
          <div
            class="relative rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]"
          >
            <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">Popover Title</h4>
          </div>
          <!-- Popover Body -->
          <div class="p-5">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consect adipiscing elit. Mauris facilisis congue exclamate
              justo nec facilisis.
            </p>
          </div>
        </Popover>

        <Popover position="bottom">
          <template #trigger>
            <Button size="sm"> Bottom Popover </Button>
          </template>
          <!-- Popover Header -->
          <div
            class="relative rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]"
          >
            <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">Popover Title</h4>
          </div>
          <!-- Popover Body -->
          <div class="p-5">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consect adipiscing elit. Mauris facilisis congue exclamate
              justo nec facilisis.
            </p>
          </div>
        </Popover>

        <Popover position="left">
          <template #trigger>
            <Button size="sm"> Left Popover </Button>
          </template>
          <!-- Popover Header -->
          <div
            class="relative rounded-t-xl border-b border-gray-200 px-5 py-3 dark:border-white/[0.03]"
          >
            <h4 class="text-base font-semibold text-gray-800 dark:text-white/90">Popover Title</h4>
          </div>
          <!-- Popover Body -->
          <div class="p-5">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consect adipiscing elit. Mauris facilisis congue exclamate
              justo nec facilisis.
            </p>
          </div>
        </Popover>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '../Button.vue'
import Popover from './Popover.vue'
</script>
