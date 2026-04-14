<template>
  <admin-layout>
    <div class="space-y-6">
      <LogisticsMetrics />
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <DeliveryStatisticsChart />
          <div class="grid gap-6 sm:grid-cols-2">
            <RevenueEarnedChart />
            <DeliveryVehicle />
          </div>
        </div>
        <div class="lg:col-span-1">
          <div
            class="space-y-2 rounded-xl border bg-gray-100 p-2 dark:border-gray-800 dark:bg-white/3"
          >
            <TrackingDeliveryMap />
            <TrackingTimeline />
            <DeliveryMan />
          </div>
        </div>
      </div>
      <DeliveryActivityTable />
    </div>
  </admin-layout>
</template>

<script setup>
import LogisticsMetrics from '@/components/logistics/LogisticsMetrics.vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import DeliveryMan from '@/components/logistics/DeliveryMan.vue'
import TrackingTimeline from '@/components/logistics/TrackingTimeline.vue'
import TrackingDeliveryMap from '@/components/logistics/TrackingDeliveryMap.vue'
import DeliveryVehicle from '@/components/logistics/DeliveryVehicle.vue'
import RevenueEarnedChart from '@/components/logistics/RevenueEarnedChart.vue'
import DeliveryStatisticsChart from '@/components/logistics/DeliveryStatisticsChart.vue'
import DeliveryActivityTable from '@/components/logistics/DeliveryActivityTable.vue'
</script>
