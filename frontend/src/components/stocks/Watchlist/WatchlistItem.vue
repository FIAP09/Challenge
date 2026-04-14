<template>
  <div
    class="flex items-center justify-between pt-4 pb-4 border-b border-gray-200 first:pt-0 last:border-b-0 last:pb-0 dark:border-gray-800"
  >
    <div class="flex items-center gap-3">
      <div class="w-10 h-10">
        <img :src="item.logo" :alt="item.name" />
      </div>
      <div>
        <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">{{ item.symbol }}</h3>
        <span class="block text-gray-500 text-theme-xs dark:text-gray-400">{{ item.name }}</span>
      </div>
    </div>
    <div>
      <div>
        <h4 class="mb-1 font-medium text-right text-gray-700 text-theme-sm dark:text-gray-400">
          {{ item.price }}
        </h4>
      </div>
      <span
        class="flex items-center justify-end gap-1 font-medium text-theme-xs"
        :class="
          item.change >= 0
            ? 'text-success-600 dark:text-success-500'
            : 'text-error-600 dark:text-error-500'
        "
      >
        <svg
          class="fill-current"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            :d="
              item.change >= 0
                ? 'M5.56462 1.62394C5.70193 1.47073 5.90135 1.37433 6.12329 1.37433C6.1236 1.37433 6.12391 1.37433 6.12422 1.37433C6.31631 1.37416 6.50845 1.44732 6.65505 1.59381L9.65514 4.59181C9.94814 4.8846 9.94831 5.35947 9.65552 5.65247C9.36273 5.94546 8.88785 5.94563 8.59486 5.65284L6.87329 3.93248L6.87329 10.125C6.87329 10.5392 6.53751 10.875 6.12329 10.875C5.70908 10.875 5.37329 10.5392 5.37329 10.125L5.37329 3.93579L3.65516 5.65282C3.36218 5.94562 2.8873 5.94547 2.5945 5.65249C2.3017 5.3595 2.30185 4.88463 2.59484 4.59183L5.56462 1.62394Z'
                : 'M5.31462 10.3761C5.45194 10.5293 5.65136 10.6257 5.87329 10.6257C5.8736 10.6257 5.8739 10.6257 5.87421 10.6257C6.0663 10.6259 6.25845 10.5527 6.40505 10.4062L9.40514 7.4082C9.69814 7.11541 9.69831 6.64054 9.40552 6.34754C9.11273 6.05454 8.63785 6.05438 8.34486 6.34717L6.62329 8.06753L6.62329 1.875C6.62329 1.46079 6.28751 1.125 5.87329 1.125C5.45908 1.125 5.12329 1.46079 5.12329 1.875L5.12329 8.06422L3.40516 6.34719C3.11218 6.05439 2.6373 6.05454 2.3445 6.34752C2.0517 6.64051 2.05185 7.11538 2.34484 7.40818L5.31462 10.3761Z'
            "
            fill=""
          />
        </svg>
        {{ Math.abs(item.change).toFixed(2) }}%
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
