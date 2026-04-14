<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <ProductTable />
  </admin-layout>
</template>

<script setup>
import ProductTable from '@/components/ecommerce/product/ProductTable.vue'
import { ref } from 'vue'
const currentPageTitle = ref('Products')
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
</script>
