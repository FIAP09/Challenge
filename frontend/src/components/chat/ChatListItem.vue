<template>
  <div
    class="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-white/[0.03]"
  >
    <div class="relative h-12 w-full max-w-[48px] rounded-full">
      <img
        :src="chat.avatar"
        :alt="chat.name"
        class="object-cover object-center w-full h-full overflow-hidden rounded-full"
      />
      <span
        class="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-[1.5px] border-white dark:border-gray-900"
        :class="{
          'bg-success-500': chat.status === 'online',
          'bg-warning-500': chat.status === 'away',
          'bg-error-500': chat.status === 'offline',
        }"
      ></span>
    </div>
    <div class="w-full">
      <div class="flex items-start justify-between">
        <div>
          <h5 class="text-sm font-medium text-gray-800 dark:text-white/90">
            {{ chat.name }}
          </h5>
          <p class="mt-0.5 text-theme-xs text-gray-500 dark:text-gray-400">
            {{ chat.role }}
          </p>
        </div>
        <span class="text-gray-400 text-theme-xs">{{ chat.lastMessageTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Chat {
  id: number
  name: string
  role: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  lastMessage: string
  lastMessageTime: string
}

defineProps<{
  chat: Chat
}>()
</script>
