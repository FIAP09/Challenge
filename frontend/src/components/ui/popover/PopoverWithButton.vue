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
            <div class="flex items-center gap-3 mt-5">
              <button
                type="button"
                class="flex justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
              >
                Yes! got it
              </button>

              <button
                type="button"
                class="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                Learn more
              </button>
            </div>
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
            <div class="flex items-center gap-3 mt-5">
              <button
                type="button"
                class="flex justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
              >
                Yes! got it
              </button>

              <button
                type="button"
                class="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                Learn more
              </button>
            </div>
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
            <div class="flex items-center gap-3 mt-5">
              <button
                type="button"
                class="flex justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
              >
                Yes! got it
              </button>

              <button
                type="button"
                class="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                Learn more
              </button>
            </div>
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
            <div class="flex items-center gap-3 mt-5">
              <button
                type="button"
                class="flex justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
              >
                Yes! got it
              </button>

              <button
                type="button"
                class="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                Learn more
              </button>
            </div>
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
