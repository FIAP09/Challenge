<template>
  <div
    class="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <!-- Header -->
    <div
      class="flex flex-col justify-between gap-3 p-4 border-b border-gray-200 dark:border-gray-800 sm:flex-row"
    >
      <!-- Action buttons -->
      <div class="flex items-center w-full gap-2">
        <!-- Checkbox dropdown -->
        <div class="relative w-full sm:w-auto">
          <button
            @click="openDropDown = !openDropDown"
            class="flex items-center justify-between w-full gap-3 p-3 border border-gray-200 rounded-lg dark:border-gray-800 sm:justify-center"
            :class="
              openDropDown
                ? 'text-gray-700 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
            "
          >
            <label
              for="checkboxAll"
              class="flex items-center font-medium cursor-pointer select-none"
            >
              <span class="relative">
                <input
                  type="checkbox"
                  id="checkboxAll"
                  class="sr-only tableCheckbox"
                  @change="toggleAll"
                  :checked="allChecked"
                />
                <span
                  class="flex items-center justify-center w-4 h-4 text-white bg-transparent border border-gray-300 rounded-sm box dark:border-gray-700"
                >
                  <span :class="allChecked ? 'opacity-100' : 'opacity-0'">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="white"
                        stroke-width="1.6666"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </label>
            <span
              :class="openDropDown && 'rotate-180'"
              class="text-gray-500 duration-300 ease-linear dark:text-gray-400"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.83325 5.91699L7.99992 10.0837L12.1666 5.91699"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
          <div
            v-if="openDropDown"
            class="absolute left-0 z-40 w-40 p-2 mt-1 space-y-1 bg-white border border-gray-200 top-full rounded-2xl shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
          >
            <button
              v-for="option in dropdownOptions"
              :key="option"
              class="flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <!-- Other action buttons -->
        <button
          v-for="(action, index) in actionButtons"
          :key="index"
          class="flex items-center justify-center w-full h-10 text-gray-500 transition-colors border border-gray-200 rounded-lg max-w-10 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          <component :is="action.icon" />
        </button>

        <!-- More options dropdown -->
        <div class="relative w-full max-w-10">
          <button
            @click="openMoreOptions = !openMoreOptions"
            class="flex items-center justify-center w-full h-10 transition-colors border border-gray-200 rounded-lg max-w-10 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
            :class="
              openMoreOptions
                ? 'text-gray-700 dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
            "
          >
            <svg
              class="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                fill=""
              />
            </svg>
          </button>
          <div
            v-if="openMoreOptions"
            class="absolute right-0 z-40 w-40 p-2 mt-1 space-y-1 transition-colors bg-white border border-gray-200 top-full rounded-2xl shadow-theme-lg dark:border-gray-800 dark:bg-gray-800"
          >
            <button
              v-for="option in moreOptions"
              :key="option"
              class="flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>

      <!-- Search bar -->
      <div class="w-full sm:max-w-[236px]">
        <form>
          <div class="relative">
            <span class="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
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
              type="text"
              placeholder="Search..."
              class="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pl-[42px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>
        </form>
      </div>
    </div>

    <!-- Email list -->
    <Simplebar class="max-h-[510px] 2xl:max-h-[605px]" data-simplebar-auto-hide="false">
      <div>
        <div
          v-for="(item, index) in mails"
          :key="index"
          class="flex cursor-pointer items-center border-b border-gray-200 px-4 py-4 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/[0.03]"
        >
          <div class="flex items-center w-3/5 sm:w-1/5">
            <label :for="'checkbox-' + index" class="cursor-pointer select-none">
              <span class="relative">
                <input
                  type="checkbox"
                  :id="'checkbox-' + index"
                  class="sr-only tableCheckbox"
                  @change="toggleItem(index)"
                  :checked="itemsChecked[index]"
                />
                <span
                  class="flex items-center justify-center w-4 h-4 mr-3 text-white bg-transparent border border-gray-300 rounded-sm box dark:border-gray-700"
                >
                  <span :class="itemsChecked[index] ? 'opacity-100' : 'opacity-0'">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="white"
                        stroke-width="1.6666"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </label>

            <div class="flex items-center">
              <span class="pr-3 text-gray-400" @click="toggleStar(index)">
                <svg
                  class="fill-current"
                  :class="item.isStarred ? 'hidden' : 'block'"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.99993 2.375C10.2854 2.375 10.5461 2.53707 10.6725 2.79308L12.7318 6.96563L17.3365 7.63473C17.619 7.67578 17.8537 7.87367 17.9419 8.14517C18.0301 8.41668 17.9565 8.71473 17.7521 8.914L14.4201 12.1619L15.2067 16.748C15.255 17.0293 15.1393 17.3137 14.9083 17.4815C14.6774 17.6493 14.3712 17.6714 14.1185 17.5386L9.99993 15.3733L5.88137 17.5386C5.62869 17.6714 5.32249 17.6493 5.09153 17.4815C4.86057 17.3137 4.7449 17.0293 4.79316 16.748L5.57974 12.1619L2.24775 8.914C2.04332 8.71473 1.96975 8.41668 2.05797 8.14517C2.14619 7.87367 2.3809 7.67578 2.66341 7.63473L7.2681 6.96563L9.32738 2.79308C9.45373 2.53707 9.71445 2.375 9.99993 2.375ZM9.99993 4.81966L8.4387 7.98306C8.32946 8.20442 8.11828 8.35785 7.874 8.39334L4.38298 8.90062L6.90911 11.363C7.08587 11.5353 7.16653 11.7835 7.1248 12.0268L6.52847 15.5037L9.65093 13.8622C9.86942 13.7473 10.1304 13.7473 10.3489 13.8622L13.4714 15.5037L12.8751 12.0268C12.8333 11.7835 12.914 11.5353 13.0908 11.363L15.6169 8.90062L12.1259 8.39334C11.8816 8.35785 11.6704 8.20442 11.5612 7.98306L9.99993 4.81966Z"
                    fill=""
                  />
                </svg>
                <svg
                  v-if="item.isStarred"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99991 3.125L12.2337 7.65114L17.2286 8.37694L13.6142 11.9L14.4675 16.8747L9.99991 14.526L5.53235 16.8747L6.38558 11.9L2.77124 8.37694L7.76613 7.65114L9.99991 3.125Z"
                    fill="#FDB022"
                  />
                </svg>
              </span>

              <span class="text-sm text-gray-700 truncate dark:text-gray-400">
                {{ item.subject }}
              </span>
            </div>
          </div>
          <div class="flex items-center w-1/5 gap-3 sm:w-3/5">
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">{{ item.content }}</p>

            <span
              v-if="item.badge"
              class="hidden rounded-full px-2 py-0.5 text-theme-xs font-medium sm:inline-block"
              :class="getBadgeClass(item.badge)"
            >
              {{ item.badge }}
            </span>
          </div>
          <div class="w-1/5">
            <span class="block text-right text-gray-400 text-theme-xs">{{ item.time }}</span>
          </div>
        </div>
      </div>
    </Simplebar>

    <!-- Pagination -->
    <div
      class="sticky bottom-0 flex items-center rounded-b-2xl justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-[#171f2f]"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">Showing 1 of 159</p>
      <div class="flex items-center justify-end gap-2">
        <button
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          <svg
            class="stroke-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
              stroke=""
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.03]"
        >
          <svg
            class="stroke-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.29167 15.8335L12.5 10.6252L7.29167 5.41683"
              stroke=""
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TrashIcon, ArchiveIcon, RefreshIcon } from '@/icons'
import Simplebar from 'simplebar-vue'

