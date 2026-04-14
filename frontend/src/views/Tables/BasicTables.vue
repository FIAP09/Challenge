<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Basic Table 1">
        <BasicTableOne />
      </ComponentCard>
      <ComponentCard title="Basic Table 2">
        <BasicTableTwo />
      </ComponentCard>
      <ComponentCard title="Basic Table 3">
        <BasicTableThree />
      </ComponentCard>
      <ComponentCard title="Basic Table 4">
        <BasicTableFour />
      </ComponentCard>
      <ComponentCard title="Basic Table 5">
        <BasicTableFive />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import BasicTableFive from '@/components/tables/basic-tables/BasicTableFive.vue'
import BasicTableTwo from '@/components/tables/basic-tables/BasicTableTwo.vue'
import BasicTableFour from '@/components/tables/basic-tables/BasicTableFour.vue'
import BasicTableOne from '@/components/tables/basic-tables/BasicTableOne.vue'
import BasicTableThree from '@/components/tables/basic-tables/BasicTableThree.vue'

const currentPageTitle = ref('Basic Tables')
</script>
