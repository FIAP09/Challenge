<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        Registro de Atividades
      </h3>
      <div v-if="sorted.length > 0" class="flex items-center gap-2 rounded-lg bg-[#FFE14D]/15 px-3 py-1.5">
        <Activity class="h-4 w-4 text-[#0f2743] dark:text-[#FFE14D]" />
        <span class="text-sm font-medium text-[#0f2743] dark:text-[#FFE14D]">
          Semana: {{ weeklyTotal }} min
        </span>
      </div>
    </div>

    <div v-if="sorted.length === 0" class="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
      Nenhuma atividade registrada
    </div>

    <div v-else class="space-y-2">
      <div
        v-for="entry in sorted"
        :key="entry.id"
        class="flex items-center gap-4 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
      >
        <span class="shrink-0 text-xs text-gray-400 dark:text-gray-500">
          {{ formatDate(entry.date) }}
        </span>

        <span class="text-sm font-medium text-gray-800 dark:text-white/90">
          {{ entry.type }}
        </span>

        <span class="flex items-center gap-1 rounded-full bg-[#0f2743]/10 px-2 py-0.5 text-xs font-medium text-[#0f2743] dark:bg-white/10 dark:text-white/80">
          <Clock class="h-3 w-3" />
          {{ entry.duration_min }} min
        </span>

        <span v-if="entry.notes" class="min-w-0 truncate text-xs text-gray-400 dark:text-gray-500">
          {{ entry.notes }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Activity, Clock } from 'lucide-vue-next'
import type { ActivityEntry } from '@/types/bariatric'

const props = defineProps<{
  entries: ActivityEntry[]
}>()

const sorted = computed(() =>
  [...props.entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

const weeklyTotal = computed(() => {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return props.entries
    .filter((e: ActivityEntry) => new Date(e.date) >= weekAgo)
    .reduce((sum: number, e: ActivityEntry) => sum + e.duration_min, 0)
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}
</script>
