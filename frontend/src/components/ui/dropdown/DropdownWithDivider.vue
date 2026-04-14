<template>
  <div class="relative inline-block" ref="dropdownRef">
    <a
      href="#"
      @click.prevent="toggleDropdown"
      class="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600"
    >
      Options
      <svg
        class="duration-200 ease-in-out stroke-current"
        :class="{ 'rotate-180': isOpen }"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.79199 7.396L10.0003 12.6043L15.2087 7.396"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        v-click-outside="closeDropdown"
        class="absolute left-0 top-full z-40 mt-2 w-full min-w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-[#1E2635]"
      >
        <ul class="flex flex-col gap-1">
          <template v-for="(item, index) in menuItems" :key="index">
            <li v-if="item.type === 'separator'">
              <span class="my-1.5 block h-px w-full bg-gray-200 dark:bg-[#353C49]"></span>
            </li>
            <li v-else>
              <a
                :href="item.href"
                @click="handleItemClick(item)"
                class="flex rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
              >
                {{ item.text }}
              </a>
            </li>
          </template>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const dropdownRef = ref(false)

const menuItems = [
  { text: 'Edit', href: '#' },
  { text: 'Duplicate', href: '#' },
  { type: 'separator' },
  { text: 'Archive', href: '#' },
  { text: 'Move', href: '#' },
  { type: 'separator' },
  { text: 'Delete', href: '#' },
]

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleItemClick = (item) => {
  // Add your logic here for handling item clicks
  console.log(`Clicked: ${item.text}`)
  closeDropdown()
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
