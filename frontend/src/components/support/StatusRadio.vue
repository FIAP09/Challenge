<template>
  <label
    class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400"
  >
    <div class="relative">
      <input
        type="radio"
        :id="value"
        :value="value"
        :checked="modelValue === value"
        @change="$emit('update:modelValue', value)"
        class="sr-only"
      />
      <div
        :class="
          modelValue === value
            ? 'border-brand-500 bg-brand-500'
            : 'bg-transparent border-gray-300 dark:border-gray-700'
        "
        class="hover:border-brand-500 dark:hover:border-brand-500 mr-3 flex h-4 w-4 items-center justify-center rounded-full border-[1.25px]"
      >
        <span
          class="h-1.5 w-1.5 rounded-full"
          :class="modelValue === value ? 'bg-white' : 'bg-white dark:bg-[#171f2e]'"
        ></span>
      </div>
    </div>
    {{ label }}
  </label>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
  modelValue: String,
})

defineEmits(['update:modelValue'])
</script>
