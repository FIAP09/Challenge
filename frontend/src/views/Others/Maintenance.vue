<template>
  <div
    class="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1"
  >
    <common-grid-shape />

    <div>
      <div class="mx-auto w-full max-w-[274px] text-center sm:max-w-[555px]">
        <div class="mx-auto mb-10 w-full max-w-[155px] text-center sm:max-w-[204px]">
          <img
            src="/images/error/maintenance.svg"
            alt="maintenance"
            class="dark:hidden"
          />
          <img
            src="/images/error/maintenance-dark.svg"
            alt="maintenance"
            class="hidden dark:block"
          />
        </div>

        <h1 class="mb-2 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
          MAINTENANCE
        </h1>

        <p class="mt-6 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
          Our Site is Currently under maintenance We will be back Shortly Thank You For Patience
        </p>

        <router-link
          to="/"
          class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          Back to Home Page
        </router-link>
      </div>
      <!-- Footer -->
      <p
        class="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400"
      >
        &copy; {{ currentYear }} - TailAdmin
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CommonGridShape from '../../components/common/CommonGridShape.vue'
const currentYear = ref(new Date().getFullYear())

// Optional: Update the year when the component mounts
// This is useful if your app stays open across year boundaries
onMounted(() => {
  setInterval(() => {
    currentYear.value = new Date().getFullYear()
  }, 60000) // Check every minute
})
</script>
