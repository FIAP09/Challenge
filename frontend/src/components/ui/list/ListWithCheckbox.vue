<template>
  <div
    class="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] sm:w-fit"
  >
    <ul class="flex flex-col">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-gray-800"
      >
        <div>
          <label
            :for="`listCheckbox${index}`"
            class="flex items-center text-sm text-gray-500 cursor-pointer select-none dark:text-gray-400"
          >
            <span class="relative">
              <input
                type="checkbox"
                :id="`listCheckbox${index}`"
                class="sr-only"
                v-model="item.checked"
              />
              <span
                :class="
                  item.checked
                    ? 'border-brand-500 bg-brand-500'
                    : 'bg-transparent border-gray-300 dark:border-gray-700'
                "
                class="flex items-center justify-center w-4 h-4 mr-2 border rounded-sm"
              >
                <span :class="item.checked ? '' : 'opacity-0'">
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
            {{ item.label }}
          </label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface CheckboxItem {
  label: string
  checked: boolean
}

const items = ref<CheckboxItem[]>([
  { label: 'Lorem ipsum dolor sit amet', checked: false },
  { label: 'It is a long established fact reader', checked: false },
  { label: 'Lorem ipsum dolor sit amet', checked: false },
  { label: 'Lorem ipsum dolor sit amet', checked: false },
  { label: 'Lorem ipsum dolor sit amet', checked: false },
])
</script>
