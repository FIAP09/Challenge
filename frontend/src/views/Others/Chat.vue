<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
      <div class="flex flex-col h-full gap-6 xl:flex-row xl:gap-5">
        <chat-sidebar />
        <!-- Chat Box Start -->
        <chat-box />
        <!-- Chat Box End -->
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ChatSidebar from '../../components/chat/ChatSidebar.vue'
import ChatBox from '../../components/chat/ChatBox.vue'

const currentPageTitle = ref('Chat')
</script>

<style></style>
