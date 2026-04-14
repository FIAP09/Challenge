<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <AddProductForm />
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue'
const currentPageTitle = ref('Add Product')
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AddProductForm from '@/components/ecommerce/product/AddProductForm.vue'
</script>
