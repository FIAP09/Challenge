<template>
  <div>
    <!-- Backdrop -->
    <div
      v-show="isSidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 z-[99999] bg-black/50 xl:hidden dark:bg-black/80"
      :class="{ 'opacity-100': isSidebarOpen, 'opacity-0': !isSidebarOpen }"
      style="transition: opacity 0.3s ease-in-out"
    >
      <div class="absolute top-4 right-[300px]">
        <button
          @click="closeSidebar"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 transition hover:bg-gray-100 dark:bg-gray-800 dark:text-white/90 dark:hover:bg-white/3 hover:dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6.75104 17.249L17.249 6.75111M6.75104 6.75098L17.249 17.2489"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <aside
      :class="
        isSidebarOpen
          ? 'flex fixed xl:static  z-[999999] h-screen bg-white dark:bg-gray-900'
          : 'hidden xl:flex'
      "
      class="z-50 w-[280px] h-full top-0 right-0 flex-col border-l border-gray-200 bg-white p-6 ease-in-out dark:border-gray-800 dark:bg-gray-900"
    >
      <button
        @click="startNewChat"
        class="bg-brand-500 hover:bg-brand-600 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 10.0002H15.0006M10.0002 5V15.0006"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        New Chat
      </button>

      <div class="mt-5">
        <div class="relative">
          <span class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            <svg
              class="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                fill=""
              />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-3.5 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          />
        </div>
      </div>

      <!-- Chat Items -->
      <div class="custom-scrollbar mt-6 h-full flex-1 space-y-3 overflow-y-auto text-sm">
        <!-- Today Section -->
        <div>
          <p class="mb-3 pl-3 text-xs text-gray-400 uppercase">Today</p>
          <ul class="space-y-1">
            <li
              v-for="chat in chats.today"
              :key="chat.id"
              class="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950"
            >
              <div class="flex items-center justify-between">
                <button class="text-left text-gray-800 truncate dark:text-white/90">
                  {{ chat.title }}
                </button>
                <button
                  @click.stop="toggleDropdown(chat.id)"
                  class="invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <!-- Dropdown Menu -->
              <div
                v-show="openDropdown === chat.id"
                class="absolute right-0 z-10 mt-1 w-32 rounded-lg border 0 border-gray-200 bg-white p-1 shadow-xs dark:border-gray-800 dark:bg-gray-900"
              >
                <button
                  @click="editChat(chat.id)"
                  class="block w-full rounded-md px-3 py-1.5 text-left hover:bg-gray-100 dark:text-gray-400 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white/90"
                >
                  Edit
                </button>
                <button
                  @click="deleteChat(chat.id)"
                  class="block w-full rounded-md px-3 py-1.5 text-left hover:bg-gray-100 dark:text-gray-400 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white/90"
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>

        <!-- Yesterday Section -->
        <div>
          <p class="mb-3 pl-3 text-xs text-gray-400 uppercase">Yesterday</p>
          <ul class="space-y-1">
            <li
              v-for="chat in chats.yesterday"
              :key="chat.id"
              class="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950"
            >
              <div class="flex items-center justify-between">
                <button class="text-left text-gray-800 truncate dark:text-white/90">
                  {{ chat.title }}
                </button>
                <button
                  @click.stop="toggleDropdown(chat.id)"
                  class="dropdown-button invisible group-hover:visible flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white/90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 4C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8 14C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              <!-- Dropdown Menu -->
              <div
                v-show="openDropdown === chat.id"
                class="dropdown-menu absolute right-0 top-full mt-1 z-10 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <button
                  @click="editChat(chat.id)"
                  class="flex w-full items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Edit
                </button>
                <button
                  @click="deleteChat(chat.id)"
                  class="flex w-full items-center px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>

        <!-- Last Week Section (collapsible) -->
        <div>
          <button
            @click="showMore = !showMore"
            :class="showMore ? 'hidden' : 'block'"
            class="mb-3 flex w-full items-center justify-between pl-3 text-xs text-gray-400 uppercase hover:text-gray-600 dark:hover:text-gray-300"
          >
            <span>Last Week</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.83331 6.41669L7.99998 10.5834L12.1666 6.41669"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div v-show="showMore">
            <p class="mb-3 pl-3 text-xs text-gray-400 uppercase">Last Week</p>
            <ul class="space-y-1">
              <li
                v-for="chat in chats.lastWeek"
                :key="chat.id"
                class="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950"
              >
                <div class="flex items-center justify-between">
                  <button class="text-left text-gray-800 truncate dark:text-white/90">
                    {{ chat.title }}
                  </button>
                  <button
                    @click.stop="toggleDropdown(chat.id)"
                    class="dropdown-button invisible group-hover:visible flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white/90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 4C8.55228 4 9 3.55228 9 3C9 2.44772 8.55228 2 8 2C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8 14C8.55228 14 9 13.5523 9 13C9 12.4477 8.55228 12 8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                <!-- Dropdown Menu -->
                <div
                  v-show="openDropdown === chat.id"
                  class="dropdown-menu absolute right-0 top-full mt-1 z-10 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  <button
                    @click="editChat(chat.id)"
                    class="flex w-full items-center px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteChat(chat.id)"
                    class="flex w-full items-center px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <button
            @click="showMore = !showMore"
            v-show="showMore"
            class="mt-3 flex w-full items-center justify-center pl-3 text-xs text-gray-400 uppercase hover:text-gray-600 dark:hover:text-gray-300"
          >
            <span>Show Less</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="ml-1 rotate-180"
            >
              <path
                d="M3.83331 6.41669L7.99998 10.5834L12.1666 6.41669"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

