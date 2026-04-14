<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
      <h3 class="text-lg font-medium text-gray-800 dark:text-white/90">Ticket Details</h3>
    </div>
    <ul class="divide-y divide-gray-100 px-6 py-3 dark:divide-gray-800">
      <li class="grid grid-cols-2 gap-5 py-2.5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Customer</span>
        <span class="text-gray-700 dark:text-gray-400">John Doe</span>
      </li>
      <li class="grid grid-cols-2 gap-5 py-2.5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Email</span>
        <span class="text-sm break-words text-gray-700 dark:text-gray-400"
          >jhondelin@gmail.com</span
        >
      </li>
      <li class="grid grid-cols-2 gap-5 py-2.5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Ticket ID </span>
        <span class="text-sm text-gray-700 dark:text-gray-400">#346520</span>
      </li>
      <li class="grid grid-cols-2 gap-5 py-2.5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Category</span>
        <span class="text-sm text-gray-700 dark:text-gray-400">General Support</span>
      </li>
      <li class="grid grid-cols-2 gap-5 py-2.5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Created</span>
        <span class="text-sm text-gray-700 dark:text-gray-400">Dec 20, 2028</span>
      </li>
      <li class="grid grid-cols-2 gap-5 py-2.5">
        <span class="text-sm text-gray-500 dark:text-gray-400">Status</span>
        <div>
          <span
            class="bg-blue-light-50 dark:bg-blue-light-500/15 dark:text-blue-light-500 text-theme-xs text-blue-light-500 inline-block rounded-full px-2 py-0.5 font-medium"
            >In Progress</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>
