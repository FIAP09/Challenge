<template>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
