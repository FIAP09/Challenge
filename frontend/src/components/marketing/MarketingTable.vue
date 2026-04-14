<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6"
  >
    <div class="flex justify-between gap-2 mb-4 sm:items-center">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Featured Campaigns</h3>
      </div>

      <div class="relative">
        <DropdownMenu :menu-items="menuItems">
          <template #icon>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                fill="currentColor"
              />
            </svg>
          </template>
        </DropdownMenu>
      </div>
    </div>

    <div class="max-w-full overflow-x-auto">
      <table class="min-w-full">
        <!-- table header start -->
        <thead>
          <tr class="border-gray-100 border-y dark:border-gray-800">
            <th class="py-3 font-normal">
              <div class="flex items-center">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">Creator</p>
              </div>
            </th>
            <th class="py-3 font-normal">
              <div class="flex items-center">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">Campaign</p>
              </div>
            </th>
            <th class="py-3 font-normal">
              <div class="flex items-center">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">Status</p>
              </div>
            </th>
          </tr>
        </thead>

        <!-- table header end -->

        <!-- table body start -->
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr v-for="(campaign, index) in campaigns" :key="index">
            <td class="py-3">
              <div class="flex items-center gap-[18px]">
                <div class="w-10 h-10 overflow-hidden rounded-full">
                  <img :src="campaign.creator.imageUrl" :alt="campaign.creator.name" />
                </div>
                <div>
                  <p class="text-gray-700 text-theme-sm dark:text-gray-400">
                    {{ campaign.creator.name }}
                  </p>
                </div>
              </div>
            </td>
            <td class="py-3">
              <div class="flex items-center">
                <div class="flex items-center w-full gap-5">
                  <div class="w-full max-w-8">
                    <img :src="campaign.brand.logo" class="size-8" :alt="campaign.brand.name" />
                  </div>
                  <div class="truncate">
                    <p
                      class="mb-0.5 truncate text-theme-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      {{ campaign.title }}
                    </p>
                    <span class="text-gray-500 text-theme-xs dark:text-gray-400">
                      {{ campaign.type }}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td class="py-3">
              <div class="flex items-center">
                <p :class="getStatusClass(campaign.status)">
                  {{ campaign.status }}
                </p>
              </div>
            </td>
          </tr>
        </tbody>

        <!-- table body end -->
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]

const campaigns = ref([
  {
    creator: { name: 'Wilson Gouse', imageUrl: '/images/user/user-01.jpg' },
    brand: { name: 'Brand 1', logo: '/images/brand/brand-01.svg' },
    title: 'Grow your brand by...',
    type: 'Ads campaign',
    status: 'Success',
  },
  {
    creator: { name: 'Terry Franci', imageUrl: '/images/user/user-02.jpg' },
    brand: { name: 'Brand 2', logo: '/images/brand/brand-02.svg' },
    title: 'Make Better Ideas...',
    type: 'Ads campaign',
    status: 'Pending',
  },
  {
    creator: { name: 'Alena Franci', imageUrl: '/images/user/user-03.jpg' },
    brand: { name: 'Brand 3', logo: '/images/brand/brand-03.svg' },
    title: 'Increase your website tra...',
    type: 'Ads campaign',
    status: 'Success',
  },
  {
    creator: { name: 'Jocelyn Kenter', imageUrl: '/images/user/user-04.jpg' },
    brand: { name: 'Brand 4', logo: '/images/brand/brand-04.svg' },
    title: 'Digital Marketing that...',
    type: 'Ads campaign',
    status: 'Failed',
  },
  {
    creator: { name: 'Brandon Philips', imageUrl: '/images/user/user-05.jpg' },
    brand: { name: 'Brand 2', logo: '/images/brand/brand-02.svg' },
    title: 'Self branding',
    type: 'Ads campaign',
    status: 'Success',
  },
  {
    creator: { name: 'James Lipshutz', imageUrl: '/images/user/user-06.jpg' },
    brand: { name: 'Brand 3', logo: '/images/brand/brand-03.svg' },
    title: 'Increase your website tra...',
    type: 'Ads campaign',
    status: 'Success',
  },
])

const getStatusClass = (status) => {
  const baseClasses = 'rounded-full px-2 py-0.5 text-theme-xs font-medium'
  switch (status) {
    case 'Success':
      return `${baseClasses} bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500`
    case 'Pending':
      return `${baseClasses} bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400`
    case 'Failed':
      return `${baseClasses} bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500`
    default:
      return baseClasses
  }
}
</script>
