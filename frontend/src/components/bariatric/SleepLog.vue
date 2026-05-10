<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
        Registro de Sono
      </h3>
      <div v-if="sorted.length > 0" class="flex items-center gap-2 rounded-lg bg-[#FFE14D]/15 px-3 py-1.5">
        <Moon class="h-4 w-4 text-[#0f2743] dark:text-[#FFE14D]" />
        <span class="text-sm font-medium text-[#0f2743] dark:text-[#FFE14D]">
          Media: {{ averageHours }}h
        </span>
      </div>
    </div>

    <div v-if="sorted.length === 0" class="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
      Nenhum registro de sono
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
          {{ entry.hours }}h
        </span>

        <span :class="qualityClasses(entry.quality)" class="rounded-full px-2 py-0.5 text-xs font-medium">
          {{ qualityLabel(entry.quality) }}
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
import { Moon } from 'lucide-vue-next'
import type { SleepEntry, SleepQuality } from '@/types/bariatric'

const props = defineProps<{
  entries: SleepEntry[]
}>()

const sorted = computed(() =>
  [...props.entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

const averageHours = computed(() => {
  if (props.entries.length === 0) return '0'
  const total = props.entries.reduce((sum: number, e: SleepEntry) => sum + e.hours, 0)
  return (total / props.entries.length).toFixed(1)
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

function qualityClasses(quality: SleepQuality) {
  const map: Record<SleepQuality, string> = {
    bom: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    regular: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    ruim: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }
  return map[quality]
}

function qualityLabel(quality: SleepQuality) {
  const map: Record<SleepQuality, string> = {
    bom: 'Bom',
    regular: 'Regular',
    ruim: 'Ruim',
  }
  return map[quality]
}
</script>
