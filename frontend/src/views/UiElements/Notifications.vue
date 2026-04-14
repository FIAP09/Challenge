<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Announcement Bar">
        <AnnouncementBar
          :title="notificationTitle"
          :message="notificationMessage"
          :laterButtonText="laterText"
          :updateButtonText="updateText"
          @later="handleLater"
          @update="handleUpdate"
        />
      </ComponentCard>
      <ComponentCard title="Toast Notification">
        <ToastNotification
          v-if="showBanner"
          :message="bannerMessage"
          :settingsButtonText="settingsText"
          :denyButtonText="denyText"
          :acceptButtonText="acceptText"
          @close="handleClose"
          @openSettings="handleOpenSettings"
          @denyAll="handleDenyAll"
          @acceptAll="handleAcceptAll"
        />
      </ComponentCard>
      <ComponentCard title="Success Notification">
        <Notification type="success" message="Success! Action Completed!" />
      </ComponentCard>
      <ComponentCard title="Info Notification">
        <Notification type="info" message="Heads Up! New Information"
      /></ComponentCard>
      <ComponentCard title="Warning Notification">
        <Notification type="warning" message="Alert: Double Check Required" />
      </ComponentCard>
      <ComponentCard title="Error Notification">
        <Notification type="error" message="Something Went Wrong" />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Notification from '@/components/ui/notification/Notification.vue'
import AnnouncementBar from '@/components/ui/notification/AnnouncementBar.vue'
import ToastNotification from '@/components/ui/notification/ToastNotification.vue'
const currentPageTitle = ref('Notifications')
const notificationTitle = ref('New update! Available')
const notificationMessage = ref('Enjoy improved functionality and enhancements.')
const laterText = ref('Later')
const updateText = ref('Update Now')
const handleUpdate = () => {
  console.log('User clicked "Update Now" button')
}
const handleLater = () => {
  actionLog.value.push('User clicked "Later" button')
}
const showBanner = ref(true)
const bannerMessage = ref(
  'By Clicking on "Accept", you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.',
)
const settingsText = ref('Cookie Settings')
const denyText = ref('Deny All')
const acceptText = ref('Accept All')

const actionLog = ref<string[]>([])

const handleClose = () => {
  showBanner.value = false
  actionLog.value.push('Banner closed')
}

const handleOpenSettings = () => {
  actionLog.value.push('Cookie Settings opened')
}

const handleDenyAll = () => {
  showBanner.value = false
  actionLog.value.push('All cookies denied')
}

const handleAcceptAll = () => {
  showBanner.value = false
  actionLog.value.push('All cookies accepted')
}
</script>

<style></style>
