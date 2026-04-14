<template>
  <div
    draggable="true"
    class="p-5 bg-white border border-gray-200 cursor-pointer task rounded-xl shadow-theme-sm dark:border-gray-800 dark:bg-white/5"
  >
    <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      <div class="flex items-start w-full gap-4">
        <span class="text-gray-400">
          <MenuIcon class="w-5 h-5" />
        </span>
        <label :for="`taskCheckbox${task.id}`" class="w-full cursor-pointer">
          <div class="relative flex items-start">
            <input :id="`taskCheckbox${task.id}`" type="checkbox" class="sr-only taskCheckbox" />
            <div
              class="flex items-center justify-center w-full h-5 mr-3 border border-gray-300 rounded-md box max-w-5 dark:border-gray-700"
            >
              <span class="opacity-0">
                <CheckIcon />
              </span>
            </div>
            <p class="-mt-0.5 text-base text-gray-800 dark:text-white/90">
              {{ task.title }}
            </p>
          </div>
        </label>
      </div>
      <div
        class="flex flex-col-reverse items-start justify-end w-full gap-3 xl:flex-row xl:items-center xl:gap-5"
      >
        <span
          v-if="task.tag"
          :class="getTagClass(task.tag.color)"
          class="inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium"
        >
          {{ task.tag.text }}
        </span>
        <div class="flex items-center justify-between w-full gap-5 xl:w-auto xl:justify-normal">
          <div class="flex items-center gap-3">
            <span
              class="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400"
            >
              <Calendar2Line />
              {{ task.date }}
            </span>
            <span
              v-if="task.comments"
              class="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400"
            >
              <Message2Line />
              {{ task.comments }}
            </span>
            <span
              v-if="task.attachments"
              class="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400"
            >
              <PaperclipIcon />
              {{ task.attachments }}
            </span>
          </div>
          <div
            v-if="task.user"
            class="h-6 w-full max-w-6 overflow-hidden rounded-full border-[0.5px] border-gray-200 dark:border-gray-800"
          >
            <img :src="task.user" :alt="task.title" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MenuIcon, CheckIcon } from '@/icons'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const getTagClass = (color) => {
  const baseClasses = 'px-2 py-0.5 text-xs font-medium'
  switch (color) {
    case 'brand':
      return `${baseClasses} bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400`
    case 'gray':
      return `${baseClasses} bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80`
    case 'success':
      return `${baseClasses} bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500`
    case 'orange':
      return `${baseClasses} bg-orange-400/10 text-orange-400`
    default:
      return baseClasses
  }
}
</script>
