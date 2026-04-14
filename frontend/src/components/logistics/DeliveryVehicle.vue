<template>
  <div
    class="space-y5 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3"
  >
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Delivery Vehicles</h3>
        <p class="dark:text-gray-40 text-sm text-gray-500">Vehicles operating on the road</p>
      </div>
      <!-- Dropdown -->
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
    <div class="relative mt-5 flex justify-between">
      <div>
        <h3 class="mb-1 text-3xl font-medium text-gray-800 dark:text-white/90">29</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          <span class="text-success-600 font-medium">+3.85%</span>
          than last Week
        </p>
        <div class="mt-5 flex items-center gap-2">
          <div
            class="ring-success-500 flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-inset"
          >
            <div class="bg-success-500 h-2.5 w-2.5 rounded-full"></div>
          </div>
          <div>
            <span class="text-success-500 text-sm font-medium">On-route</span>
          </div>
        </div>
      </div>
      <div>
        <img class="absolute -right-6 -bottom-2" src="/images/logistics/truck.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import DropdownMenu from '../common/DropdownMenu.vue'

const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]
</script>
