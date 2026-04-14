<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Default Popover">
        <DefaultPopovers />
      </ComponentCard>
      <ComponentCard title="Popover With Button">
        <PopoverWithButton />
      </ComponentCard>
      <ComponentCard title="Popover With Link">
        <PopoverWithLink />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultPopovers from '@/components/ui/popover/DefaultPopovers.vue'
import PopoverWithButton from '@/components/ui/popover/PopoverWithButton.vue'
import PopoverWithLink from '@/components/ui/popover/PopoverWithLink.vue'
const currentPageTitle = ref('Popovers')
</script>

<style></style>
