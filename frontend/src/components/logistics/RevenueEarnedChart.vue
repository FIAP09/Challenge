<template>
  <div
    class="flex flex-col justify-between space-y-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/3"
  >
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Total revenue earned</p>
        <h3 class="text-3xl font-medium text-gray-800 dark:text-white/90">$23,445,700</h3>
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

    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Shipped quantities</p>
        <h3 class="text-3xl font-medium text-gray-800 dark:text-white/90">9,258</h3>
      </div>

      <div class="h-[60px] w-full max-w-[150px]">
        <apexchart :options="chartOptions" :series="series" type="area" height="70" />
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

const chartOptions = ref({
  chart: {
    fontFamily: 'Outfit, sans-serif',
    height: 70,
    type: 'area',
    parentHeightOffset: 0,
    toolbar: { show: false },
  },
  grid: { show: false },
  colors: ['#12B76A'],
  fill: {
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  legend: { show: false },
  tooltip: { enabled: false },
  dataLabels: { enabled: false },
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
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false },
  },
  yaxis: {
    labels: { show: false },
  },
})

const series = ref([
  {
    name: 'New Sales',
    data: [300, 350, 310, 370, 248, 287, 295, 191, 269, 201, 185, 252, 151],
  },
])
</script>
