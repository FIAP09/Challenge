<template>
  <div class="p-6 border border-gray-200 rounded-xl dark:border-gray-800">
    <div class="border-b border-gray-200 dark:border-gray-800">
      <nav
        class="-mb-px flex space-x-2 overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out"
          :class="[
            activeTab === tab.id
              ? 'text-brand-500 border-brand-500 dark:text-brand-400 dark:border-brand-400'
              : 'bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
          ]"
        >
          <component :is="tab.icon" class="size-5" />
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <div class="pt-4 dark:border-gray-800">
      <div v-for="tab in tabs" :key="tab.id" :class="activeTab === tab.id ? 'block' : 'hidden'">
        <h3 class="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
          {{ tab.name }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ tab.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BellIcon, LayoutDashboardIcon, UserGroupIcon } from '@/icons'
import BarChartIcon from '@/icons/BarChartIcon.vue'
import { ref } from 'vue'

const tabs = [
  {
    id: 'overview',
    name: 'Overview',
    icon: LayoutDashboardIcon,
    content:
      'Overview ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
  {
    id: 'notification',
    name: 'Notification',
    icon: BellIcon,
    content:
      'Notification ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChartIcon,
    content:
      'Analytics ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
  {
    id: 'customers',
    name: 'Customers',
    icon: UserGroupIcon,
    content:
      'Customers ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
  },
]

const activeTab = ref('overview')
</script>
