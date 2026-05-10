<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
    <h3 class="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
      Exames Laboratoriais
    </h3>

    <div v-if="groups.length === 0" class="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
      Nenhum exame laboratorial registrado
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="group in groups"
        :key="group.name"
        class="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="text-sm font-medium text-gray-800 dark:text-white/90">
              {{ group.name }}
            </p>
            <p v-if="group.latest.reference_range" class="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
              Ref: {{ group.latest.reference_range }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1">
              <span
                v-for="(dot, i) in group.lastThree"
                :key="i"
                :class="dotColor(dot.status)"
                class="h-2 w-2 rounded-full"
              />
            </div>

            <div class="text-right">
              <span class="text-sm font-semibold text-gray-800 dark:text-white/90">
                {{ group.latest.value }}
              </span>
              <span class="ml-1 text-xs text-gray-400">{{ group.latest.unit }}</span>
            </div>

            <span :class="statusClasses(group.latest.status)" class="whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium">
              {{ statusLabel(group.latest.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LabEntry } from '@/types/bariatric'

const props = defineProps<{
  entries: LabEntry[]
}>()

interface LabGroup {
  name: string
  latest: LabEntry
  lastThree: LabEntry[]
}

const groups = computed<LabGroup[]>(() => {
  const map = new Map<string, LabEntry[]>()
  for (const entry of props.entries) {
    const list = map.get(entry.exam_name) ?? []
    list.push(entry)
    map.set(entry.exam_name, list)
  }

  return Array.from(map.entries()).map(([name, entries]) => {
    const sorted = entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    return {
      name,
      latest: sorted[0],
      lastThree: sorted.slice(0, 3).reverse(),
    }
  })
})

function dotColor(status: LabEntry['status']) {
  const map: Record<LabEntry['status'], string> = {
    normal: 'bg-green-500',
    alterado: 'bg-amber-500',
    critico: 'bg-red-500',
  }
  return map[status]
}

function statusClasses(status: LabEntry['status']) {
  const map: Record<LabEntry['status'], string> = {
    normal: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    alterado: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    critico: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }
  return map[status]
}

function statusLabel(status: LabEntry['status']) {
  const map: Record<LabEntry['status'], string> = {
    normal: 'Normal',
    alterado: 'Alterado',
    critico: 'Critico',
  }
  return map[status]
}
</script>
