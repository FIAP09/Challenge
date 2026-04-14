<template>
  <div class="relative h-[calc(100vh-146px)] px-4 xl:flex xl:px-0">
    <!-- Mobile Chat Header  -->
    <div
      class="my-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 xl:hidden dark:border-gray-800 dark:bg-gray-900"
    >
      <h4 class="pl-2 text-lg font-medium text-gray-800 dark:text-white/90">Chats History</h4>
      <button
        @click="toggleSidebar"
        class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 6L20 6M4 18L20 18M4 12L20 12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 xl:py-10">
      <div class="relative mx-auto flex max-w-[720px] flex-col">
        <slot></slot>
        <!-- Fixed Input Wrapper -->
        <div
          class="fixed bottom-5 lg:bottom-10 left-1/2 z-20 w-full -translate-x-1/2 transform px-4 sm:px-6 lg:px-8"
        >
          <!-- Container with max width -->
          <div
            class="mx-auto w-full max-w-[720px] rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-800"
          >
            <!-- Textarea -->
            <textarea
              ref="textareaRef"
              v-model="currentMessage"
              @keydown.enter.prevent="handleSubmit"
              placeholder="Type your prompt here..."
              class="h-20 w-full resize-none border-none bg-transparent p-0 font-normal text-gray-800 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white"
            ></textarea>

            <!-- Bottom Section -->
            <div class="flex items-center justify-between pt-2">
              <button
                class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <!-- Attach Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                  <path
                    d="M14.4194 11.7679L15.4506 10.7367C17.1591 9.02811 17.1591 6.25802 15.4506 4.54947C13.742 2.84093 10.9719 2.84093 9.2634 4.54947L8.2322 5.58067M11.77 14.4172L10.7365 15.4507C9.02799 17.1592 6.2579 17.1592 4.54935 15.4507C2.84081 13.7422 2.84081 10.9721 4.54935 9.26352L5.58285 8.23002M11.7677 8.23232L8.2322 11.7679"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Attach
              </button>

              <!-- Send Button -->
              <button
                @click="handleSubmit"
                :disabled="!currentMessage.trim() || isLoading"
                class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white/90 dark:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-white/90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                  <path
                    d="M9.99674 3.33252L9.99675 16.667M5 8.32918L9.99984 3.33252L15 8.32918"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI History Sidebar -->
    <AiHistorySidebar />
  </div>
</template>

<script setup>
import { ref, provide, nextTick, onMounted } from 'vue'
import AiHistorySidebar from './AiHistorySidebar.vue'

// Props to accept input handlers from parent
const props = defineProps({
  onSubmit: {
    type: Function,
    default: null,
  },
})

// Emits for parent components
const emit = defineEmits(['submit', 'input-change'])

// Reactive state for sidebar
const isSidebarOpen = ref(false)

// Reactive state for input
const currentMessage = ref('')
const isLoading = ref(false)
const textareaRef = ref(null)

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const handleSubmit = async () => {
  if (!currentMessage.value.trim() || isLoading.value) return

  const message = currentMessage.value.trim()
  currentMessage.value = ''

  // Auto-resize textarea
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }

  // Emit to parent or use provided handler
  if (props.onSubmit) {
    await props.onSubmit(message)
  } else {
    emit('submit', message)
  }
}

// Provide sidebar state to child components
provide('aiSidebar', {
  isSidebarOpen,
  toggleSidebar,
  closeSidebar,
})

// Expose methods to parent components
defineExpose({
  currentMessage,
  isLoading,
  handleSubmit,
  toggleSidebar,
  closeSidebar,
})
</script>
