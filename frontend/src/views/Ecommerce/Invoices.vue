<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <InvoiceOverview />
    <InvoiceList />
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue'
const currentPageTitle = ref('Invoices')
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import InvoiceOverview from '@/components/ecommerce/invoice/InvoiceOverview.vue'
import InvoiceList from '@/components/ecommerce/invoice/InvoiceList.vue'
</script>
