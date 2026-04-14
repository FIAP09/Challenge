<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Data Table 1">
        <DataTableOne />
      </ComponentCard>
      <ComponentCard title="Data Table 2">
        <DataTableTwo />
      </ComponentCard>
      <ComponentCard title="Data Table 3">
        <DataTableThree />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DataTableOne from '@/components/tables/data-tables/DataTableOne.vue'
import DataTableTwo from '@/components/tables/data-tables/DataTableTwo.vue'
import DataTableThree from '@/components/tables/data-tables/DataTableThree.vue'

const currentPageTitle = ref('Data Tables')
</script>
