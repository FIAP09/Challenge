<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <InvoiceDetails />
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue'
const currentPageTitle = ref('Single Invoice')
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import InvoiceDetails from '@/components/ecommerce/invoice/InvoiceDetails.vue'
</script>
