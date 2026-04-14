<template>
  <div class="p-6 border border-gray-200 rounded-xl dark:border-gray-800">
    <div class="border-b border-gray-200 dark:border-gray-800">
      <nav
        class="-mb-px flex space-x-2 overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5"
      >
        <TabButton
          v-for="tab in tabs"
          :key="tab.id"
          :id="tab.id"
          :label="tab.label"
          :isActive="activeTab === tab.id"
          @click="setActiveTab(tab.id)"
        />
      </nav>
    </div>

    <div class="pt-4 dark:border-gray-800">
      <TabContent
        v-for="tab in tabs"
        :key="tab.id"
        :id="tab.id"
        :title="tab.label"
        :isActive="activeTab === tab.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabButton from './TabButton.vue'
import TabContent from './TabContent.vue'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'notification', label: 'Notification' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'customers', label: 'Customers' },
]

const activeTab = ref('overview')

const setActiveTab = (id: string) => {
  activeTab.value = id
}
</script>
