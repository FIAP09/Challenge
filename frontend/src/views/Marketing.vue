<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <marketing-metrics />
      </div>

      <div class="col-span-12 space-y-6 xl:col-span-8">
        <impression-chart />
        <marketing-table />
      </div>

      <div class="col-span-12 space-y-6 xl:col-span-4">
        <traffic-stats />
        <traffic-source />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '../components/layout/AdminLayout.vue'
import MarketingMetrics from '../components/marketing/MarketingMetrics.vue'
import ImpressionChart from '../components/marketing/ImpressionChart.vue'
import TrafficStats from '../components/marketing/TrafficStats.vue'
import TrafficSource from '../components/marketing/TrafficSource.vue'
import MarketingTable from '../components/marketing/MarketingTable.vue'

export default {
  components: {
    AdminLayout,
    MarketingMetrics,
    ImpressionChart,
    TrafficStats,
    TrafficSource,
    MarketingTable,
  },
  name: 'Marketing',
}
</script>
