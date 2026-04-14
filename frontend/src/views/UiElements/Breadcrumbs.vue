<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Default Breadcrumb">
        <Breadcrumb :items="breadcrumbItems" />
        <Breadcrumb :items="breadcrumbItemsTwo" />
      </ComponentCard>
      <ComponentCard title="Breadcrumb With Icon">
        <Breadcrumb :items="breadcrumbItems" variant="withIcon" />
        <Breadcrumb :items="breadcrumbItemsTwo" variant="withIcon" />
      </ComponentCard>
      <ComponentCard title="Default Breadcrumb">
        <Breadcrumb :items="breadcrumbItems" variant="chevron" />
        <Breadcrumb :items="breadcrumbItemsTwo" variant="chevron" />
      </ComponentCard>
      <ComponentCard title="Default Breadcrumb">
        <Breadcrumb :items="breadcrumbItems" variant="dotted" />
        <Breadcrumb :items="breadcrumbItemsTwo" variant="dotted" />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '../../components/common/PageBreadcrumb.vue'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import ComponentCard from '../../components/common/ComponentCard.vue'
import Breadcrumb from '../../components/ui/Breadcrumb.vue'
const currentPageTitle = ref('Breadcrumb')
const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'UI Kits' }]
const breadcrumbItemsTwo = [
  { label: 'Home', href: '/' },
  { label: 'Ui Kits', href: '/' },
  { label: 'Avatar' },
]
</script>