const allChecked = ref(false)
const openDropDown = ref(false)
const openMoreOptions = ref(false)
const itemsChecked = ref([])

const mails = ref([
  {
    subject: 'Material UI',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: '12:16 pm',
    badge: 'Important',
    isStarred: false,
  },
  {
    subject: 'Wise',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: '12:16 pm',
    isStarred: false,
  },
  {
    subject: 'Search Console',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Apr, 24',
    badge: 'Social',
    isStarred: false,
  },
  {
    subject: 'Paypal',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Apr, 20',
    isStarred: false,
  },
  {
    subject: 'Google Meet',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Apr, 16',
    isStarred: false,
  },
  {
    subject: 'Loom',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Mar, 10',
    isStarred: false,
  },
  {
    subject: 'Airbnb',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Mar, 05',
    isStarred: false,
  },
  {
    subject: 'Facebook',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Feb, 25',
    isStarred: false,
  },
  {
    subject: 'Instagram',
    badge: 'Promotional',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Feb, 25',
    isStarred: false,
  },
  {
    subject: 'Google',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Feb, 25',
    isStarred: false,
  },
  {
    subject: 'Formbold',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Feb, 25',
    isStarred: false,
  },
  {
    subject: 'Graygrid',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Feb, 25',
    isStarred: false,
  },
  {
    subject: 'Uideck',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dolor dolore esse modi nesciunt, nobis numquam sed sequi sunt totam!',
    time: 'Feb, 25',
    isStarred: false,
  },
  // ... (other mail items)
])

const dropdownOptions = ['All', 'Read', 'Unread']
const moreOptions = ['View More', 'Delete']

const actionButtons = [{ icon: RefreshIcon }, { icon: TrashIcon }, { icon: ArchiveIcon }]

const toggleAll = () => {
  allChecked.value = !allChecked.value
  itemsChecked.value = mails.value.map(() => allChecked.value)
}

const toggleItem = (index) => {
  itemsChecked.value[index] = !itemsChecked.value[index]
}

const toggleStar = (index) => {
  mails.value[index].isStarred = !mails.value[index].isStarred
}

const getBadgeClass = (badge) => {
  switch (badge) {
    case 'Important':
      return 'text-error-700 dark:text-error-500 bg-error-50 dark:bg-error-500/15'
    case 'Social':
      return 'text-success-700 dark:text-success-500 bg-success-50 dark:bg-success-500/15'
    case 'Promotional':
      return 'text-brand-500 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/15'
    default:
      return ''
  }
}

onMounted(() => {
  itemsChecked.value = mails.value.map(() => false)
})
</script>
