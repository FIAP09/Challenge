<template>
  <div class="relative" ref="dropdownRef">
    <button @click="openDropDown = !openDropDown" class="text-gray-700 dark:text-gray-400">
      <MoreDots />
    </button>
    <div
      v-if="openDropDown"
      class="absolute right-0 top-full z-40 w-[140px] space-y-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-md dark:border-gray-800 dark:bg-gray-dark"
    >
      <button
        v-for="action in actions"
        :key="action"
        @click="handleAction(action)"
        class="flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
      >
        {{ action }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MoreDots } from '../../icons'

const openDropDown = ref(false)
const actions = ['Edit', 'Delete', 'Clear All']
const dropdownRef = ref(null)

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    openDropDown.value = false
  }
}

const handleAction = (action) => {
  console.log(`Action clicked: ${action}`)
  openDropDown.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
