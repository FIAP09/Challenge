<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <EmailInbox />
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import EmailInbox from '@/components/email/EmailInbox.vue'

const currentPageTitle = ref('Inbox')
</script>

<style></style>
