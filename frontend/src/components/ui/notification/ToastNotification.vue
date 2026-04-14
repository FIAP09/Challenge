<template>
  <div
    class="relative w-full max-w-[577px] rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#1E2634]"
  >
    <button
      @click="close"
      class="absolute text-gray-400 right-3 top-3 hover:text-gray-800 dark:hover:text-white/90"
    >
      <svg
        class="fill-current"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
        />
      </svg>
    </button>

    <p class="pr-4 mb-6 text-sm text-gray-700 dark:text-gray-400">
      {{ message }}
    </p>
    <div class="flex flex-col justify-end gap-6 sm:flex-row sm:items-center sm:gap-4">
      <button
        type="button"
        @click="openSettings"
        class="text-sm font-medium text-left text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {{ settingsButtonText }}
      </button>

      <div class="flex items-center w-full gap-3 sm:w-auto">
        <button
          type="button"
          @click="denyAll"
          class="flex w-full sm:w-auto justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          {{ denyButtonText }}
        </button>
        <button
          type="button"
          @click="acceptAll"
          class="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg sm:w-auto bg-brand-500 shadow-theme-xs hover:bg-brand-600"
        >
          {{ acceptButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  message: string
  settingsButtonText: string
  denyButtonText: string
  acceptButtonText: string
}

const props = withDefaults(defineProps<Props>(), {
  message:
    'By Clicking on "Accept", you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.',
  settingsButtonText: 'Cookie Settings',
  denyButtonText: 'Deny All',
  acceptButtonText: 'Accept All',
})

const emit = defineEmits(['close', 'openSettings', 'denyAll', 'acceptAll'])

const close = () => {
  emit('close')
}

const openSettings = () => {
  emit('openSettings')
}

const denyAll = () => {
  emit('denyAll')
}

const acceptAll = () => {
  emit('acceptAll')
}
</script>
