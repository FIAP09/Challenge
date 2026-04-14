<template>
  <div class="p-6 border border-gray-200 rounded-xl dark:border-gray-800">
    <div class="flex flex-col gap-6 sm:flex-row sm:gap-8">
      <div
        class="overflow-x-auto pb-2 sm:w-[200px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-100 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5"
      >
        <nav class="flex flex-row w-full sm:flex-col sm:space-y-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out rounded-lg sm:p-3"
            :class="[
              activeTab === tab.id
                ? 'text-brand-500 dark:bg-brand-400/20 dark:text-brand-400 bg-brand-50'
                : 'bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
            ]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>
      <div
        class="flex-1"
        v-for="tab in tabs"
        :key="tab.id"
        :class="activeTab === tab.id ? 'block' : 'hidden'"
      >
        <div>
          <h3 class="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
            {{ tab.label }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ tab.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  id: string
  label: string
  content: string
}

const tabs: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    content:
      'Overview ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
  {
    id: 'notification',
    label: 'Notification',
    content:
      'Notification ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    content:
      'Analytics ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
  {
    id: 'customers',
    label: 'Customers',
    content:
      'Customers ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
]

const activeTab = ref('overview')
</script>