// Inject sidebar state from parent AiLayout
const aiSidebar = inject('aiSidebar')
const { isSidebarOpen, closeSidebar } = aiSidebar || {
  isSidebarOpen: ref(false),
  closeSidebar: () => {},
}

// Local reactive state
const searchQuery = ref('')
const showMore = ref(false)
const openDropdown = ref(null)

// Chat data
const chats = ref({
  today: [
    { id: 1, title: 'Write a follow-up email to a client' },
    { id: 2, title: 'Generate responsive login form layout' },
    { id: 3, title: 'Create a warning state modal' },
    { id: 4, title: 'Suggest color palette for dark theme' },
  ],
  yesterday: [
    { id: 5, title: 'Improve login page accessibility' },
    { id: 6, title: 'Create a warning state modal with animation' },
    { id: 7, title: 'Add password visibility toggle' },
    { id: 8, title: 'Write validation logic for login form...' },
    { id: 9, title: 'Fix mobile responsiveness of login UI...' },
  ],
  lastWeek: [
    { id: 10, title: 'Improve login page accessibility' },
    { id: 11, title: 'Build a dashboard component' },
  ],
})

// Methods
const startNewChat = () => {
  console.log('Starting new chat...')
  closeDropdown() // Close any open dropdown
  // Add logic to start a new chat
}

const toggleDropdown = (id) => {
  openDropdown.value = openDropdown.value === id ? null : id
}

const closeDropdown = () => {
  openDropdown.value = null
}

const editChat = (id) => {
  console.log('Editing chat:', id)
  closeDropdown()
  // Add edit logic here
}

const deleteChat = (id) => {
  console.log('Deleting chat:', id)
  closeDropdown()
  // Add delete logic here

  // Remove chat from appropriate array
  Object.keys(chats.value).forEach((period) => {
    chats.value[period] = chats.value[period].filter((chat) => chat.id !== id)
  })
}

// Handle click outside to close dropdown
const handleClickOutside = (event) => {
  // Check if the click is outside any dropdown
  const dropdowns = document.querySelectorAll('.dropdown-menu')
  const dropdownButtons = document.querySelectorAll('.dropdown-button')

  let isOutside = true

  // Check if click is on dropdown button or inside dropdown
  dropdownButtons.forEach((button) => {
    if (button.contains(event.target)) {
      isOutside = false
    }
  })

  dropdowns.forEach((dropdown) => {
    if (dropdown.contains(event.target)) {
      isOutside = false
    }
  })

  if (isOutside) {
    closeDropdown()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Remove the old v-click-outside directive as we're handling it differently
</script>
