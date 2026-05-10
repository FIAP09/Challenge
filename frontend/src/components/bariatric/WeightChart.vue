<template>
  <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
    <h3 class="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
      Evolucao de Peso
    </h3>
    <div v-if="hasRegain" class="mb-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
      <TrendingUp class="h-4 w-4" />
      <span>Alerta: possivel reganho de peso detectado</span>
    </div>
    <div class="-ml-2">
      <VueApexCharts type="line" height="300" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { TrendingUp } from 'lucide-vue-next'
import type { WeightEntry } from '@/types/bariatric'

const props = defineProps<{
  entries: WeightEntry[]
  targetWeight: number
  initialWeight: number
}>()

const sorted = computed(() =>
  [...props.entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
)

const hasRegain = computed(() => {
  const s = sorted.value
  if (s.length < 3) return false
  return s[s.length - 1].weight_kg > s[s.length - 3].weight_kg
})

const series = computed(() => [
  {
    name: 'Peso (kg)',
    data: sorted.value.map((e: WeightEntry) => e.weight_kg),
  },
])

const chartOptions = computed(() => ({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    toolbar: { show: false },
  },
  colors: ['#0f2743'],
  stroke: {
    curve: 'smooth' as const,
    width: 3,
  },
  markers: {
    size: 4,
    colors: sorted.value.map((e: WeightEntry) =>
      e.weight_kg > props.initialWeight ? '#ef4444' : '#0f2743'
    ),
    strokeWidth: 0,
  },
  xaxis: {
    categories: sorted.value.map((e: WeightEntry) =>
      new Date(e.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    ),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: { colors: '#94a3b8', fontFamily: 'Outfit, sans-serif' },
    },
  },
  yaxis: {
    labels: {
      style: { colors: '#94a3b8', fontFamily: 'Outfit, sans-serif' },
      formatter: (val: number) => `${val} kg`,
    },
  },
  grid: {
    borderColor: '#e2e8f0',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
  },
  annotations: {
    yaxis: [
      {
        y: props.targetWeight,
        borderColor: '#FFE14D',
        strokeDashArray: 6,
        label: {
          text: `Meta: ${props.targetWeight} kg`,
          borderColor: '#FFE14D',
          style: {
            color: '#0f2743',
            background: '#FFE14D',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
            padding: { left: 8, right: 8, top: 2, bottom: 2 },
          },
        },
      },
    ],
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: (val: number) => `${val} kg`,
    },
  },
  dataLabels: { enabled: false },
}))
</script>
