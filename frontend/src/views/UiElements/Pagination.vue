<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div className="space-y-5 sm:space-y-6">
      <ComponentCard title="Pagination with Text">
        <PaginationWithText :totalPages="20" :initialPage="1" @pageChange="handlePageChange" />
      </ComponentCard>
      <ComponentCard title="Pagination with Text and Icon">
        <PaginationWithTextAndIcon
          :totalPages="20"
          :initialPage="1"
          @pageChange="handlePageChange"
        />
      </ComponentCard>
      <ComponentCard title="Pagination with Icon">
        <PaginationWithIcon :totalPages="20" :initialPage="1" @pageChange="handlePageChange" />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PaginationWithText from '@/components/ui/pagination/PaginationWithText.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import PaginationWithIcon from '@/components/ui/pagination/PaginationWithIcon.vue'
import PaginationWithTextAndIcon from '@/components/ui/pagination/PaginationWithTextAndIcon.vue'

const currentPageTitle = ref('Pagination')

const handlePageChange = (page) => {
  console.log(`Page changed to ${page}`)
  // Fetch new data or update the view based on the new page
}
</script>
