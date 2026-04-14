<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <ComponentCard title="Doughnut Chart 1">
        <DoughnutChartOne />
      </ComponentCard>
      <ComponentCard title="Doughnut Chart 2">
        <DoughnutChartTwo />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import DoughnutChartOne from '@/components/charts/DoughnutChart/DoughnutChartOne.vue'
import DoughnutChartTwo from '@/components/charts/DoughnutChart/DoughnutChartTwo.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Doughnut Chart')
</script>
