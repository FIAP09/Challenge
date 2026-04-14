<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex flex-wrap items-start justify-between gap-5">
      <div>
        <h3 class="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">Analytics</h3>
        <span class="block text-gray-500 text-theme-sm dark:text-gray-400">
          Visitor analytics of last 30 days
        </span>
      </div>

      <div class="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
        <button
          v-for="option in options"
          :key="option.value"
          @click="selected = option.value"
          :class="[
            'px-3 py-2 font-medium rounded-md text-theme-sm',
            selected === option.value
              ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
          ]"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartFour" class="-ml-5 min-w-[1300px] xl:min-w-full pl-2">
        <VueApexCharts
          width="100%"
          height="350"
          type="bar"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TimeOption {
  value: string
  label: string
}

const options: TimeOption[] = [
  { value: 'optionOne', label: '12 months' },
  { value: 'optionTwo', label: '30 days' },
  { value: 'optionThree', label: '7 days' },
  { value: 'optionFour', label: '24 hours' },
]

const selected = ref('optionOne')

import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Sales',
    data: [
      168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212, 270, 190, 310, 115, 90,
      380, 112, 223, 292, 170, 290, 110, 115, 290, 380, 312,
    ],
  },
])

const chartOptions = ref({
  colors: ['#465fff'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 5,
      borderRadiusApplication: 'end' as const,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 4,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  legend: {
    show: true,
    position: 'top' as const,
    horizontalAlign: 'left' as const,
    fontFamily: 'Outfit',
    markers: {},
  },
  yaxis: {
    title: {
      text: undefined,
    },
  },
  grid: {
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    x: {
      show: false,
    },
    y: {
      formatter: function (val: number): string {
        return val.toString()
      },
    },
  },
})
</script>
