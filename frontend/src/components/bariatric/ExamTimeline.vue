<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
    <h3 class="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
      Linha do Tempo de Exames
    </h3>

    <div v-if="sorted.length === 0" class="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
      Nenhum exame registrado
    </div>

    <div v-else class="relative ml-4 border-l-2 border-gray-200 dark:border-gray-700">
      <div
        v-for="entry in sorted"
        :key="entry.id"
        class="relative mb-6 ml-6 last:mb-0"
      >
        <div class="absolute -left-[33px] top-1 h-4 w-4 rounded-full border-2 border-white bg-[#0f2743] dark:border-gray-900" />

        <div class="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <div class="mb-2 flex flex-wrap items-center gap-2">
            <span class="text-sm font-medium text-gray-800 dark:text-white/90">
              {{ entry.name }}
            </span>
            <span :class="specialtyClasses(entry.specialty)" class="rounded-full px-2 py-0.5 text-xs font-medium">
              {{ EXAM_SPECIALTY_LABELS[entry.specialty] }}
            </span>
            <span :class="statusClasses(entry.status)" class="rounded-full px-2 py-0.5 text-xs font-medium">
              {{ statusLabel(entry.status) }}
            </span>
          </div>

          <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
            <span class="flex items-center gap-1">
              <Calendar class="h-3.5 w-3.5" />
              {{ formatDate(entry.date) }}
            </span>
            <span v-if="entry.evaluator" class="flex items-center gap-1">
              <User class="h-3.5 w-3.5" />
              {{ entry.evaluator }}
            </span>
          </div>

          <p v-if="entry.notes" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {{ entry.notes }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Calendar, User } from 'lucide-vue-next'
import type { ExamTimelineEntry, ExamSpecialty, ExamStatus } from '@/types/bariatric'
import { EXAM_SPECIALTY_LABELS } from '@/types/bariatric'

const props = defineProps<{
  entries: ExamTimelineEntry[]
}>()

const sorted = computed(() =>
  [...props.entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function specialtyClasses(specialty: ExamSpecialty) {
  const map: Record<ExamSpecialty, string> = {
    cardiologia: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    pneumologia: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    endocrinologia: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    nutrologia: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    psicologia: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    nutricionista: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    outro: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
  }
  return map[specialty]
}

function statusClasses(status: ExamStatus) {
  const map: Record<ExamStatus, string> = {
    realizado: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    pendente: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    acompanhamento: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  }
  return map[status]
}

function statusLabel(status: ExamStatus) {
  const map: Record<ExamStatus, string> = {
    realizado: 'Realizado',
    pendente: 'Pendente',
    acompanhamento: 'Acompanhamento',
  }
  return map[status]
}
</script>
