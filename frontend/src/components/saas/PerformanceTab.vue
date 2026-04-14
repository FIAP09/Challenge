<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="mb-6 flex justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Product Performance</h3>
      </div>
      <div class="relative inline-block">
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
    <div class="flex w-full items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        @click="selected = 'daily'"
        :class="[
          'text-sm w-full rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white',
          selected === 'daily'
            ? 'shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800'
            : 'text-gray-500 dark:text-gray-400',
        ]"
      >
        Daily Sales
      </button>
      <button
        @click="selected = 'online'"
        :class="[
          'text-sm w-full rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white',
          selected === 'online'
            ? 'shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800'
            : 'text-gray-500 dark:text-gray-400',
        ]"
      >
        Online Sales
      </button>
      <button
        @click="selected = 'new'"
        :class="[
          'text-sm w-full rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white',
          selected === 'new'
            ? 'shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800'
            : 'text-gray-500 dark:text-gray-400',
        ]"
      >
        New Users
      </button>
    </div>

    <!-- Tab Panels -->
    <div class="mt-4">
      <!-- Daily Sales Panel -->
      <div v-if="selected === 'daily'" class="space-y-4">
        <div
          class="grid grid-cols-2 justify-between gap-10 divide-x divide-gray-100 rounded-xl border border-gray-100 bg-white py-4 dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-800/[0.03]"
        >
          <div class="px-5">
            <span class="block text-sm text-gray-500 dark:text-gray-400"> Digital Product </span>
            <div class="mt-1 flex items-center gap-2">
              <span
                class="bg-success-50 dark:bg-success-500/15 text-success-600 inline-flex size-5 items-center justify-center rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.56462 1.62411C5.70194 1.47091 5.90136 1.37451 6.12329 1.37451C6.1236 1.37451 6.1239 1.37451 6.12421 1.37451C6.3163 1.37434 6.50845 1.4475 6.65505 1.594L9.65514 4.59199C9.94814 4.88478 9.94831 5.35966 9.65552 5.65265C9.36272 5.94565 8.88785 5.94581 8.59486 5.65302L6.87329 3.93267L6.87329 10.1252C6.87329 10.5394 6.53751 10.8752 6.12329 10.8752C5.70908 10.8752 5.37329 10.5394 5.37329 10.1252L5.37329 3.93597L3.65516 5.65301C3.36218 5.94581 2.8873 5.94566 2.5945 5.65267C2.3017 5.35968 2.30185 4.88481 2.59484 4.59201L5.56462 1.62411Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white/90">790</h4>
            </div>
          </div>
          <div class="px-5">
            <span class="block text-sm text-gray-500 dark:text-gray-400"> Physical Product </span>
            <div class="mt-1 flex items-center gap-2">
              <span
                class="bg-error-50 dark:bg-error-500/15 text-error-600 inline-flex size-5 items-center justify-center rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.31462 10.3761C5.45194 10.5293 5.65136 10.6257 5.87329 10.6257C5.8736 10.6257 5.8739 10.6257 5.87421 10.6257C6.0663 10.6259 6.25845 10.5527 6.40505 10.4062L9.40514 7.4082C9.69814 7.11541 9.69831 6.64054 9.40552 6.34754C9.11273 6.05454 8.63785 6.05438 8.34486 6.34717L6.62329 8.06753L6.62329 1.875C6.62329 1.46079 6.28751 1.125 5.87329 1.125C5.45908 1.125 5.12329 1.46079 5.12329 1.875L5.12329 8.06422L3.40516 6.34719C3.11218 6.05439 2.6373 6.05454 2.3445 6.34752C2.0517 6.64051 2.05185 7.11538 2.34484 7.40818L5.31462 10.3761Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white/90">572</h4>
            </div>
          </div>
        </div>
        <div class="rounded-xl border border-gray-100 px-5 py-4 dark:border-gray-800">
          <div class="mb-3 flex items-start justify-between">
            <div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Average Daily Sales
              </span>
              <h3 class="text-2xl font-semibold text-gray-800 dark:text-white/90">$2,950</h3>
            </div>
            <div>
              <span
                class="bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500 flex items-center gap-1 rounded-full py-0.5 pr-2.5 pl-2 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.31462 10.3761C5.45194 10.5293 5.65136 10.6257 5.87329 10.6257C5.8736 10.6257 5.8739 10.6257 5.87421 10.6257C6.0663 10.6259 6.25845 10.5527 6.40505 10.4062L9.40514 7.4082C9.69814 7.11541 9.69831 6.64054 9.40552 6.34754C9.11273 6.05454 8.63785 6.05438 8.34486 6.34717L6.62329 8.06753L6.62329 1.875C6.62329 1.46079 6.28751 1.125 5.87329 1.125C5.45908 1.125 5.12329 1.46079 5.12329 1.875L5.12329 8.06422L3.40516 6.34719C3.11218 6.05439 2.6373 6.05454 2.3445 6.34752C2.0517 6.64051 2.05185 7.11538 2.34484 7.40818L5.31462 10.3761Z"
                    fill="currentColor"
                  />
                </svg>
                0.52%
              </span>
            </div>
          </div>
          <!-- Chart placeholder -->
          <div class="overflow-x-auto">
            <DailySaleChart />
          </div>
        </div>
      </div>

      <!-- Online Sales Panel -->
      <div v-if="selected === 'online'" class="space-y-4">
        <div
          class="grid grid-cols-2 justify-between gap-10 divide-x divide-gray-100 rounded-xl border border-gray-100 py-4 dark:divide-gray-800 dark:border-gray-800"
        >
          <div class="px-5">
            <span class="block text-sm text-gray-500 dark:text-gray-400"> Digital Product </span>
            <div class="mt-1 flex items-center gap-2">
              <span
                class="bg-success-50 dark:bg-success-500/15 text-success-600 inline-flex size-5 items-center justify-center rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.56462 1.62411C5.70194 1.47091 5.90136 1.37451 6.12329 1.37451C6.1236 1.37451 6.1239 1.37451 6.12421 1.37451C6.3163 1.37434 6.50845 1.4475 6.65505 1.594L9.65514 4.59199C9.94814 4.88478 9.94831 5.35966 9.65552 5.65265C9.36272 5.94565 8.88785 5.94581 8.59486 5.65302L6.87329 3.93267L6.87329 10.1252C6.87329 10.5394 6.53751 10.8752 6.12329 10.8752C5.70908 10.8752 5.37329 10.5394 5.37329 10.1252L5.37329 3.93597L3.65516 5.65301C3.36218 5.94581 2.8873 5.94566 2.5945 5.65267C2.3017 5.35968 2.30185 4.88481 2.59484 4.59201L5.56462 1.62411Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white/90">8,490</h4>
            </div>
          </div>
          <div class="px-5">
            <span class="block text-sm text-gray-500 dark:text-gray-400"> Physical Product </span>
            <div class="mt-1 flex items-center gap-2">
              <span
                class="bg-error-50 dark:bg-error-500/15 text-error-600 inline-flex size-5 items-center justify-center rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.31462 10.3761C5.45194 10.5293 5.65136 10.6257 5.87329 10.6257C5.8736 10.6257 5.8739 10.6257 5.87421 10.6257C6.0663 10.6259 6.25845 10.5527 6.40505 10.4062L9.40514 7.4082C9.69814 7.11541 9.69831 6.64054 9.40552 6.34754C9.11273 6.05454 8.63785 6.05438 8.34486 6.34717L6.62329 8.06753L6.62329 1.875C6.62329 1.46079 6.28751 1.125 5.87329 1.125C5.45908 1.125 5.12329 1.46079 5.12329 1.875L5.12329 8.06422L3.40516 6.34719C3.11218 6.05439 2.6373 6.05454 2.3445 6.34752C2.0517 6.64051 2.05185 7.11538 2.34484 7.40818L5.31462 10.3761Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white/90">950</h4>
            </div>
          </div>
        </div>
        <div class="rounded-xl border border-gray-100 px-5 py-4 dark:border-gray-800">
          <div class="mb-3 flex items-start justify-between">
            <div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Online Sales
              </span>
              <h3 class="text-2xl font-semibold text-gray-800 dark:text-white/90">$59,410</h3>
            </div>
            <div>
              <span
                class="bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500 flex items-center gap-1 rounded-full py-0.5 pr-2.5 pl-2 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.56462 1.62411C5.70194 1.47091 5.90136 1.37451 6.12329 1.37451C6.1236 1.37451 6.1239 1.37451 6.12421 1.37451C6.3163 1.37434 6.50845 1.4475 6.65505 1.594L9.65514 4.59199C9.94814 4.88478 9.94831 5.35966 9.65552 5.65265C9.36272 5.94565 8.88785 5.94581 8.59486 5.65302L6.87329 3.93267L6.87329 10.1252C6.87329 10.5394 6.53751 10.8752 6.12329 10.8752C5.70908 10.8752 5.37329 10.5394 5.37329 10.1252L5.37329 3.93597L3.65516 5.65301C3.36218 5.94581 2.8873 5.94566 2.5945 5.65267C2.3017 5.35968 2.30185 4.88481 2.59484 4.59201L5.56462 1.62411Z"
                    fill="currentColor"
                  />
                </svg>
                0.52%
              </span>
            </div>
          </div>
          <!-- Chart placeholder -->
          <div class="custom-scrollbar max-w-full overflow-x-auto">
            <OnlineSaleChart />
          </div>
        </div>
      </div>

      <!-- New Users Panel -->
      <div v-if="selected === 'new'" class="space-y-4">
        <div
          class="grid grid-cols-2 justify-between gap-4 rounded-xl border border-gray-100 py-4 dark:border-gray-800"
        >
          <div class="px-5">
            <div class="flex -space-x-3">
              <img
                src="/images/user/user-01.jpg"
                class="size-12 rounded-full ring-2 ring-white dark:ring-gray-800/90"
                alt="User 1"
                width="48"
                height="48"
              />
              <img
                src="/images/user/user-02.jpg"
                class="size-12 rounded-full ring-2 ring-white dark:ring-gray-800/90"
                alt="User 2"
                width="48"
                height="48"
              />
              <img
                src="/images/user/user-03.jpg"
                class="size-12 rounded-full ring-2 ring-white dark:ring-gray-800/90"
                alt="User 3"
                width="48"
                height="48"
              />
              <div
                class="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-700 ring-2 ring-white dark:ring-gray-800/90"
              >
                10+
              </div>
            </div>
          </div>
          <div class="px-5">
            <span class="block text-sm text-gray-500 dark:text-gray-400"> Added last month </span>
            <div class="mt-1 flex items-center gap-2">
              <h4 class="text-xl font-semibold text-gray-800 dark:text-white/90">8,490</h4>
            </div>
          </div>
        </div>
        <div class="rounded-xl border border-gray-100 px-5 py-4 dark:border-gray-800">
          <div class="mb-3 flex items-start justify-between">
            <div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total New Users
              </span>
              <h3 class="text-2xl font-semibold text-gray-800 dark:text-white/90">5.9K</h3>
            </div>
            <div>
              <span
                class="bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500 flex items-center gap-1 rounded-full py-0.5 pr-2.5 pl-2 text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.56462 1.62411C5.70194 1.47091 5.90136 1.37451 6.12329 1.37451C6.1236 1.37451 6.1239 1.37451 6.12421 1.37451C6.3163 1.37434 6.50845 1.4475 6.65505 1.594L9.65514 4.59199C9.94814 4.88478 9.94831 5.35966 9.65552 5.65265C9.36272 5.94565 8.88785 5.94581 8.59486 5.65302L6.87329 3.93267L6.87329 10.1252C6.87329 10.5394 6.53751 10.8752 6.12329 10.8752C5.70908 10.8752 5.37329 10.5394 5.37329 10.1252L5.37329 3.93597L3.65516 5.65301C3.36218 5.94581 2.8873 5.94566 2.5945 5.65267C2.3017 5.35968 2.30185 4.88481 2.59484 4.59201L5.56462 1.62411Z"
                    fill="currentColor"
                  />
                </svg>
                0.52%
              </span>
            </div>
          </div>

          <NewUserChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DailySaleChart from './DailySaleChart.vue'
import NewUserChart from './NewUserChart.vue'
import OnlineSaleChart from './OnlineSaleChart.vue'

const selected = ref('daily')

import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]
</script>
