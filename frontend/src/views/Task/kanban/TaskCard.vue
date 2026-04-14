<template>
  <div
    draggable="true"
    class="p-5 bg-white border border-gray-200 task rounded-xl shadow-theme-sm dark:border-gray-800 dark:bg-white/5"
  >
    <div v-if="task.description || task.image">
      <h4 class="mb-2 text-base text-gray-800 dark:text-white/90">
        {{ task.title }}
      </h4>

      <p v-if="task.description" class="text-sm text-gray-500 dark:text-gray-400">
        {{ task.description }}
      </p>

      <div v-if="task.image" class="my-4">
        <img
          :src="task.image"
          :alt="task.title"
          class="overflow-hidden rounded-xl border-[0.5px] border-gray-200 dark:border-gray-800"
        />
      </div>

      <div class="flex items-start justify-between gap-6">
        <div class="flex items-center gap-3">
          <span
            v-if="task.date"
            class="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400"
          >
            <Calendar2Line class="w-4 h-4" />
            {{ task.date }}
          </span>
          <span
            v-if="task.comments"
            class="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400"
          >
            <MessageCircleIcon class="w-4 h-4" />
            {{ task.comments }}
          </span>
        </div>

        <div
          v-if="task.user"
          class="h-6 w-6 overflow-hidden rounded-full border-[0.5px] border-gray-200 dark:border-gray-800"
        >
          <img :src="task.user" :alt="task.title" />
        </div>
      </div>
    </div>
    <div v-else class="flex items-start justify-between gap-6">
      <div>
        <h4 class="mb-5 text-base text-gray-800 dark:text-white/90">
          {{ task.title }}
        </h4>
        <div class="flex items-center gap-3">
          <span
            v-if="task.date"
            class="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400"
          >
            <Calendar2Line class="w-4 h-4" />
            {{ task.date }}
          </span>
          <span
            v-if="task.comments"
            class="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400"
          >
            <Message2Line class="w-4 h-4" />
            {{ task.comments }}
          </span>
          <span
            v-if="task.attachments"
            class="flex items-center gap-1 text-sm text-gray-500 cursor-pointer dark:text-gray-400"
          >
            <PaperclipIcon class="w-4 h-4" />
            {{ task.attachments }}
          </span>
        </div>
        <span
          v-if="task.tag"
          :class="getTagClass(task.tag.color)"
          class="mt-3 inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
        >
          {{ task.tag.text }}
        </span>
      </div>
      <div
        v-if="task.user"
        class="h-6 w-6 shrink-0 overflow-hidden rounded-full border-[0.5px] border-gray-200 dark:border-gray-800"
      >
        <img :src="task.user" :alt="task.title" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar2Line, Message2Line, PaperclipIcon } from '@/icons'

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
