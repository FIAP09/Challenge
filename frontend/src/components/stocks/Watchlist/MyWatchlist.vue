<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">My Watchlist</h3>

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

    <div class="flex h-[372px] flex-col">
      <div class="flex flex-col h-auto pr-3 overflow-y-auto custom-scrollbar">
        <WatchlistItem v-for="item in watchlistItems" :key="item.symbol" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DropdownMenu from '../../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]
import WatchlistItem from './WatchlistItem.vue'

const watchlistItems = ref([
  {
    symbol: 'AAPL',
    name: 'Apple, Inc',
    logo: '/images/brand/brand-07.svg',
    price: '$4,008.65',
    change: 11.01,
  },
  {
    symbol: 'SPOT',
    name: 'Spotify.com',
    logo: '/images/brand/brand-11.svg',
    price: '$11,689.00',
    change: 9.48,
  },
  {
    symbol: 'ABNB',
    name: 'Airbnb, Inc',
    logo: '/images/brand/brand-12.svg',
    price: '$32,227.00',
    change: -0.29,
  },
  {
    symbol: 'ENVT',
    name: 'Envato, Inc',
    logo: '/images/brand/brand-13.svg',
    price: '$13,895.00',
    change: 3.79,
  },
  {
    symbol: 'AAPL',
    name: 'Apple, Inc',
    logo: '/images/brand/brand-07.svg',
    price: '$4,008.65',
    change: 11.01,
  },
  {
    symbol: 'SPOT',
    name: 'Spotify.com',
    logo: '/images/brand/brand-11.svg',
    price: '$11,689.00',
    change: 9.48,
  },
  {
    symbol: 'QIWI',
    name: 'qiwi.com, Inc',
    logo: '/images/brand/brand-14.svg',
    price: '$4,008.65',
    change: 4.52,
  },
])
</script>
