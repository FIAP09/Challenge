<template>
  <div class="p-6 border border-gray-200 rounded-xl dark:border-gray-800">
    <div class="border-b border-gray-200 dark:border-gray-800">
      <nav
        class="-mb-px flex space-x-2 overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5"
      >
        <TabButton
          v-for="tab in tabData"
          :key="tab.id"
          :tab="tab"
          :isActive="activeTab === tab.id"
          @click="setActiveTab(tab.id)"
        />
      </nav>
    </div>

    <div class="pt-4 dark:border-gray-800">
      <div
        v-for="tab in tabData"
        :key="tab.id"
        :style="{ display: activeTab === tab.id ? 'block' : 'none' }"
      >
        <TabContent :tab="tab" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TabData {
  id: string
  label: string
  content: string
  count?: number
}

const tabData: TabData[] = [
  {
    id: 'overview',
    label: 'Overview',
    content:
      'Overview ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
    count: 8,
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
    count: 4,
  },
  {
    id: 'customers',
    label: 'Customers',
    content:
      'Customers ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.',
    count: 12,
  },
]

const activeTab = ref<string>('overview')

const setActiveTab = (id: string) => {
  activeTab.value = id
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import TabButton from './TabButton.vue'
import TabContent from './TabContent.vue'

export default defineComponent({
  name: 'TabWithBadge',
})
</script>
