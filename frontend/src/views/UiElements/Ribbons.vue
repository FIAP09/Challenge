<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
      <ComponentCard title="Rounded Ribbon">
        <RoundedRibbon />
      </ComponentCard>
      <ComponentCard title="Ribbon With Shape">
        <RibbonWithShape />
      </ComponentCard>
      <ComponentCard title="Filled Ribbon">
        <FilledRibbon />
      </ComponentCard>
      <ComponentCard title="Ribbon in Hover">
        <RibbonInHover />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import RoundedRibbon from '@/components/ui/ribbon/RoundedRibbon.vue'
import RibbonWithShape from '@/components/ui/ribbon/RibbonWithShape.vue'
import FilledRibbon from '@/components/ui/ribbon/FilledRibbon.vue'
import RibbonInHover from '@/components/ui/ribbon/RibbonInHover.vue'
const currentPageTitle = ref('Ribbons')
</script>

<style></style>
