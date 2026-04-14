<template>
  <div>
    <div class="p-3 border border-gray-200 rounded-t-xl dark:border-gray-800">
      <!-- Navigation Tabs -->
      <nav
        class="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600"
      >
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="setActiveTab(tab.key)"
          :class="[
            'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out',
            activeTab === tab.key
              ? 'bg-white text-gray-900 shadow-theme-xs dark:bg-white/[0.03] dark:text-white'
              : 'bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
          ]"
        >
          {{ tab.title }}
        </button>
      </nav>
    </div>
    <div class="p-6 pt-4 border border-t-0 border-gray-200 rounded-b-xl dark:border-gray-800">
      <!-- Tab Content -->
      <div v-for="tab in tabs" :key="tab.key" v-show="activeTab === tab.key">
        <h3 class="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
          {{ tab.title }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ tab.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TabItem {
  key: string
  title: string
  content: string
}

const activeTab = ref<string>('overview')

const tabs: TabItem[] = [
  {
    key: 'overview',
    title: 'Overview',
    content:
      'Overview ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
  {
    key: 'notification',
    title: 'Notification',
    content:
      'Notification ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
  {
    key: 'analytics',
    title: 'Analytics',
    content:
      'Analytics ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
  {
    key: 'customers',
    title: 'Customers',
    content:
      'Customers ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
]

const setActiveTab = (key: string) => {
  activeTab.value = key
}
</script>
