<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="overflow-hidden xl:h-[calc(100vh-180px)]">
      <div class="grid h-full grid-cols-1 gap-5 xl:grid-cols-12">
        <div class="xl:col-span-8 2xl:col-span-9">
          <SupportReplyContent />
        </div>
        <div class="xl:col-span-4 2xl:col-span-3">
          <SupportDetails />
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import SupportDetails from '@/components/support/SupportDetails.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import { ref } from 'vue'
import SupportReplyContent from '@/components/support/SupportReplyContent.vue'
const currentPageTitle = ref('Ticket Reply')
</script>
