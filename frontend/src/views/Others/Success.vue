<template>
  <div
    class="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1"
  >
    <common-grid-shape />

    <div>
      <div class="mx-auto w-full max-w-[274px] text-center sm:max-w-[555px]">
        <div class="mx-auto mb-10 w-full max-w-[100px] text-center sm:max-w-[160px]">
          <img src="/images/error/success.svg" alt="success" class="dark:hidden" />
          <img
            src="/images/error/success-dark.svg"
            alt="success"
            class="hidden dark:block"
          />
        </div>

        <h1 class="mb-2 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
          SUCCESS !
        </h1>

        <p class="mt-6 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
          Awesome! your message has been sent successfully, Our support team will get back to you as
          soon as possible.
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
