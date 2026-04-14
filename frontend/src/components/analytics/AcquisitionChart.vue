<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6"
  >
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Acquisition Channels</h3>

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
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartSix" class="-ml-5 min-w-[700px] xl:min-w-full pl-2">
        <VueApexCharts
          type="bar"
          height="315"
          :options="chartOptions"
          :series="series"
        ></VueApexCharts>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]
import VueApexCharts from 'vue3-apexcharts'

const series = ref([
  {
    name: 'Direct',
    data: [44, 55, 41, 67, 22, 43, 55, 41],
  },
  {
    name: 'Referral',
    data: [13, 23, 20, 8, 13, 27, 13, 23],
  },
  {
    name: 'Organic Search',
    data: [11, 17, 15, 15, 21, 14, 18, 20],
  },
  {
    name: 'Social',
    data: [21, 7, 25, 13, 22, 8, 18, 20],
  },
])

const chartOptions = ref({
  colors: ['#2a31d8', '#465fff', '#7592ff', '#c2d6ff'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar' as const,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '39%',
      borderRadius: 10,
      borderRadiusApplication: 'end' as const,
      borderRadiusWhenStacked: 'last' as const,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
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
    fontSize: '14px',
    fontWeight: 400,
    markers: {
      size: 5,
      shape: 'circle' as const,
      strokeWidth: 0,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 0,
    },
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
      formatter: function (val: number) {
        return val.toString()
      },
    },
  },
})

onMounted(() => {
  // Any additional setup can be done here if needed
})
</script>
