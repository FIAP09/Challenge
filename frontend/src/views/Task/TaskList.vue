<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div
      class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <TaskHeader />
      <div class="p-4 space-y-8 border-t border-gray-200 mt-7 dark:border-gray-800 sm:mt-0 xl:p-6">
        <div
          v-for="(column, columnIndex) in columns"
          :key="column.title"
          class="flex flex-col gap-4 swim-lane"
        >
          <div class="flex items-center justify-between mb-2">
            <h3
              class="flex items-center gap-3 text-base font-medium text-gray-800 dark:text-white/90"
            >
              {{ column.title }}
              <span
                :class="getColumnBadgeClass(column.title)"
                class="inline-flex rounded-full px-2 py-0.5 text-theme-xs font-medium"
              >
                {{ column.tasks.length }}
              </span>
            </h3>
            <ColumnMenu />
          </div>

          <draggable
            v-model="column.tasks"
            :group="{ name: 'tasks', pull: true, put: true }"
            item-key="id"
            class="space-y-4"
            @change="saveBoard"
          >
            <template #item="{ element: task }">
              <TaskItem :task="task" />
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
const currentPageTitle = ref('Task List')
import TaskHeader from './TaskHeader.vue'
import draggable from 'vuedraggable'
import ColumnMenu from './ColumnMenu.vue'
import TaskItem from './TaskItem.vue'

interface Task {
  id: number
  title: string
  date: string
  comments?: number
  attachments?: number
  tag?: { text: string; color: string }
  user: string
  description?: string
  image?: string
}

interface Column {
  title: 'To Do' | 'In Progress' | 'Completed'
  tasks: Task[]
}

const columns = ref<Column[]>([
  {
    title: 'To Do',
    tasks: [
      {
        id: 1,
        title: 'Finish user onboarding',
        date: 'Tomorrow',
        comments: 1,
        user: '/images/user/user-01.jpg',
      },
      {
        id: 2,
        title: 'Solve the Dribbble prioritisation issue with the team',
        date: 'Jan 8, 2027',
        comments: 2,
        attachments: 1,
        tag: { text: 'Marketing', color: 'brand' },
        user: '/images/user/user-07.jpg',
      },
      {
        id: 3,
        title: 'Change license and remove products',
        date: 'Jan 8, 2027',
        tag: { text: 'Dev', color: 'gray' },
        user: '/images/user/user-08.jpg',
      },
    ],
  },
  {
    title: 'In Progress',
    tasks: [
      {
        id: 4,
        title: 'Work In Progress (WIP) Dashboard',
        date: 'Today',
        comments: 1,
        user: '/images/user/user-09.jpg',
      },
      {
        id: 5,
        title: 'Kanban Flow Manager',
        date: 'Feb 12, 2027',
        comments: 8,
        attachments: 2,
        tag: { text: 'Template', color: 'success' },
        user: '/images/user/user-10.jpg',
      },
      {
        id: 6,
        title: 'Product Update - Q4 2024',
        date: 'Feb 12, 2027',
        comments: 8,
        description: 'Dedicated form for a category of users that will perform actions.',
        image: '/images/task/task.png',
        user: '/images/user/user-11.jpg',
      },
      {
        id: 7,
        title: 'Make figbot send comment when ticket is auto-moved back to inbox',
        date: 'Mar 08, 2027',
        comments: 1,
        user: '/images/user/user-12.jpg',
      },
    ],
  },
  {
    title: 'Completed',
    tasks: [
      {
        id: 8,
        title: 'Manage internal feedback',
        date: 'Tomorrow',
        comments: 1,
        user: '/images/user/user-13.jpg',
      },
      {
        id: 9,
        title: 'Do some projects on React Native with Flutter',
        date: 'Jan 8, 2027',
        tag: { text: 'Development', color: 'orange' },
        user: '/images/user/user-14.jpg',
      },
      {
        id: 10,
        title: 'Design marketing assets',
        date: 'Jan 8, 2027',
        comments: 2,
        attachments: 1,
        tag: { text: 'Marketing', color: 'brand' },
        user: '/images/user/user-15.jpg',
      },
      {
        id: 11,
        title: 'Kanban Flow Manager',
        date: 'Feb 12, 2027',
        comments: 8,
        tag: { text: 'Template', color: 'success' },
        user: '/images/user/user-16.jpg',
      },
    ],
  },
])

const getColumnBadgeClass = (columnTitle: 'To Do' | 'In Progress' | 'Completed') => {
  const baseClasses = 'inline-flex rounded-full px-2 py-0.5 text-xs font-medium'
  switch (columnTitle) {
    case 'To Do':
      return `${baseClasses} bg-gray-100 text-gray-700 dark:bg-white/[0.03] dark:text-white/80`
    case 'In Progress':
      return `${baseClasses} bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-orange-400`
    case 'Completed':
      return `${baseClasses} bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500`
    default:
      return baseClasses
  }
}

const saveBoard = () => {
  // Implement save logic here, e.g., sending data to a server
  console.log('Board saved', columns.value)
}
</script>
