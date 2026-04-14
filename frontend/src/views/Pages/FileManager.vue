<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <media-card />
      </div>

      <div class="col-span-12 xl:col-span-8">
        <all-folder-card />
      </div>

      <div class="col-span-12 xl:col-span-4">
        <storage-chart />
      </div>

      <div class="col-span-12">
        <recent-files />
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import RecentFiles from '@/components/file-manager/RecentFiles.vue'
import MediaCard from '@/components/file-manager/MediaCard.vue'
import AllFolderCard from '@/components/file-manager/AllFolderCard.vue'
import StorageChart from '@/components/file-manager/StorageChart.vue'

const currentPageTitle = ref('File Manager')
</script>

<style></style>
