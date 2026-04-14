<template>
  <admin-layout>
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <crm-metrics />
      </div>

      <div class="col-span-12 xl:col-span-8">
        <crm-statistics-chart />
      </div>

      <div class="col-span-12 xl:col-span-4">
        <estimated-revenue-chart />
      </div>

      <div class="col-span-12 xl:col-span-6">
        <sale-category-chart />
      </div>

      <div class="col-span-12 xl:col-span-6">
        <upcoming-schedule />
      </div>

      <div class="col-span-12">
        <crm-table />
      </div>
    </div>
  </admin-layout>
</template>

<script>
import CrmMetrics from '../components/crm/CrmMetrics.vue'
import CrmStatisticsChart from '../components/crm/CrmStatisticsChart.vue'
import EstimatedRevenueChart from '../components/crm/EstimatedRevenueChart.vue'
import CrmTable from '../components/crm/CrmTable.vue'
import UpcomingSchedule from '../components/crm/UpcomingSchedule.vue'
import SaleCategoryChart from '../components/crm/SaleCategoryChart.vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
export default {
  components: {
    AdminLayout,
    CrmMetrics,
    EstimatedRevenueChart,
    CrmStatisticsChart,
    CrmTable,
    UpcomingSchedule,
    SaleCategoryChart,
  },
  name: 'Crm',
}
</script>
