<template>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
