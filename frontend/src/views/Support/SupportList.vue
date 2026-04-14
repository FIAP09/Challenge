<template>
  <admin-layout>
    <div>
      <PageBreadcrumb :pageTitle="currentPageTitle" />
      <SupportOverview />
      <SupportListTable />
    </div>
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue'
const currentPageTitle = ref('Support Tickets')
import AdminLayout from '@/components/layout/AdminLayout.vue'
import SupportOverview from '@/components/support/SupportOverview.vue'
import SupportListTable from '@/components/support/SupportListTable.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
</script>
