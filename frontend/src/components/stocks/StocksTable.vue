<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div
      class="flex flex-col gap-2 px-5 mb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Latest Transactions</h3>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
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
              class="dark:bg-dark-900 h-[42px] w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
            />
          </div>
        </form>

        <!-- Datepicker -->

        <!-- Datepicker -->
      </div>
    </div>

    <div class="w-full px-5 overflow-x-auto sm:px-6">
      <table class="min-w-full">
        <!-- Table Header -->
        <thead>
          <tr class="border-gray-100 border-y dark:border-gray-800">
            <th v-for="header in tableHeaders" class="py-3 font-normal text-left" :key="header">
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ header }}</p>
            </th>
          </tr>
        </thead>

        <!-- Table Body -->

        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td class="py-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8">
                  <img :src="item.image" :alt="item.name" />
                </div>
                <div>
                  <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </td>

            <td class="py-4">
              <div class="flex items-center">
                <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ item.date }}</p>
              </div>
            </td>
            <td class="py-4">
              <div class="flex items-center">
                <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ item.price }}</p>
              </div>
            </td>
            <td class="py-4">
              <div class="flex items-center">
                <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ item.category }}</p>
              </div>
            </td>
            <td class="py-4">
              <div class="flex items-center">
                <p :class="statusClasses(item.status)">
                  {{ item.status }}
                </p>
              </div>
            </td>
            <td class="py-4">
              <div class="flex items-center justify-center">
                <DropdownMenu :menu-items="menuItems">
                  <template #icon>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
                        fill="currentColor"
                      />
                    </svg>
                  </template>
                </DropdownMenu>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 sm:px-3.5"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.58301 9.99868C2.58272 10.1909 2.65588 10.3833 2.80249 10.53L7.79915 15.5301C8.09194 15.8231 8.56682 15.8233 8.85981 15.5305C9.15281 15.2377 9.15297 14.7629 8.86018 14.4699L5.14009 10.7472L16.6675 10.7472C17.0817 10.7472 17.4175 10.4114 17.4175 9.99715C17.4175 9.58294 17.0817 9.24715 16.6675 9.24715L5.14554 9.24715L8.86017 5.53016C9.15297 5.23717 9.15282 4.7623 8.85983 4.4695C8.56684 4.1767 8.09197 4.17685 7.79917 4.46984L2.84167 9.43049C2.68321 9.568 2.58301 9.77087 2.58301 9.99715C2.58301 9.99766 2.58301 9.99817 2.58301 9.99868Z"
              fill="currentColor"
            />
          </svg>
          <span class="hidden sm:inline"> Previous</span>
        </button>

        <span class="block text-sm font-medium text-gray-700 dark:text-gray-400 sm:hidden">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <ul class="hidden items-center gap-0.5 sm:flex">
          <li v-for="page in displayedPages" :key="page">
            <a
              href="#"
              @click.prevent="goToPage(page)"
              :class="[
                'flex h-10 w-10 items-center justify-center rounded-lg text-theme-sm font-medium',
                currentPage === page
                  ? 'bg-brand-500/[0.08] text-brand-500 hover:bg-brand-500/[0.08] hover:text-brand-500 dark:text-brand-500 dark:hover:text-brand-500'
                  : 'text-gray-700 hover:bg-brand-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500',
              ]"
            >
              {{ page }}
            </a>
          </li>
        </ul>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 sm:px-3.5"
        >
          <span class="hidden sm:inline"> Next</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715C17.4175 9.99763 17.4175 9.99812 17.4175 9.9986Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]

const tableHeaders = ['Name', 'Date', 'Price', 'Category', 'Status', '']

const tableData = [
  {
    name: 'Bought PYPL',
    image: '/images/brand/brand-08.svg',
    date: 'Nov 23, 01:00 PM',
    price: '$2,567.88',
    category: 'Finance',
    status: 'Success',
  },
  {
    name: 'Bought AAPL',
    image: '/images/brand/brand-07.svg',
    date: 'Nov 22, 09:00 PM',
    price: '$3,987.45',
    category: 'Technology',
    status: 'Pending',
  },
  {
    name: 'Sell KKST',
    image: '/images/brand/brand-15.svg',
    date: 'Oct 12, 03:54 PM',
    price: '$6,754.99',
    category: 'Finance',
    status: 'Success',
  },
  {
    name: 'Bought FB',
    image: '/images/brand/brand-02.svg',
    date: 'Sep 09, 02:00 AM',
    price: '$1,445.41',
    category: 'Social media',
    status: 'Success',
  },
  {
    name: 'Sell AMZN',
    image: '/images/brand/brand-10.svg',
    date: 'Feb 35, 08:00 PM',
    price: '$5,698.55',
    category: 'E-commerce',
    status: 'Failed',
  },
  {
    name: 'Bought PYPLL',
    image: '/images/brand/brand-08.svg',
    date: 'Nov 23, 01:00 PM',
    price: '$2,567.88',
    category: 'Finance',
    status: 'Success',
  },
  {
    name: 'Bought AAPLL',
    image: '/images/brand/brand-07.svg',
    date: 'Nov 22, 09:00 PM',
    price: '$3,987.45',
    category: 'Technology',
    status: 'Pending',
  },
]

const statusClasses = (status) => {
  const baseClasses = 'rounded-full px-2 py-0.5 text-theme-xs font-medium'
  if (status === 'Success')
    return `${baseClasses} bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500`
  if (status === 'Pending')
    return `${baseClasses} bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400`
  if (status === 'Failed')
    return `${baseClasses} bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500`
  return baseClasses
}

const itemsPerPage = 5
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(tableData.length / itemsPerPage))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return tableData.slice(start, end)
})

const displayedPages = computed(() => {
  const range = []
  const rangeSize = 5
  const rangeStart = Math.max(1, currentPage.value - Math.floor(rangeSize / 2))
  const rangeEnd = Math.min(totalPages.value, rangeStart + rangeSize - 1)

  for (let i = rangeStart; i <= rangeEnd; i++) {
    range.push(i)
  }

  if (range[0] > 1) {
    range.unshift('...')
    range.unshift(1)
  }

  if (range[range.length - 1] < totalPages.value) {
    range.push('...')
    range.push(totalPages.value)
  }

  return range
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>
