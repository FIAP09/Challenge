<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6"
  >
    <div class="flex justify-between">
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
          Customers Demographic
        </h3>
        <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
          Number of customer based on country
        </p>
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
    <div
      class="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:px-6"
    >
      <div
        ref="mapOneRef"
        id="mapOne"
        class="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
      ></div>
    </div>
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="items-center w-full rounded-full max-w-8">
            <img src="/images/country/country-01.svg" alt="usa" />
          </div>
          <div>
            <p class="font-semibold text-gray-800 text-theme-sm dark:text-white/90">USA</p>
            <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
              2,379 Customers
            </span>
          </div>
        </div>

        <div class="flex w-full max-w-[140px] items-center gap-3">
          <div class="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
            <div
              class="absolute left-0 top-0 flex h-full w-[79%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
            ></div>
          </div>
          <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">79%</p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="items-center w-full rounded-full max-w-8">
            <img src="/images/country/country-02.svg" alt="france" />
          </div>
          <div>
            <p class="font-semibold text-gray-800 text-theme-sm dark:text-white/90">France</p>
            <span class="block text-gray-500 text-theme-xs dark:text-gray-400">
              589 Customers
            </span>
          </div>
        </div>

        <div class="flex w-full max-w-[140px] items-center gap-3">
          <div class="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
            <div
              class="absolute left-0 top-0 flex h-full w-[23%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
            ></div>
          </div>
          <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">23%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/maps/world'
import DropdownMenu from '../common/DropdownMenu.vue'
const menuItems = [
  { label: 'View More', onClick: () => console.log('View More clicked') },
  { label: 'Delete', onClick: () => console.log('Delete clicked') },
]

const mapOneRef = ref<HTMLElement | null>(null)
const mapInstance = ref<any>(null)

const initMap = () => {
  if (mapOneRef.value) {
    mapInstance.value = new jsVectorMap({
      selector: mapOneRef.value,
      map: 'world',
      zoomButtons: false,
      regionStyle: {
        initial: {
          fontFamily: 'Outfit',
          fill: '#D9D9D9',
        },
        hover: {
          fillOpacity: 1,
          fill: '#465fff',
        },
      },
      markers: [
        {
          name: 'Egypt',
          coords: [26.8206, 30.8025],
        },
        {
          name: 'United Kingdom',
          coords: [55.3781, 3.436],
        },
        {
          name: 'United States',
          coords: [37.0902, -95.7129],
        },
      ],
      markerStyle: {
        initial: {
          strokeWidth: 1,
          fill: '#465fff',
          fillOpacity: 1,
          r: 4,
        },
        hover: {
          fill: '#465fff',
          fillOpacity: 1,
        },
        selected: {},
        selectedHover: {},
      },
      onRegionTooltipShow: function (event: MouseEvent, tooltip: any) {
        const code = (event.target as HTMLElement).getAttribute('data-code')
        if (code === 'EG') {
          tooltip.setContent(tooltip.text() + ' (Hello Egypt)')
        }
      },
    })
  }
}

onMounted(() => {
  initMap()
})
</script>
