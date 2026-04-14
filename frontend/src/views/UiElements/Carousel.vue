<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
      <ComponentCard title="Slides Only">
        <SlideOnly />
      </ComponentCard>
      <ComponentCard title="With Control">
        <WithControl />
      </ComponentCard>
      <ComponentCard title="With Indicator">
        <WithIndicator />
      </ComponentCard>
      <ComponentCard title="With controls and indicators">
        <WithControlAndIndicators />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import SlideOnly from '@/components/ui/carousel/SlideOnly.vue'
import WithControl from '@/components/ui/carousel/WithControl.vue'
import WithIndicator from '@/components/ui/carousel/WithIndicator.vue'
import WithControlAndIndicators from '@/components/ui/carousel/WithControlAndIndicators.vue'
const currentPageTitle = ref('Carousel')
</script>

<style></style>
