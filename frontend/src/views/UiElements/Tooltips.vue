<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Default Tooltip">
        <div>
          <Tooltip content="Top tooltip" position="top">
            <Button size="sm">Tooltip Top</Button>
          </Tooltip>
        </div>
      </ComponentCard>
      <ComponentCard title="White and Dark Tooltip">
        <div class="flex items-center gap-10">
          <Tooltip content="White Tooltip">
            <Button size="sm">Light Tooltip</Button>
          </Tooltip>
          <Tooltip content="Dark Tooltip" theme="dark">
            <Button size="sm">Dark Tooltip</Button>
          </Tooltip>
        </div>
      </ComponentCard>
      <ComponentCard title="Tooltip Placement">
        <div class="flex items-center flex-wrap gap-10">
          <Tooltip content="This is a tooltip" position="top">
            <Button size="sm">Tooltip Top</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip" position="right">
            <Button size="sm">Tooltip Right</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip" position="left">
            <Button size="sm">Tooltip Left</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip" position="bottom">
            <Button size="sm">Tooltip Bottom</Button>
          </Tooltip>
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import Button from '@/components/ui/Button.vue'
const currentPageTitle = ref('Tooltips')
</script>

<style></style>
