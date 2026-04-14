<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pb-1 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex items-center justify-between gap-2 mb-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Traffic Stats</h3>
      </div>

      <div class="relative">
        <DropdownMenu :menu-items="menuItems">
          <template #icon>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                fill="currentColor"
              />
            </svg>
          </template>
        </DropdownMenu>
      </div>
    </div>

    <div class="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        v-for="option in options"
        :key="option"
        @click="selected = option"
        :class="[
          selected === option
            ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
            : 'text-gray-500 dark:text-gray-400',
          'block w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
        ]"
      >
        {{ capitalizeFirstLetter(option) }}
      </button>
    </div>

    <div>
      <!-- Stats item -->
      <div class="flex items-end justify-between py-5">
        <div>
          <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">New Subscribers</p>
          <h4 class="mb-1 text-2xl font-semibold text-gray-800 dark:text-white/90">567K</h4>
          <span class="flex items-center gap-1.5">
            <span class="text-green-600">+3.85%</span>
            <span class="text-xs text-gray-500 dark:text-gray-400"> then last Week </span>
          </span>
        </div>
        <div class="w-full max-w-[150px]">
          <VueApexCharts
            type="area"
            height="70"
            :options="chartNineOptions"
            :series="chartNineData"
          ></VueApexCharts>
        </div>
      </div>

      <!-- Stats item -->
      <div
        class="flex items-end justify-between py-5 border-gray-100 border-y dark:border-gray-800"
      >
        <div>
          <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">Conversion Rate</p>
          <h4 class="mb-1 text-2xl font-semibold text-gray-800 dark:text-white/90">276K</h4>
          <span class="flex items-center gap-1.5">
            <span class="text-red-600">-5.39%</span>
            <span class="text-xs text-gray-500 dark:text-gray-400"> then last Week </span>
          </span>
        </div>
        <div class="w-full max-w-[150px]">
          <VueApexCharts
            type="area"
            height="70"
            :options="chartTenOptions"
            :series="chartTenData"
          ></VueApexCharts>
        </div>
      </div>

      <!-- Stats item -->
      <div class="flex items-end justify-between py-5">
        <div>
          <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">Page Bounce Rate</p>
          <h4 class="mb-1 text-2xl font-semibold text-gray-800 dark:text-white/90">285</h4>
          <span class="flex items-center gap-1.5">
            <span class="text-green-600">+12.74%</span>
            <span class="text-xs text-gray-500 dark:text-gray-400"> then last Week </span>
          </span>
        </div>
        <div class="w-full max-w-[150px]">
          <VueApexCharts
            type="area"
            height="70"
            :options="chartNineOptions"
            :series="chartNineData"
          ></VueApexCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]
const options = ['today', 'week', 'month']
const selected = ref('today')

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
import VueApexCharts from 'vue3-apexcharts'

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'area',
    height: 70,
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 1,
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z',
      '2018-09-19T07:30:00.000Z',
      '2018-09-19T08:30:00.000Z',
      '2018-09-19T09:30:00.000Z',
      '2018-09-19T10:30:00.000Z',
      '2018-09-19T11:30:00.000Z',
      '2018-09-19T12:30:00.000Z',
    ],
    labels: {
      show: false,
    },
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
    labels: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
})

const chartNineData = ref([
  {
    name: 'New Sales',
    data: [300, 350, 310, 370, 248, 187, 295, 191, 269, 201, 185, 252, 151],
  },
])

const chartTenData = ref([
  {
    name: 'New Sales',
    data: [151, 252, 185, 201, 269, 191, 295, 187, 248, 370, 310, 350, 300],
  },
])

// Override colors for each chart
const chartNineOptions = ref({
  ...chartOptions.value,
  colors: ['#12B76A'],
})

const chartTenOptions = ref({
  ...chartOptions.value,
  colors: ['#FB5454'],
})
</script>
