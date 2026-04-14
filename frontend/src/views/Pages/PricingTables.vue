<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Price Table 1">
        <PricingTableOne />
      </ComponentCard>
      <ComponentCard title="Price Table 2">
        <PricingTableTwo />
      </ComponentCard>
      <ComponentCard title="Price Table 3">
        <PricingTableThree />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PricingTableOne from '@/components/pricing/PricingTableOne.vue'
import PricingTableTwo from '@/components/pricing/PricingTableTwo.vue'
import PricingTableThree from '@/components/pricing/PricingTableThree.vue'
const currentPageTitle = ref('Invoice')
</script>

<style></style>
