<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6"
  >
    <div class="flex items-center justify-between mb-9">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Sessions By Device</h3>
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
    <div class="">
      <div id="chartSeven" class="flex justify-center mx-auto">
        <VueApexCharts
          type="donut"
          :width="chartWidth"
          height="290"
          :options="chartOptions"
          :series="series"
        ></VueApexCharts>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]
import VueApexCharts from 'vue3-apexcharts'

const series = ref([45, 65, 25])
const chartWidth = ref(445)

const chartOptions = ref({
  colors: ['#3641f5', '#7592ff', '#dde9ff'],
  labels: ['Desktop', 'Mobile', 'Tablet'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'donut',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
        labels: {
          show: true,
          value: {
            show: true,
            offsetY: 0,
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
  stroke: {
    show: false,
    width: 4,
    colors: 'transparent',
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    fontFamily: 'Outfit',
    fontSize: '14px',
    fontWeight: 400,
    markers: {
      size: 5,
      shape: 'circle',
      radius: 999,
      strokeWidth: 0,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 0,
    },
  },
})

const updateChartSize = () => {
  if (window.innerWidth <= 640) {
    chartWidth.value = 370
  } else {
    chartWidth.value = 445
  }
}

onMounted(() => {
  updateChartSize()
  window.addEventListener('resize', updateChartSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateChartSize)
})
</script>

<style></style>
