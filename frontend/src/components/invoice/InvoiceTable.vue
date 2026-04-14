<template>
  <div
    class="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto">
      <table class="min-w-full">
        <!-- table header start -->
        <thead>
          <tr class="border-b border-gray-100 dark:border-gray-800">
            <th class="px-5 py-3">
              <div class="flex items-center">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-400">#</p>
              </div>
            </th>
            <th class="px-5 py-3">
              <div class="flex items-center">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-400">Product</p>
              </div>
            </th>
            <th class="px-5 py-3">
              <div class="flex items-center justify-center">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-400">Quantity</p>
              </div>
            </th>
            <th class="px-5 py-3">
              <div class="flex items-center justify-center">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-400">Unit Cost</p>
              </div>
            </th>
            <th class="px-5 py-3">
              <div class="flex items-center col-span-2">
                <p class="w-full text-sm font-medium text-right text-gray-700 dark:text-gray-400">
                  Total
                </p>
              </div>
            </th>
          </tr>
        </thead>
        <!-- table header end -->

        <!-- table body start -->
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr v-for="item in tableItems" :key="item.id">
            <td class="px-5 py-3.5">
              <div class="flex items-center col-span-2">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ item.id }}</p>
              </div>
            </td>
            <td class="px-5 py-3.5">
              <div class="flex items-center col-span-3">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ item.product }}</p>
              </div>
            </td>
            <td class="px-5 py-3.5">
              <div class="flex items-center justify-center col-span-2">
                <p class="text-center text-gray-500 text-theme-sm dark:text-gray-400">
                  {{ item.quantity }}
                </p>
              </div>
            </td>
            <td class="px-5 py-3.5">
              <div class="flex items-center justify-center col-span-2">
                <p class="text-center text-gray-500 text-theme-sm dark:text-gray-400">
                  {{ item.unitCost }}
                </p>
              </div>
            </td>
            <td class="px-5 py-3.5">
              <div class="flex items-center justify-end col-span-2">
                <p class="text-right text-gray-500 text-theme-sm dark:text-gray-400">
                  {{ item.total }}
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

<script setup lang="ts">
import { ref } from 'vue'

interface TableItem {
  id: number
  product: string
  quantity: number
  unitCost: string
  total: string
}

const tableItems = ref<TableItem[]>([
  { id: 1, product: 'TailGrids', quantity: 1, unitCost: '$48', total: '$48' },
  { id: 2, product: 'GrayGrids', quantity: 4, unitCost: '$300', total: '$1200' },
  { id: 3, product: 'Uideck', quantity: 2, unitCost: '$800', total: '$1600' },
  { id: 4, product: 'FormBold', quantity: 2, unitCost: '$125', total: '$250' },
])
</script>
