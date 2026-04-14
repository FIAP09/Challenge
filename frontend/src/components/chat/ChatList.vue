<template>
  <div
    class="flex-col overflow-auto transition-all duration-300 no-scrollbar"
    :class="{
      'fixed top-0 left-0 z-999999 h-screen bg-white dark:bg-gray-900': isOpen,
      'hidden xl:flex': !isOpen,
    }"
  >
    <div
      class="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800 xl:hidden"
    >
      <div>
        <h3 class="font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Chat
        </h3>
      </div>
      <div class="flex items-center gap-1">
        <button
          @click="$emit('toggle')"
          class="flex items-center justify-center w-10 h-10 text-gray-700 transition border border-gray-300 rounded-full dark:border-gray-700 dark:text-gray-400 dark:hover:text-white/90"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex flex-col max-h-full px-4 overflow-auto sm:px-5">
      <div class="max-h-full space-y-1 overflow-auto custom-scrollbar">
        <chat-list-item v-for="chat in chatList" :key="chat.id" :chat="chat" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ChatListItem from './ChatListItem.vue'

interface Chat {
  id: number
  name: string
  role: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  lastMessage: string
  lastMessageTime: string
}

const chatList = ref<Chat[]>([
  {
    id: 1,
    name: 'Kaiya George',
    role: 'Project Manager',
    avatar: '/images/user/user-18.jpg',
    status: 'online',
    lastMessage: 'Hello!',
    lastMessageTime: '15 mins',
  },
  {
    id: 2,
    name: 'Lindsey Curtis',
    role: 'Designer',
    avatar: '/images/user/user-17.jpg',
    status: 'online',
    lastMessage: 'How are you?',
    lastMessageTime: '30 mins',
  },
  {
    id: 3,
    name: 'Kaiya George',
    role: 'Project Manager',
    avatar: '/images/user/user-19.jpg',
    status: 'online',
    lastMessage: 'Hello!',
    lastMessageTime: '15 mins',
  },
  {
    id: 4,
    name: 'Lindsey Curtis',
    role: 'Designer',
    avatar: '/images/user/user-34.jpg',
    status: 'online',
    lastMessage: 'How are you?',
    lastMessageTime: '30 mins',
  },
  {
    id: 5,
    name: 'Lindsey Curtis',
    role: 'Designer',
    avatar: '/images/user/user-35.jpg',
    status: 'online',
    lastMessage: 'How are you?',
    lastMessageTime: '30 mins',
  },
  {
    id: 6,
    name: 'Lindsey Curtis',
    role: 'Designer',
    avatar: '/images/user/user-36.jpg',
    status: 'online',
    lastMessage: 'How are you?',
    lastMessageTime: '30 mins',
  },
  {
    id: 7,
    name: 'Lindsey Curtis',
    role: 'Designer',
    avatar: '/images/user/user-37.jpg',
    status: 'online',
    lastMessage: 'How are you?',
    lastMessageTime: '30 mins',
  },
  {
    id: 8,
    name: 'Lindsey Curtis',
    role: 'Designer',
    avatar: '/images/user/user-17.jpg',
    status: 'online',
    lastMessage: 'How are you?',
    lastMessageTime: '30 mins',
  },
  {
    id: 9,
    name: 'Lindsey Curtis',
    role: 'Designer',
    avatar: '/images/user/user-18.jpg',
    status: 'online',
    lastMessage: 'How are you?',
    lastMessageTime: '30 mins',
  },
  // Add more chat items here
])

defineProps<{
  isOpen: boolean
}>()

defineEmits(['toggle'])
</script>
