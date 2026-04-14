<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="flex flex-col h-full gap-6 sm:gap-5 xl:flex-row">
      <invoice-sidebar />
      <invoice-content />
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import { ref } from 'vue'
import InvoiceSidebar from '../../components/invoice/InvoiceSidebar.vue'
import InvoiceContent from '../../components/invoice/InvoiceContent.vue'

const currentPageTitle = ref('Invoice')
</script>
