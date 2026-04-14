<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const props = defineProps<{
  title: string
  badge?: string
  badgeClass?: string
  summary?: string
  criteria?: string[]
  meta?: string
}>()

const open = ref(false)
const hasBody = computed(() => Boolean(props.summary || (props.criteria?.length ?? 0) > 0))
</script>

<template>
  <li class="border-b border-slate-200 last:border-b-0 dark:border-slate-700">
    <button
      type="button"
      class="flex w-full touch-manipulation items-center justify-between gap-2 py-3 text-left transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
      :class="hasBody ? '' : 'cursor-default pointer-events-none hover:bg-transparent'"
      @click="hasBody && (open = !open)"
    >
      <span class="min-w-0 flex-1 text-sm text-slate-700 dark:text-slate-200">{{ title }}</span>
      <div class="flex shrink-0 items-center gap-2">
        <span v-if="badge" class="rounded-full px-2 py-0.5 text-[11px] font-semibold" :class="badgeClass">
          {{ badge }}
        </span>
        <ChevronDown
          v-if="hasBody"
          :size="18"
          class="text-slate-400 transition-transform"
          :class="open ? 'rotate-180' : ''"
        />
      </div>
    </button>
    <div v-if="hasBody && open" class="border-l-2 border-[#FFE14D]/70 pb-3 pl-3">
      <p v-if="meta" class="text-[11px] text-slate-500 dark:text-slate-400">{{ meta }}</p>
      <p v-if="summary" class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ summary }}</p>
      <ul v-if="criteria?.length" class="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-400">
        <li v-for="(c, i) in criteria" :key="i">{{ c }}</li>
      </ul>
    </div>
  </li>
</template>
