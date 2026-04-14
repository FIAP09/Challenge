<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6"
  >
    <div class="flex items-center justify-between mb-5">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Sales Category</h3>

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
    <div class="flex flex-col items-center gap-8 xl:flex-row">
      <div id="chartThirteen">
        <VueApexCharts
          type="donut"
          :options="chartOptions"
          :series="series"
          height="280"
          width="280"
        />
      </div>
      <div class="flex flex-col items-start gap-6 sm:flex-row xl:flex-col">
        <div class="flex items-start gap-2.5">
          <div class="mt-1.5 h-2 w-2 rounded-full bg-brand-500"></div>
          <div>
            <h5 class="mb-1 font-medium text-gray-800 text-theme-sm dark:text-white/90">
              Affiliate Program
            </h5>
            <div class="flex items-center gap-2">
              <p class="font-medium text-gray-700 text-theme-sm dark:text-gray-400">48%</p>
              <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">2,040 Products</p>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-2.5">
          <div class="mt-1.5 h-2 w-2 rounded-full bg-brand-500"></div>
          <div>
            <h5 class="mb-1 font-medium text-gray-800 text-theme-sm dark:text-white/90">
              Direct Buy
            </h5>
            <div class="flex items-center gap-2">
              <p class="font-medium text-gray-700 text-theme-sm dark:text-gray-400">33%</p>
              <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
              <p class="text-gray-400 text-theme-sm dark:text-gray-400">1,402 Products</p>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-2.5">
          <div class="mt-1.5 h-2 w-2 rounded-full bg-brand-300"></div>
          <div>
            <h5 class="mb-1 font-medium text-gray-800 text-theme-sm dark:text-white/90">Adsense</h5>
            <div class="flex items-center gap-2">
              <p class="font-medium text-gray-700 text-theme-sm dark:text-gray-400">19%</p>
              <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
              <p class="text-gray-500 text-theme-sm dark:text-gray-400">510 Products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]

const series = ref([900, 700, 850])

const chartOptions = ref({
  colors: ['#3641f5', '#7592ff', '#dde9ff'],
  labels: ['Affiliate', 'Direct', 'Adsense'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'donut',
  },
  stroke: {
    show: false,
    width: 4,
    colors: 'transparent',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: 0,
            color: '#1D2939',
            fontSize: '12px',
            fontWeight: 'normal',
          },
          value: {
            show: true,
            offsetY: 10,
            color: '#667085',
            fontSize: '14px',
            formatter: () => 'Used of 1.1K',
          },
          total: {
            show: true,
            label: 'Total',
            color: '#000000',
            fontSize: '20px',
            fontWeight: 'bold',
            formatter: () => 'Total 3.5K',
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 280,
          height: 280,
        },
      },
    },
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 240,
          height: 240,
        },
      },
    },
  ],
})
</script>

<style></style>
