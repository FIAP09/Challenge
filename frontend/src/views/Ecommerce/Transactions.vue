<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <TransactionTable />
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue'
const currentPageTitle = ref('Transactions')
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import TransactionTable from '@/components/ecommerce/transactions/TransactionTable.vue'
</script>
