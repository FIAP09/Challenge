<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-4 pb-6 pt-6 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
  >
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Storage Details</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">585 GB Free space left</p>
      </div>
      <div class="relative"></div>
    </div>
    <div>
      <div id="chartSixteen" class="flex justify-center mx-auto">
        <VueApexCharts
          type="donut"
          :options="chartOptions"
          :series="series"
          width="400"
        ></VueApexCharts>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const isDarkMode = ref(false)

const series = ref([45, 65, 25, 25])

const chartOptions = computed(() => ({
  colors: ['#9b8afb', '#fd853a', '#fdb022', '#32d583'],
  labels: ['Downloads', 'Apps', 'Documents', 'Media'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'donut',
    width: 400,
  },
  stroke: {
    show: false,
    width: 4,
    colors: 'transparent',
  },
  plotOptions: {
    pie: {
      donut: {
        lineCap: 'smooth',
        size: '65%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: true,
            offsetY: 0,
            color: isDarkMode.value ? '#ffffff' : '#1D2939',
            fontSize: '12px',
            fontWeight: 'normal',
          },
          value: {
            show: true,
            offsetY: 10,
            color: isDarkMode.value ? '#1D2939' : '#667085',
            fontSize: '14px',
            formatter: () => 'Used of 135 GB',
          },
          total: {
            show: true,
            label: 'Total 135 GB',
            color: isDarkMode.value ? '#1D2939' : '#000000',
            fontSize: '24px',
            fontWeight: 'bold',
          },
        },
      },
      expandOnClick: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'left',
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
      vertical: 6,
    },
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 380,
        },
        legend: {
          itemMargin: {
            horizontal: 7,
            vertical: 5,
          },
        },
      },
    },
    {
      breakpoint: 375,
      options: {
        legend: {
          fontSize: '12px',
        },
      },
    },
    {
      breakpoint: 1500,
      options: {
        legend: {
          itemMargin: {
            horizontal: 10,
            vertical: 6,
          },
        },
      },
    },
  ],
}))

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
})
</script>

<style></style>
