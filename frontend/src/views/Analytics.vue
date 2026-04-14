<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <analytics-metrics />
      </div>

      <div class="col-span-12">
        <analytics-chart />
      </div>

      <div class="col-span-12 xl:col-span-7">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <top-channel-card />
          <top-pages-card />
        </div>
      </div>

      <div class="col-span-12 xl:col-span-5">
        <active-user-chart />
      </div>

      <div class="col-span-12 xl:col-span-7">
        <acquisition-chart />
      </div>

      <div class="col-span-12 xl:col-span-5">
        <session-chart />
      </div>

      <div class="col-span-12 xl:col-span-5">
        <customer-demographic />
      </div>

      <div class="col-span-12 xl:col-span-7">
        <analytics-table />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import AdminLayout from '../components/layout/AdminLayout.vue'
import AnalyticsMetrics from '../components/analytics/AnalyticsMetrics.vue'
import AnalyticsChart from '../components/analytics/AnalyticsChart.vue'
import CustomerDemographic from '../components/ecommerce/CustomerDemographic.vue'
import TopChannelCard from '../components/analytics/TopChannelCard.vue'
import TopPagesCard from '../components/analytics/TopPagesCard.vue'
import AcquisitionChart from '../components/analytics/AcquisitionChart.vue'
import ActiveUserChart from '../components/analytics/ActiveUserChart.vue'
import AnalyticsTable from '../components/analytics/AnalyticsTable.vue'
import SessionChart from '../components/analytics/SessionChart.vue'

export default {
  components: {
    AdminLayout,
    AnalyticsMetrics,
    AnalyticsChart,
    CustomerDemographic,
    TopChannelCard,
    TopPagesCard,
    AcquisitionChart,
    ActiveUserChart,
    AnalyticsTable,
    SessionChart,
  },
  name: 'Analytics',
}
</script>
