<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Card with Image">
        <CardWithImage />
      </ComponentCard>
      <ComponentCard title="Horizontal Card with Image">
        <HorizontalCardWithImage />
      </ComponentCard>
      <ComponentCard title="Card with link">
        <CardWithLink />
      </ComponentCard>
      <ComponentCard title="Card with Icon ">
        <CardWithIcon />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import CardWithImage from '@/components/ui/cards/CardWithImage.vue'
import HorizontalCardWithImage from '@/components/ui/cards/HorizontalCardWithImage.vue'
import CardWithLink from '@/components/ui/cards/CardWithLink.vue'
import CardWithIcon from '@/components/ui/cards/CardWithIcon.vue'
const currentPageTitle = ref('Cards')
</script>

<style></style>
