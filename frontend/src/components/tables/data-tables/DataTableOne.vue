<template>
  <div class="overflow-hidden rounded-xl bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div
      class="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex items-center gap-3">
        <span class="text-gray-500 dark:text-gray-400">Show</span>
        <div class="relative z-20">
          <select
            v-model="perPage"
            class="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          >
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
          <span
            class="absolute z-30 text-gray-500 -translate-y-1/2 pointer-events-none right-2 top-1/2 dark:text-gray-400"
          >
            <svg
              class="stroke-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                stroke=""
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <span class="text-gray-500 dark:text-gray-400">entries</span>
      </div>

      <div class="relative">
        <input
          v-model="search"
          type="text"
          placeholder="Search..."
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
        />
        <button class="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
          <svg
            class="fill-current"
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
        </button>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="border-t border-gray-100 dark:border-white/[0.05]">
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
            >
              <div
                class="flex items-center justify-between w-full cursor-pointer"
                @click="sortBy(column.key)"
              >
                <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                  {{ column.label }}
                </p>
                <span class="flex flex-col gap-0.5">
                  <svg
                    class="fill-gray-300 dark:fill-gray-700"
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                      fill=""
                    />
                  </svg>
                  <svg
                    class="fill-gray-300 dark:fill-gray-700"
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                      fill=""
                    />
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in paginatedData" :key="person.id" class="">
            <td class="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 overflow-hidden rounded-full">
                  <img :src="person.image" :alt="person.name" />
                </div>
                <div>
                  <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {{ person.name }}
                  </span>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ person.position }}</p>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ person.office }}</p>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ person.age }}</p>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ person.startDate }}</p>
            </td>
            <td class="px-4 py-3 border border-gray-100 dark:border-white/[0.05]">
              <p class="text-gray-700 text-theme-sm dark:text-gray-400">{{ person.salary }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div
      class="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]"
    >
      <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
        <p
          class="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left"
        >
          Showing {{ startEntry }} to {{ endEntry }} of {{ totalEntries }} entries
        </p>

        <div class="flex items-center justify-center gap-0.5 pt-4 xl:justify-end xl:pt-0">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="mr-2.5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            <svg
              class="fill-current"
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
                fill=""
              />
            </svg>
          </button>

          <button
            @click="goToPage(1)"
            :class="
              currentPage === 1
                ? 'bg-blue-500/[0.08] text-brand-500'
                : 'text-gray-700 dark:text-gray-400'
            "
            class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500"
          >
            1
          </button>

          <span v-if="startPage > 2" class="flex items-center justify-center w-10 h-10">...</span>

          <button
            v-for="page in pageRange"
            :key="page"
            @click="goToPage(page)"
            :class="
              currentPage === page
                ? 'bg-blue-500/[0.08] text-brand-500'
                : 'text-gray-700 dark:text-gray-400'
            "
            class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500"
          >
            {{ page }}
          </button>

          <span v-if="endPage < totalPages - 1" class="flex items-center justify-center w-10 h-10"
            >...</span
          >

          <button
            v-if="totalPages > 1"
            @click="goToPage(totalPages)"
            :class="
              currentPage === totalPages
                ? 'bg-blue-500/[0.08] text-brand-500'
                : 'text-gray-700 dark:text-gray-400'
            "
            class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500"
          >
            {{ totalPages }}
          </button>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="ml-2.5 flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
            <svg
              class="fill-current"
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
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const sortColumn = ref('name')
const sortDirection = ref('asc')
const currentPage = ref(1)
const perPage = ref(10)

const columns = [
  { key: 'name', label: 'User' },
  { key: 'position', label: 'Position' },
  { key: 'office', label: 'Office' },
  { key: 'age', label: 'Age' },
  { key: 'startDate', label: 'Start date' },
  { key: 'salary', label: 'Salary' },
]

const data = [
  {
    id: 1,
    name: 'Lindsey Curtis',
    image: '/images/user/user-17.jpg',
    position: 'Sales Assistant',
    office: 'New York',
    age: 33,
    startDate: '12 Feb, 2027',
    salary: '$168,500',
  },
  {
    id: 2,
    name: 'Kaiya George',
    image: '/images/user/user-18.jpg',
    position: 'Sales Assistant',
    office: 'San Francisco',
    age: 66,
    startDate: '13 Mar, 2027',
    salary: '$23,500',
  },
  {
    id: 3,
    name: 'Zain Geidt',
    image: '/images/user/user-19.jpg',
    position: 'Sales Assistant',
    office: 'Tokyo',
    age: 48,
    startDate: '19 Mar, 2027',
    salary: '$12,500',
  },
  {
    id: 4,
    name: 'Abram Schleifer',
    image: '/images/user/user-20.jpg',
    position: 'Sales Assistant',
    office: 'Edinburgh',
    age: 57,
    startDate: '25 Apr, 2027',
    salary: '$89,500',
  },
  {
    id: 5,
    name: 'Carla George',
    image: '/images/user/user-21.jpg',
    position: 'Sales Assistant',
    office: 'London',
    age: 45,
    startDate: '11 May, 2027',
    salary: '$15,500',
  },
  {
    id: 6,
    name: 'Emery Culhane',
    image: '/images/user/user-22.jpg',
    position: 'Sales Assistant',
    office: 'New York',
    age: 45,
    startDate: '29 Jun, 2027',
    salary: '$23,500',
  },
  {
    id: 7,
    name: 'Livia Donin',
    image: '/images/user/user-23.jpg',
    position: 'Sales Assistant',
    office: 'London',
    age: 26,
    startDate: '22 Jul, 2027',
    salary: '$$58,500',
  },
  {
    id: 8,
    name: 'Miracle Bator',
    image: '/images/user/user-24.jpg',
    position: 'Sales Assistant',
    office: 'Tokyo',
    age: 38,
    startDate: '05 Aug, 2027',
    salary: '$34,900',
  },
  {
    id: 9,
    name: 'Lincoln Herwitz',
    image: '/images/user/user-25.jpg',
    position: 'Sales Assistant',
    office: 'London',
    age: 34,
    startDate: '09 Sep, 2027',
    salary: '$18,300',
  },
  {
    id: 10,
    name: 'Ekstrom Bothman',
    image: '/images/user/user-26.jpg',
    position: 'Sales Assistant',
    office: 'San Francisco',
    age: 53,
    startDate: '15 Nov, 2027',
    salary: '$19,200',
  },
  {
    id: 11,
    name: 'Lindsey Curtis',
    image: '/images/user/user-17.jpg',
    position: 'Sales Assistant',
    office: 'New York',
    age: 33,
    startDate: '12 Feb, 2027',
    salary: '$168,500',
  },
  {
    id: 12,
    name: 'Kaiya George',
    image: '/images/user/user-18.jpg',
    position: 'Sales Assistant',
    office: 'San Francisco',
    age: 66,
    startDate: '13 Mar, 2027',
    salary: '$23,500',
  },
  {
    id: 13,
    name: 'Zain Geidt',
    image: '/images/user/user-19.jpg',
    position: 'Sales Assistant',
    office: 'Tokyo',
    age: 48,
    startDate: '19 Mar, 2027',
    salary: '$12,500',
  },
  {
    id: 14,
    name: 'Abram Schleifer',
    image: '/images/user/user-20.jpg',
    position: 'Sales Assistant',
    office: 'Edinburgh',
    age: 57,
    startDate: '25 Apr, 2027',
    salary: '$89,500',
  },
  {
    id: 15,
    name: 'Carla George',
    image: '/images/user/user-21.jpg',
    position: 'Sales Assistant',
    office: 'London',
    age: 45,
    startDate: '11 May, 2027',
    salary: '$15,500',
  },
  {
    id: 16,
    name: 'Emery Culhane',
    image: '/images/user/user-22.jpg',
    position: 'Sales Assistant',
    office: 'New York',
    age: 45,
    startDate: '29 Jun, 2027',
    salary: '$23,500',
  },
  {
    id: 17,
    name: 'Livia Donin',
    image: '/images/user/user-23.jpg',
    position: 'Sales Assistant',
    office: 'London',
    age: 26,
    startDate: '22 Jul, 2027',
    salary: '$$58,500',
  },
  {
    id: 18,
    name: 'Miracle Bator',
    image: '/images/user/user-24.jpg',
    position: 'Sales Assistant',
    office: 'Tokyo',
    age: 38,
    startDate: '05 Aug, 2027',
    salary: '$34,900',
  },
  {
    id: 19,
    name: 'Lincoln Herwitz',
    image: '/images/user/user-25.jpg',
    position: 'Sales Assistant',
    office: 'London',
    age: 34,
    startDate: '09 Sep, 2027',
    salary: '$18,300',
  },
  {
    id: 20,
    name: 'Ekstrom Bothman',
    image: '/images/user/user-26.jpg',
    position: 'Sales Assistant',
    office: 'San Francisco',
    age: 53,
    startDate: '15 Nov, 2027',
    salary: '$19,200',
  },
  {
    id: 21,
    name: 'Lindsey Curtis',
    image: '/images/user/user-17.jpg',
    position: 'Sales Assistant',
    office: 'New York',
    age: 33,
    startDate: '12 Feb, 2027',
    salary: '$168,500',
  },
  {
    id: 22,
    name: 'Kaiya George',
    image: '/images/user/user-18.jpg',
    position: 'Sales Assistant',
    office: 'San Francisco',
    age: 66,
    startDate: '13 Mar, 2027',
    salary: '$23,500',
  },
  {
    id: 23,
    name: 'Zain Geidt',
    image: '/images/user/user-19.jpg',
    position: 'Sales Assistant',
    office: 'Tokyo',
    age: 48,
    startDate: '19 Mar, 2027',
    salary: '$12,500',
  },
  {
    id: 24,
    name: 'Abram Schleifer',
    image: '/images/user/user-20.jpg',
    position: 'Sales Assistant',
    office: 'Edinburgh',
    age: 57,
    startDate: '25 Apr, 2027',
    salary: '$89,500',
  },
  {
    id: 25,
    name: 'Carla George',
    image: '/images/user/user-21.jpg',
    position: 'Sales Assistant',
    office: 'London',
    age: 45,
    startDate: '11 May, 2027',
    salary: '$15,500',
  },
  {
    id: 26,
    name: 'Emery Culhane',
    image: '/images/user/user-22.jpg',
    position: 'Sales Assistant',
    office: 'New York',
    age: 45,
    startDate: '29 Jun, 2027',
    salary: '$23,500',
  },
  {
    id: 27,
    name: 'Livia Donin',
    image: '/images/user/user-23.jpg',
    position: 'Sales Assistant',
    office: 'London',
    age: 26,
    startDate: '22 Jul, 2027',
    salary: '$$58,500',
  },
  {
    id: 28,
    name: 'Miracle Bator',
    image: '/images/user/user-24.jpg',
    position: 'Sales Assistant',
    office: 'Tokyo',
    age: 38,
    startDate: '05 Aug, 2027',
    salary: '$34,900',
  },
  {
    id: 29,
    name: 'Lincoln Herwitz',
    image: '/images/user/user-25.jpg',
    position: 'Sales Assistant',
    office: 'London',
    age: 34,
    startDate: '09 Sep, 2027',
    salary: '$18,300',
  },
  {
    id: 30,
    name: 'Ekstrom Bothman',
    image: '/images/user/user-26.jpg',
    position: 'Sales Assistant',
    office: 'San Francisco',
    age: 53,
    startDate: '15 Nov, 2027',
    salary: '$19,200',
  },
]

const filteredData = computed(() => {
  const searchLower = search.value.toLowerCase()
  return data
    .filter(
      (person) =>
        person.name.toLowerCase().includes(searchLower) ||
        person.position.toLowerCase().includes(searchLower) ||
        person.office.toLowerCase().includes(searchLower),
    )
    .sort((a, b) => {
      let modifier = sortDirection.value === 'asc' ? 1 : -1
      if (a[sortColumn.value] < b[sortColumn.value]) return -1 * modifier
      if (a[sortColumn.value] > b[sortColumn.value]) return 1 * modifier
      return 0
    })
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredData.value.slice(start, end)
})

const totalEntries = computed(() => filteredData.value.length)

const startEntry = computed(() => (currentPage.value - 1) * perPage.value + 1)

const endEntry = computed(() => {
  const end = currentPage.value * perPage.value
  return end > totalEntries.value ? totalEntries.value : end
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / perPage.value))

const pageRange = computed(() => {
  const range = []
  const maxPagesToShow = 5 // Adjust this value to show more or fewer pages

  let startPage = Math.max(2, currentPage.value - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(totalPages.value - 1, startPage + maxPagesToShow - 1)

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(2, endPage - maxPagesToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    range.push(i)
  }

  return range
})

const startPage = computed(() => pageRange.value[0] || 2)
const endPage = computed(() => pageRange.value[pageRange.value.length - 1] || totalPages.value - 1)

const pagesAroundCurrent = computed(() => {
  let pages = []
  const startPage = Math.max(2, currentPage.value - 2)
  const endPage = Math.min(totalPages.value - 1, currentPage.value + 2)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortDirection.value = 'asc'
    sortColumn.value = column
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
