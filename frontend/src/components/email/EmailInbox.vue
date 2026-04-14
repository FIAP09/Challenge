<template>
  <div class="sm:h-[calc(100vh-174px)] xl:h-[calc(100vh-186px)]">
    <div class="flex flex-col h-full gap-6 sm:gap-5 xl:grid xl:grid-cols-12">
      <!-- Inbox Sidebar Start -->
      <div class="xl:col-span-3 w-full">
        <EmailSidebar />
      </div>

      <!-- Inbox Sidebar End -->

      <!-- Inbox Mailbox Start -->
      <div class="xl:col-span-9 w-full">
        <EmailList />
      </div>

      <!-- Inbox Mailbox End -->
    </div>
  </div>
</template>

<script setup>
import EmailSidebar from './EmailSidebar.vue'
import EmailList from './EmailList.vue'
</script>
