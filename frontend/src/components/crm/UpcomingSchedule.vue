<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6"
  >
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Upcoming Schedule</h3>

      <div class="relative">
        <DropdownMenu :menu-items="menuItems">
          <template #icon>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                fill="currentColor"
              />
            </svg>
          </template>
        </DropdownMenu>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div class="min-w-[500px]">
        <div class="flex flex-col gap-2">
          <div
            v-for="(item, index) in items"
            :key="index"
            @click="toggleChecked(index)"
            class="flex cursor-pointer items-center gap-9 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
          >
            <div class="flex items-start gap-3">
              <div
                class="flex h-5 w-5 items-center justify-center rounded-md border-[1.25px]"
                :class="
                  item.checked
                    ? 'border-brand-500 dark:border-brand-500 bg-brand-500'
                    : 'bg-white dark:bg-white/0 border-gray-300 dark:border-gray-700'
                "
              >
                <svg
                  v-show="item.checked"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6668 3.5L5.25016 9.91667L2.3335 7"
                    stroke="white"
                    stroke-width="1.94437"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div>
                <span class="mb-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                  {{ item.date }}
                </span>
                <span class="font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                  {{ item.time }}
                </span>
              </div>
            </div>
            <div>
              <span class="block mb-1 font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                {{ item.title }}
              </span>
              <span class="text-gray-500 text-theme-xs dark:text-gray-400">
                {{ item.description }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]

const items = ref([
  {
    checked: false,
    date: 'Wed, 11 jan',
    time: '09:20 AM',
    title: 'Business Analytics Press',
    description: 'Exploring the Future of Data-Driven +6 more',
  },
  {
    checked: false,
    date: 'Fri, 15 feb',
    time: '10:35 AM',
    title: 'Business Sprint',
    description: 'Techniques from Business Sprint +2 more',
  },
  {
    checked: false,
    date: 'Thu, 18 mar',
    time: '1:15 AM',
    title: 'Customer Review Meeting',
    description: 'Insights from the Customer Review Meeting +8 more',
  },
])

const toggleChecked = (index) => {
  items.value[index].checked = !items.value[index].checked
}
</script>

<style></style>
