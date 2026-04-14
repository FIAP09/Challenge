<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
      <RegularModal />
      <VerticallyCentered />
      <FormInModal />
      <FullScreenModal />
      <ModalBasedAlerts />
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import RegularModal from '@/components/example/ModalsExample/RegularModal.vue'
import ModalBasedAlerts from '@/components/example/ModalsExample/ModalBasedAlerts.vue'
import VerticallyCentered from '@/components/example/ModalsExample/VerticallyCentered.vue'
import FormInModal from '@/components/example/ModalsExample/FormInModal.vue'
import FullScreenModal from '@/components/example/ModalsExample/FullScreenModal.vue'
const currentPageTitle = ref('Modals')
</script>
