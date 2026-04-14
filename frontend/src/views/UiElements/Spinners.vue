<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Spinner 1">
        <SpinnerOne />
      </ComponentCard>
      <ComponentCard title="Spinner 2">
        <SpinnerTwo />
      </ComponentCard>
      <ComponentCard title="Spinner 3">
        <SpinnerThree />
      </ComponentCard>
      <ComponentCard title="Spinner 4">
        <SpinnerFour />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import SpinnerOne from '@/components/ui/spinner/SpinnerOne.vue'
import SpinnerTwo from '@/components/ui/spinner/SpinnerTwo.vue'
import SpinnerThree from '@/components/ui/spinner/SpinnerThree.vue'
import SpinnerFour from '@/components/ui/spinner/SpinnerFour.vue'
const currentPageTitle = ref('Spinners')
</script>

<style></style>
