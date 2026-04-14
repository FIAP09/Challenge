<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
      <ComponentCard title="Colored Links">
        <DefaultLinks />
      </ComponentCard>
      <ComponentCard title="Colored links with Underline">
        <UnderlineLinks />
      </ComponentCard>
      <ComponentCard title="Link Opacity">
        <OpacityLinks />
      </ComponentCard>
      <ComponentCard title="Link Opacity Hover">
        <OpacityLinkHover />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultLinks from '@/components/ui/custom-links/DefaultLinks.vue'
import UnderlineLinks from '@/components/ui/custom-links/UnderlineLinks.vue'
import OpacityLinks from '@/components/ui/custom-links/OpacityLinks.vue'
import OpacityLinkHover from '@/components/ui/custom-links/OpacityLinkHover.vue'

const currentPageTitle = ref('Links')
</script>

<style></style>
