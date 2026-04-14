<template>
  <div class="flex items-center justify-between gap-2 px-6 py-4 sm:justify-normal">
    <button
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1"
      class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 sm:p-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>
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
            d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z"
            fill=""
          />
        </svg>
      </span>
    </button>

    <span class="block text-sm font-medium text-gray-700 dark:text-gray-400 sm:hidden">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <ul class="hidden items-center gap-0.5 sm:flex">
      <li v-for="item in pageNumbers" :key="item.key">
        <a
          v-if="item.type === 'page'"
          href="#"
          @click.prevent="handlePageChange(item.value)"
          :class="[
            'flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg',
            currentPage === item.value
              ? 'text-white bg-brand-500 hover:bg-brand-600'
              : 'text-gray-700 hover:bg-brand-500 hover:text-white dark:text-gray-400 dark:hover:text-white',
          ]"
        >
          {{ item.value }}
        </a>
        <span
          v-else
          class="flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          ...
        </span>
      </li>
    </ul>

    <button
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 sm:p-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>
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
            d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z"
            fill=""
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface PaginationProps {
  totalPages: number
  initialPage?: number
  onPageChange?: (page: number) => void
}

interface PageItem {
  type: 'page' | 'ellipsis'
  value: number
  key: string
}

const props = withDefaults(defineProps<PaginationProps>(), {
  initialPage: 1,
})

const emit = defineEmits(['pageChange'])

const currentPage = ref(props.initialPage)

const handlePageChange = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  currentPage.value = page
  emit('pageChange', page)
}

const pageNumbers = computed((): PageItem[] => {
  const numbers: PageItem[] = []
  const maxVisiblePages = 7

  if (props.totalPages <= maxVisiblePages) {
    for (let i = 1; i <= props.totalPages; i++) {
      numbers.push({ type: 'page', value: i, key: `page-${i}` })
    }
  } else {
    numbers.push({ type: 'page', value: 1, key: 'page-1' })
    if (currentPage.value > 3) numbers.push({ type: 'ellipsis', value: 1, key: 'ellipsis-1' })

    let start = Math.max(2, currentPage.value - 1)
    let end = Math.min(props.totalPages - 1, currentPage.value + 1)

    if (currentPage.value <= 3) end = 5
    if (currentPage.value >= props.totalPages - 2) start = props.totalPages - 4

    for (let i = start; i <= end; i++) {
      numbers.push({ type: 'page', value: i, key: `page-${i}` })
    }

    if (currentPage.value < props.totalPages - 2)
      numbers.push({ type: 'ellipsis', value: props.totalPages, key: 'ellipsis-2' })
    numbers.push({ type: 'page', value: props.totalPages, key: `page-${props.totalPages}` })
  }

  return numbers
})

watch(
  () => props.initialPage,
  (newValue) => {
    currentPage.value = newValue
  },
)
</script>
