<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex flex-col gap-5 mb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Statistics</h3>
        <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
          Target you’ve set for each month
        </p>
      </div>

      <div class="relative">
        <div class="inline-flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
          <button
            v-for="option in options"
            :key="option.value"
            @click="selected = option.value"
            :class="[
              selected === option.value
                ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400',
              'px-3 py-2 font-medium rounded-md text-theme-sm hover:text-gray-900 hover:shadow-theme-xs dark:hover:bg-gray-800 dark:hover:text-white',
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex gap-4 sm:gap-9">
      <div class="flex items-start gap-2">
        <div>
          <h4 class="mb-0.5 text-base font-bold text-gray-800 dark:text-white/90 sm:text-theme-xl">
            $212,142.12
          </h4>
          <span class="text-gray-500 text-theme-xs dark:text-gray-400"> Avg. Yearly Profit </span>
        </div>

        <span
          class="mt-1.5 flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500"
        >
          +23.2%
        </span>
      </div>

      <div class="flex items-start gap-2">
        <div>
          <h4 class="mb-0.5 text-base font-bold text-gray-800 dark:text-white/90 sm:text-theme-xl">
            $30,321.23
          </h4>
          <span class="text-gray-500 text-theme-xs dark:text-gray-400"> Avg. Yearly Profit </span>
        </div>

        <span
          class="mt-1.5 flex items-center gap-1 rounded-full bg-error-50 px-2 py-0.5 text-theme-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500"
        >
          -12.3%
        </span>
      </div>
    </div>
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartEleven" class="-ml-4 min-w-[1000px] pl-2 xl:min-w-full">
        <VueApexCharts
          type="area"
          height="220"
          :options="chartOptions"
          :series="series"
        ></VueApexCharts>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const options = [
  { value: 'optionOne', label: 'Monthly' },
  { value: 'optionTwo', label: 'Quarterly' },
  { value: 'optionThree', label: 'Annually' },
]

const selected = ref('optionOne')
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
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'area',
    height: 220,
    toolbar: {
      show: false,
    },
  },
  colors: ['#465FFF', '#9CB9FF'],
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  stroke: {
    curve: 'straight',
    width: [2, 2],
  },
  markers: {
    size: 0,
  },
  labels: {
    show: false,
    position: 'top',
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
    type: 'category',
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
  legend: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 220,
        },
      },
    },
    {
      breakpoint: 1600,
      options: {
        chart: {
          height: 220,
        },
      },
    },
    {
      breakpoint: 2600,
      options: {
        chart: {
          height: 250,
        },
      },
    },
  ],
})
</script>
