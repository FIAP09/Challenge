<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-6">
      <TransactionHeader />
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div class="lg:col-span-8 2xl:col-span-9">
          <OrderDetails />
        </div>
        <div class="space-y-6 lg:col-span-4 2xl:col-span-3">
          <CustomerDetails />
          <OrderHistory />
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue'
const currentPageTitle = ref('Transaction Details')
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import TransactionHeader from '@/components/ecommerce/transactions/TransactionHeader.vue'
import OrderHistory from '@/components/ecommerce/transactions/OrderHistory.vue'
import CustomerDetails from '@/components/ecommerce/transactions/CustomerDetails.vue'
import OrderDetails from '@/components/ecommerce/transactions/OrderDetails.vue'
</script>
