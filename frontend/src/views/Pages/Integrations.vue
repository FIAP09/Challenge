<template>
  <admin-layout>
    <div>
      <IntegrationBreadcrumb :pageTitle="currentPageTitle" />
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <IntegrationCard
          v-for="integration in integrations"
          :key="integration.id"
          :id="integration.id"
          :title="integration.title"
          :desc="integration.desc"
          v-model:toggle="integration.toggle"
        >
          <template #icon>
            <component :is="integration.icon" />
          </template>
        </IntegrationCard>
      </div>
    </div>
  </admin-layout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import IntegrationBreadcrumb from '@/components/integrations/IntegrationBreadcrumb.vue'
import IntegrationCard from '@/components/integrations/IntegrationCard.vue'
import MailChimpIcon from '@/icons/MailChimpIcon.vue'
import MeetIcon from '@/icons/MeetIcon.vue'
import ZoomIcon from '@/icons/ZoomIcon.vue'
import GmailIcon from '@/icons/GmailIcon.vue'
import TrelloIcon from '@/icons/TrelloIcon.vue'
import NotionIcon from '@/icons/NotionIcon.vue'
import JiraIcon from '@/icons/JiraIcon.vue'
import LoomIcon from '@/icons/LoomIcon.vue'
import LinearIcon from '@/icons/LinearIcon.vue'

const currentPageTitle = ref('Integrations')

const integrations = ref([
  {
    id: 1,
    title: 'Mailchimp',
    desc: 'Connect Mailchimp to streamline your email marketing—automate campaigns.',
    icon: MailChimpIcon,
    toggle: true,
  },
  {
    id: 2,
    title: 'Google Meet',
    desc: 'Connect your Google Meet account for seamless video conferencing.',
    icon: MeetIcon,
    toggle: true,
  },
  {
    id: 3,
    title: 'Zoom',
    desc: 'Integrate Zoom to streamline your virtual meetings and team collaborations',
    icon: ZoomIcon,
    toggle: true,
  },
  {
    id: 4,
    title: 'Loom',
    desc: 'Integrate Loom to easily record, share, and manage video messages',
    icon: LoomIcon,
    toggle: true,
  },
  {
    id: 5,
    title: 'Google Meet',
    desc: 'Integrate Linear to manage issues, track progress, and streamline your team’s.',
    icon: LinearIcon,
    toggle: true,
  },
  {
    id: 6,
    title: 'Gmail',
    desc: 'Integrate Gmail to send, receive, and manage emails directly from your workspace.',
    icon: GmailIcon,
    toggle: true,
  },
  {
    id: 7,
    title: 'Trello',
    desc: 'Capture, organize, and tackle your to-dos from anywhere.',
    icon: TrelloIcon,
    toggle: true,
  },
  {
    id: 8,
    title: 'Notion',
    desc: 'Capture, organize, and tackle your to-dos from anywhere.',
    icon: NotionIcon,
    toggle: true,
  },
  {
    id: 9,
    title: 'Jira',
    desc: 'Track issues and manage projects with ease and full team visibility.',
    icon: JiraIcon,
    toggle: true,
  },
])
</script>
