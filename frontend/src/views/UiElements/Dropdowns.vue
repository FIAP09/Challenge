<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <DropdownExample />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import DropdownExample from '@/components/ui/dropdown/DropdownExample.vue'

const currentPageTitle = ref('Dropdown')
</script>
