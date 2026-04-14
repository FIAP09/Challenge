<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div className="space-y-5 sm:space-y-6">
      <ComponentCard title="Default Tab">
        <DefaultTab />
      </ComponentCard>
      <ComponentCard title="Tab With Underline">
        <TabWithUnderline />
      </ComponentCard>
      <ComponentCard title="Tab with line and icon"> <TabWithIcon /> </ComponentCard>
      <ComponentCard title="Tab with badge">
        <TabWithBadge />
      </ComponentCard>
      <ComponentCard title="Vertical Tab">
        <VerticalTab />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultTab from '@/components/ui/tab/DefaultTab.vue'
import TabWithBadge from '@/components/ui/tab/TabWithBadge/TabWithBadge.vue'
import TabWithUnderline from '@/components/ui/tab/TabWithUndrline/TabWithUnderline.vue'
import VerticalTab from '@/components/ui/tab/VerticalTab.vue'
import TabWithIcon from '@/components/ui/tab/TabWithIcon.vue'

const currentPageTitle = ref('Tabs')
</script>

<style></style>
