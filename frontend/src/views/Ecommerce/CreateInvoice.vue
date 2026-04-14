<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <CreateInvoiceForm />
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue'
const currentPageTitle = ref('Create Invoice')
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import CreateInvoiceForm from '@/components/ecommerce/invoice/CreateInvoiceForm.vue'
</script>
