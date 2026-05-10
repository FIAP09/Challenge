<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
    <h3 class="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
      Registro Alimentar
    </h3>

    <div v-if="dateGroups.length === 0" class="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
      Nenhum registro alimentar
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="group in dateGroups"
        :key="group.date"
        class="rounded-lg border border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
      >
        <div class="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-700">
          <span class="text-sm font-medium text-gray-800 dark:text-white/90">
            {{ formatDate(group.date) }}
          </span>
          <span v-if="group.totalCalories > 0" class="flex items-center gap-1 text-xs font-medium text-[#0f2743] dark:text-[#FFE14D]">
            <Flame class="h-3.5 w-3.5" />
            {{ group.totalCalories }} kcal
          </span>
        </div>

        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div
            v-for="entry in group.entries"
            :key="entry.id"
            class="flex items-start justify-between gap-3 px-4 py-3"
          >
            <div class="min-w-0">
              <span class="mr-2 inline-block rounded bg-[#FFE14D]/20 px-1.5 py-0.5 text-xs font-medium text-[#0f2743] dark:bg-[#FFE14D]/10 dark:text-[#FFE14D]">
                {{ MEAL_TYPE_LABELS[entry.meal_type] }}
              </span>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {{ entry.description }}
              </p>
            </div>
            <span v-if="entry.calories" class="shrink-0 text-xs text-gray-400">
              {{ entry.calories }} kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Flame } from 'lucide-vue-next'
import type { DietEntry } from '@/types/bariatric'
import { MEAL_TYPE_LABELS } from '@/types/bariatric'

const props = defineProps<{
  entries: DietEntry[]
}>()

interface DateGroup {
  date: string
  entries: DietEntry[]
  totalCalories: number
}

const dateGroups = computed<DateGroup[]>(() => {
  const map = new Map<string, DietEntry[]>()
  for (const entry of props.entries) {
    const list = map.get(entry.date) ?? []
    list.push(entry)
    map.set(entry.date, list)
  }

  return Array.from(map.entries())
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .map(([date, entries]) => ({
      date,
      entries,
      totalCalories: entries.reduce((sum, e) => sum + (e.calories ?? 0), 0),
    }))
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>
