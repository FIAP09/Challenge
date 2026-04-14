<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Default Progress Bar">
        <div class="space-y-5 sm:max-w-[320px] w-full">
          <Progressbar :progress="55" />
          <Progressbar :progress="85" />
          <Progressbar :progress="35" />
        </div>
      </ComponentCard>
      <ComponentCard title="Default Progress Bar">
        <div class="space-y-5 sm:max-w-[320px] w-full">
          <Progressbar :progress="70" size="sm" />
          <Progressbar :progress="70" size="md" />
          <Progressbar :progress="70" size="lg" />
          <Progressbar :progress="70" size="xl" />
        </div>
      </ComponentCard>

      <ComponentCard title="Progress Bar with Inside Label">
        <div class="space-y-5 sm:max-w-[320px] w-full">
          <Progressbar :progress="40" label="outside" />
          <Progressbar :progress="70" label="outside" />
          <Progressbar :progress="30" label="outside" />
        </div>
      </ComponentCard>
      <ComponentCard title="Progress Bar with Inside Label">
        <div class="space-y-5 sm:max-w-[320px] w-full">
          <Progressbar :progress="40" label="inside" size="lg" />
          <Progressbar :progress="70" label="inside" size="lg" />
          <Progressbar :progress="30" label="inside" size="lg" />
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Progressbar from '@/components/ui/Progressbar.vue'
const currentPageTitle = ref('Progressbar')

const interactiveProgress = ref(50)
</script>

<style></style>
