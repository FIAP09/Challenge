<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
      <ComponentCard title="Unordered List">
        <UnorderedList />
      </ComponentCard>
      <ComponentCard title="Ordered List">
        <OrderList />
      </ComponentCard>
      <ComponentCard title="List With button">
        <ListWithButton />
      </ComponentCard>
      <ComponentCard title="List With Icon">
        <ListWithIcon />
      </ComponentCard>
      <div class="xl:col-span-2">
        <ComponentCard title="Horizontal List">
          <HorizontalList />
        </ComponentCard>
      </div>
      <ComponentCard title="List with checkbox">
        <ListWithCheckbox />
      </ComponentCard>
      <ComponentCard title="List with radio">
        <ListWithRadio />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import UnorderedList from '@/components/ui/list/UnorderedList.vue'
import OrderList from '@/components/ui/list/OrderList.vue'
import ListWithButton from '@/components/ui/list/ListWithButton.vue'
import ListWithIcon from '@/components/ui/list/ListWithIcon.vue'
import HorizontalList from '@/components/ui/list/HorizontalList.vue'
import ListWithCheckbox from '@/components/ui/list/ListWithCheckbox.vue'
import ListWithRadio from '@/components/ui/list/ListWithRadio.vue'
const currentPageTitle = ref('List')
</script>

<style></style>
