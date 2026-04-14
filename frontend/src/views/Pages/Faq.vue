<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Faq 1">
        <FaqOne />
      </ComponentCard>
      <ComponentCard title="Faq 2">
        <FaqTwo />
      </ComponentCard>
      <ComponentCard title="Faq 3">
        <FaqThree />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import FaqOne from '@/components/faq/FaqOne.vue'
import FaqTwo from '@/components/faq/faq-two/FaqTwo.vue'
import FaqThree from '@/components/faq/faq-three/FaqThree.vue'
const currentPageTitle = ref('Faq')
</script>
