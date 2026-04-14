<template>
  <div class="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3">
    <div class="flex items-center justify-between gap-5">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Delivery Statistics</h3>
        <p class="dark:text-gray-400 text-sm text-gray-500">Total number of deliveries 70.5K</p>
      </div>

      <div class="relative z-20 bg-transparent">
        <select
          v-model="selectedOption"
          class="dark:bg-dark-900 shadow-theme-xs h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <span
          class="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400"
        >
          <svg
            class="stroke-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
              stroke=""
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>

    <div class="flex items-center gap-5 pt-5">
      <div class="flex items-center gap-1.5">
        <div class="bg-brand-200 h-2.5 w-2.5 rounded-full"></div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Shipment</p>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="bg-brand-500 h-2.5 w-2.5 rounded-full"></div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Delivery</p>
      </div>
    </div>

    <apexchart
      :options="chartOptions"
      :series="series"
      type="bar"
      height="256"
      class="w-full pt-5"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedOption = ref('monthly')

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 265,
    toolbar: { show: false },
    fontFamily: 'Outfit, sans-serif',
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      borderRadius: 4,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: { enabled: false },
  stroke: {
    show: true,
    width: 4,
    colors: ['transparent'],
  },
  colors: ['#C2D6FF', '#465FFF'],
  xaxis: {
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
    axisTicks: { show: false },
    axisBorder: { show: false },
  },
  yaxis: {
    labels: {
      formatter: (val) => `${val}%`,
      style: { fontSize: '12px', colors: '#344054' },
    },
    max: 100,
  },
  fill: { opacity: 1 },
  tooltip: {
    y: { formatter: (val) => `${val}%` },
  },
  legend: { show: false },
  grid: {
    borderColor: '#F2F4F7',
    strokeDashArray: 0,
  },
})

const series = ref([
  {
    name: '2023',
    data: [80, 60, 70, 40, 65, 45, 48, 55, 58, 50, 67, 75],
  },
  {
    name: '2024',
    data: [90, 50, 65, 25, 78, 68, 75, 90, 30, 70, 90, 95],
  },
])
</script>
