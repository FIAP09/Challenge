<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
    <h3 class="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
      Registro Cirurgico
    </h3>

    <div v-if="!record" class="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
      Nenhum registro de cirurgia
    </div>

    <div v-else class="space-y-4">
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <p class="text-xs text-gray-400 dark:text-gray-500">Tecnica</p>
          <p class="mt-1 text-sm font-medium text-gray-800 dark:text-white/90">
            {{ techniqueLabel(record.technique) }}
          </p>
        </div>

        <div class="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <p class="text-xs text-gray-400 dark:text-gray-500">Data</p>
          <p class="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-800 dark:text-white/90">
            <Calendar class="h-3.5 w-3.5 text-gray-400" />
            {{ formatDate(record.date) }}
          </p>
        </div>

        <div class="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <p class="text-xs text-gray-400 dark:text-gray-500">Duracao</p>
          <p class="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-800 dark:text-white/90">
            <Clock class="h-3.5 w-3.5 text-gray-400" />
            {{ record.duration_minutes }} minutos
          </p>
        </div>

        <div class="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <p class="text-xs text-gray-400 dark:text-gray-500">Cirurgiao</p>
          <p class="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-800 dark:text-white/90">
            <User class="h-3.5 w-3.5 text-gray-400" />
            {{ record.surgeon }}
          </p>
        </div>
      </div>

      <div v-if="record.complications.length > 0" class="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-900/20">
        <p class="mb-2 text-xs font-medium text-red-700 dark:text-red-400">Complicacoes</p>
        <ul class="space-y-1">
          <li
            v-for="(complication, i) in record.complications"
            :key="i"
            class="flex items-start gap-2 text-sm text-red-600 dark:text-red-300"
          >
            <AlertTriangle class="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {{ complication }}
          </li>
        </ul>
      </div>

      <div v-if="record.notes" class="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <p class="mb-1 text-xs text-gray-400 dark:text-gray-500">Observacoes</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ record.notes }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Clock, User, AlertTriangle } from 'lucide-vue-next'
import type { SurgeryRecord, SurgeryTechnique } from '@/types/surgery'

defineProps<{
  record: SurgeryRecord | null
}>()

const TECHNIQUE_LABELS: Record<SurgeryTechnique, string> = {
  bypass_gastrico: 'Bypass Gastrico (Y de Roux)',
  sleeve: 'Gastrectomia Vertical (Sleeve)',
  banda_gastrica: 'Banda Gastrica',
  duodenal_switch: 'Duodenal Switch',
  outro: 'Outro',
}

function techniqueLabel(technique: SurgeryTechnique) {
  return TECHNIQUE_LABELS[technique]
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
</script>
