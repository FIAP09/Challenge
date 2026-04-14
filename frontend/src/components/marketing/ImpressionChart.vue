<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Impression & Data Traffic
        </h3>
        <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">Jun 1, 2024 - Dec 1, 2025</p>
      </div>

      <div
        class="flex flex-row-reverse items-center justify-end gap-0.5 sm:flex-col sm:items-start"
      >
        <div class="flex flex-row-reverse items-center gap-3 sm:flex-row sm:gap-2">
          <h4 class="text-2xl font-bold text-gray-800 dark:text-white/90">$9,758.00</h4>

          <span
            class="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500"
          >
            +7.96%
          </span>
        </div>

        <span class="text-gray-500 text-theme-xs dark:text-gray-400"> Total Revenue </span>
      </div>
    </div>
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div
        id="chartEight"
        class="apexcharts-tooltip-active -ml-4 min-w-[1000px] pl-2 xl:min-w-full"
      >
        <VueApexCharts
          type="area"
          height="310"
          :options="chartOptions"
          :series="series"
        ></VueApexCharts>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Sales',
    data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
  },
  {
    name: 'Revenue',
    data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
  },
])

const chartOptions = ref({
  colors: ['#465FFF', '#9CB9FF'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'area' as const,
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: false,
    position: 'top' as const,
    horizontalAlign: 'left' as const,
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  stroke: {
    curve: 'smooth' as const,
    width: [2, 2],
  },
  markers: {
    size: 0,
  },
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy',
    },
  },
  xaxis: {
    type: 'category' as const,
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
  },
})

onMounted(() => {
  // Any additional setup can be done here if needed
})
</script>

<style></style>
