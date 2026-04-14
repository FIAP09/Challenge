<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="mb-6 flex justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Churn Rate</h3>
        <p class="text-sm mt-1 text-gray-500 dark:text-gray-400">Downgrade to Free plan</p>
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
    <div class="flex justify-between">
      <div>
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white/90">4.26%</h3>
        <p class="text-xs mt-1 text-gray-500 dark:text-gray-400">
          <span class="text-red-500 mr-1 inline-block">0.31%</span>
          than last Week
        </p>
      </div>
      <div class="max-w-full">
        <div id="chartTwentyOne">
          <VueApexCharts
            class="h-12 w-24"
            :options="chartOptions"
            :series="series"
            type="area"
          ></VueApexCharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import DropdownMenu from '../common/DropdownMenu.vue'

// Menu items for the dropdown
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]

// Chart data
const series = ref([
  {
    name: 'Churn Rate',
    data: [4.5, 4.2, 4.6, 4.3, 4.1, 4.2, 4.26],
  },
])

// Chart configuration
const chartOptions = ref({
  chart: {
    type: 'area',
    height: 60,
    sparkline: {
      enabled: true,
    },
    animations: {
      enabled: true,
      speed: 800,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ['#ef4444'],
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.6,
      opacityTo: 0.1,
      stops: [0, 100],
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      formatter: (value) => value.toFixed(2) + '%',
    },
    marker: {
      show: false,
    },
  },
})
</script>
