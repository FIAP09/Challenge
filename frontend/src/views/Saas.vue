<template>
  <admin-layout>
    <div className="space-y-5 sm:space-y-6">
      <SaasMetrics />
      <div className="gap-6 space-y-5 sm:space-y-6 xl:grid xl:grid-cols-12 xl:space-y-0">
        <div className="xl:col-span-7 2xl:col-span-8">
          <div className="space-y-5  sm:space-y-6">
            <div className="grid sm:gap-6 lg:grid-cols-2">
              <ChurnRate />
              <GrowthRate />
            </div>

            <!-- {/* Funnel */} -->
            <FunnelChart />

            <!-- {/* Table */} -->
            <InvoiceTable />
          </div>
        </div>
        <div className="space-y-5 sm:space-y-6 xl:col-span-5 2xl:col-span-4">
          <PerformanceTab />

          <!-- {/* Activities */} -->
          <ActivitiesCard />
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import AdminLayout from '../components/layout/AdminLayout.vue'
import SaasMetrics from '../components/saas/SaasMetrics.vue'
import ChurnRate from '../components/saas/ChurnRate.vue'
import GrowthRate from '../components/saas/GrowthRate.vue'
import ActivitiesCard from '../components/saas/ActivityCard.vue'
import InvoiceTable from '../components/saas/InvoiceTable.vue'
import FunnelChart from '../components/saas/FunnelChart.vue'
import PerformanceTab from '../components/saas/PerformanceTab.vue'
</script>
