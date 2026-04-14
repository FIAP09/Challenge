<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="mb-6 flex flex-col gap-6 xl:flex-row">
      <PlanDetails />
      <BillingInfo />
    </div>
    <PaymentMethod />
    <BillInvoiceTable />
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import BillingInfo from '@/components/ecommerce/billing/BillingInfo.vue'
import PaymentMethod from '@/components/ecommerce/billing/PaymentMethod.vue'
import PlanDetails from '@/components/ecommerce/billing/PlanDetails.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import BillInvoiceTable from '@/components/ecommerce/billing/BillInvoiceTable.vue'
const currentPageTitle = ref('Billing')
</script>
