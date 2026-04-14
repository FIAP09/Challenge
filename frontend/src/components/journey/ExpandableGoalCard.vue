<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import type { GoalItem } from '@/constants/patient-journey-content'
import { goalEntryRatingBadgeClass, goalEntryRatingLabel } from '@/constants/patient-journey-content'

const props = defineProps<{
  goal: GoalItem
  /** Ex.: "Você está em" ou "Está em" (acompanhante). */
  progressPrefix: string
}>()

const open = ref(false)
const hasDetails = computed(() => Boolean(props.goal.entries?.length))
</script>

<template>
  <article class="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
    <button
      type="button"
      class="flex w-full touch-manipulation items-start justify-between gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/80"
      :class="hasDetails ? '' : 'cursor-default hover:bg-transparent dark:hover:bg-transparent'"
      :aria-expanded="hasDetails ? open : undefined"
      @click="hasDetails && (open = !open)"
    >
      <div class="min-w-0 flex-1">
        <h3 class="font-semibold text-slate-700 dark:text-slate-100">{{ goal.title }}</h3>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Definido por {{ goal.professional }}</p>
        <div class="mt-3">
          <div class="mb-2 flex items-center justify-between text-sm">
            <span class="text-slate-500 dark:text-slate-400">{{ progressPrefix }}</span>
            <span class="font-semibold text-slate-700 dark:text-slate-100">
              {{ goal.current }} / {{ goal.target }} {{ goal.unit }}
            </span>
          </div>
          <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              class="h-2 rounded-full bg-[#FFE14D] transition-all duration-500"
              :style="{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }"
            />
          </div>
        </div>
      </div>
      <ChevronDown
        v-if="hasDetails"
        :size="22"
        class="mt-1 shrink-0 text-slate-400 transition-transform"
        :class="open ? 'rotate-180' : ''"
      />
    </button>

    <div
      v-if="hasDetails && open"
      class="border-t border-slate-200 px-4 pb-4 pt-2 dark:border-slate-700"
    >
      <p class="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Detalhes e avaliações
      </p>
      <ul class="space-y-3">
        <li
          v-for="entry in goal.entries"
          :key="entry.id"
          class="rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-600 dark:bg-slate-800/50"
        >
          <div class="flex flex-wrap items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="text-sm font-medium text-slate-800 dark:text-slate-100">{{ entry.title }}</p>
              <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{{ entry.date }} · {{ entry.evaluator }}</p>
            </div>
            <span class="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold" :class="goalEntryRatingBadgeClass(entry.rating)">
              {{ goalEntryRatingLabel(entry.rating) }}
            </span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ entry.notes }}</p>
        </li>
      </ul>
    </div>
  </article>
</template>
