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
            :for="`listRadio${index}`"
            class="flex items-center text-sm text-gray-500 cursor-pointer select-none dark:text-gray-400"
          >
            <span class="relative">
              <input
                type="radio"
                :id="`listRadio${index}`"
                :value="item.value"
                v-model="selectedValue"
                class="sr-only"
              />
              <span
                :class="
                  selectedValue === item.value
                    ? 'border-brand-500 bg-brand-500'
                    : 'bg-transparent border-gray-300 dark:border-gray-700'
                "
                class="flex items-center justify-center w-4 h-4 mr-2 border rounded-full"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="selectedValue === item.value ? 'bg-white' : 'bg-white dark:bg-[#1e2636]'"
                ></span>
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

interface RadioItem {
  label: string
  value: string
}

const items = ref<RadioItem[]>([
  { label: 'Lorem ipsum dolor sit amet', value: 'option1' },
  { label: 'It is a long established fact reader', value: 'option2' },
  { label: 'Lorem ipsum dolor sit amet', value: 'option3' },
  { label: 'Lorem ipsum dolor sit amet', value: 'option4' },
  { label: 'Lorem ipsum dolor sit amet', value: 'option5' },
])

const selectedValue = ref('')
</script>
