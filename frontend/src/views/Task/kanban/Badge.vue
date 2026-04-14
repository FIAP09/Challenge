<template>
  <div class="flex items-center h-6 px-3 text-xs font-semibold rounded-full" :class="badgeClasses">
    <span class="w-2 h-2 mr-1 rounded-full" :class="dotClass"></span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'teal',
    validator: (value) => ['teal', 'purple', 'blue', 'green'].includes(value),
  },
})

const badgeClasses = computed(() => ({
  'bg-teal-100 text-teal-700': props.color === 'teal',
  'bg-purple-100 text-purple-700': props.color === 'purple',
  'bg-blue-100 text-blue-700': props.color === 'blue',
  'bg-green-100 text-green-700': props.color === 'green',
}))

const dotClass = computed(() => ({
  'bg-teal-400': props.color === 'teal',
  'bg-purple-400': props.color === 'purple',
  'bg-blue-400': props.color === 'blue',
  'bg-green-400': props.color === 'green',
}))
</script>
