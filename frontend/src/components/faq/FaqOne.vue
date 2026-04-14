<template>
  <div class="space-y-4">
    <div
      v-for="(item, index) in faqItems"
      :key="index"
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div
        @click="toggleItem(index)"
        class="flex items-center justify-between py-3 pl-6 pr-3 cursor-pointer"
        :class="{ 'bg-gray-50 dark:bg-white/[0.03]': item.isOpen }"
      >
        <h4 class="text-lg font-medium text-gray-800 dark:text-white/90">
          {{ item.question }}
        </h4>

        <button
          :class="
            item.isOpen
              ? 'text-gray-800 dark:text-white/90 rotate-180'
              : 'text-gray-500 dark:text-gray-400'
          "
          class="flex h-12 w-full max-w-12 items-center justify-center rounded-full bg-gray-100 duration-200 ease-linear dark:bg-white/[0.03]"
        >
          <svg
            class="stroke-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.75 8.875L12 15.125L18.25 8.875"
              stroke=""
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <div v-show="item.isOpen" class="px-6 py-7">
        <p class="text-base text-gray-500 dark:text-gray-400">
          {{ item.answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqItems = ref([
  {
    question: 'Do I get free updates?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
    isOpen: true,
  },
  {
    question: 'Do I get free updates?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
    isOpen: false,
  },
  {
    question: 'Can I Customize TailAdmin to suit my needs?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
    isOpen: false,
  },
  {
    question: 'What does "Unlimited Projects" mean?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.',
    isOpen: false,
  },
])

const toggleItem = (index) => {
  faqItems.value[index].isOpen = !faqItems.value[index].isOpen
}
</script>
