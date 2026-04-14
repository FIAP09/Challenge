<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <!-- Header -->
    <div
      class="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center dark:border-gray-800"
    >
      <div>
        <h3 class="text-lg font-medium text-gray-800 dark:text-white/90">
          Ticket #346520 - Sidebar not responsive on mobile
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Mon, 3:20 PM (2 days ago)</p>
      </div>
      <div class="flex items-center gap-4">
        <p class="text-sm text-gray-500 dark:text-gray-400">4 of 120</p>
        <div class="flex items-center gap-2">
          <button
            class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
          >
            <svg class="stroke-current" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
          >
            <svg class="stroke-current" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                d="M7.29167 15.8335L12.5 10.6252L7.29167 5.41683"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="relative px-6 py-7">
      <div
        class="custom-scrollbar h-[calc(58vh-162px)] space-y-7 divide-y divide-gray-200 overflow-y-auto pr-2 dark:divide-gray-800"
      >
        <MessageItem
          v-for="(msg, index) in messages"
          :key="index"
          :name="msg.name"
          :email="msg.email"
          :avatar="msg.avatar"
          :time="msg.time"
          :content="msg.content"
        />
      </div>

      <!-- Reply Input -->
      <div class="pt-5">
        <div
          class="mx-auto max-h-[162px] w-full rounded-2xl border border-gray-200 shadow-xs dark:border-gray-800 dark:bg-gray-800"
        >
          <textarea
            v-model="reply"
            placeholder="Type your reply here..."
            class="h-20 w-full resize-none border-none bg-transparent p-5 font-normal text-gray-800 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white"
          ></textarea>
          <div class="flex items-center justify-between p-3">
            <button
              class="flex h-9 items-center gap-1.5 rounded-lg bg-transparent px-2 py-3 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                <path
                  d="M14.4194 11.7679L15.4506 10.7367C17.1591 9.02811 17.1591 6.25802 15.4506 4.54947C13.742 2.84093 10.9719 2.84093 9.2634 4.54947L8.2322 5.58067M11.77 14.4172L10.7365 15.4507C9.02799 17.1592 6.2579 17.1592 4.54935 15.4507C2.84081 13.7422 2.84081 10.9721 4.54935 9.26352L5.58285 8.23002M11.7677 8.23232L8.2322 11.7679"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Attach
            </button>
            <button
              class="bg-brand-500 hover:bg-brand-600 shadow-theme-xs inline-flex h-9 items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      <!-- Status -->
      <div class="mt-6 flex items-center gap-4">
        <span class="text-gray-500 dark:text-gray-400">Status:</span>
        <div class="flex items-center gap-4">
          <StatusRadio label="In-Progress" value="in-progress" v-model="status" />
          <StatusRadio label="Solved" value="solved" v-model="status" />
          <StatusRadio label="On-Hold" value="on-hold" v-model="status" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MessageItem from './MessageItem.vue'
import StatusRadio from './StatusRadio.vue'

const reply = ref('')
const status = ref('in-progress')

const messages = [
  {
    name: 'John Doe',
    email: 'jhondelin@gmail.com',
    avatar: '/images/support/user-1.jpg',
    time: 'Mon, 3:20 PM (2 hrs ago)',
    content: `Hi TailAdmin Team,\nI hope you're doing well.\nI’m currently working on customizing the TailAdmin dashboard and would like to add a new section labeled “Reports.”`,
  },
  {
    name: 'Musharof Chowdhury',
    email: 'From - tailadmin support team',
    avatar: '/images/support/user-2.jpg',
    time: 'Mon, 3:20 PM (2 hrs ago)',
    content: `Hi John D,\nThanks for reaching out—and great to hear you're customizing TailAdmin to fit your needs! Yes, you can definitely add custom pages like a “Reports” section, and it’s quite straightforward.`,
  },
  {
    name: 'John Doe',
    email: 'jhondelin@gmail.com',
    avatar: '/images/support/user-1.jpg',
    time: 'Mon, 3:20 PM (2 hrs ago)',
    content: `Hi TailAdmin Team,\nI hope you're doing well.\nI’m currently working on customizing the TailAdmin dashboard and would like to add a new section labeled “Reports.”`,
  },
]
</script>
