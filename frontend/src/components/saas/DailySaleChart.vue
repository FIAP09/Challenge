<template>
  <div>
    <VueApexCharts
      class="-ml-3"
      :options="chartOptions"
      :series="series"
      type="bar"
      height="200"
    ></VueApexCharts>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const chartOptions = ref({
  colors: ['#465fff'],
  chart: {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    height: 200,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      borderRadius: 5,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 4,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Outfit',
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
      formatter: (val) => `${val}`,
    },
  },
})

const series = ref([
  {
    name: 'Sales',
    data: [168, 385, 201, 298, 187, 195, 160],
  },
])
</script>
