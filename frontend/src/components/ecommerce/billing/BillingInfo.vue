<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white xl:w-2/6 dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="px-6 py-5">
      <h3 class="text-base font-medium text-gray-800 dark:text-white/90">Billing Info</h3>
    </div>
    <div class="border-t border-gray-200 p-4 sm:p-6 dark:border-gray-800">
      <ul class="divide-y divide-gray-100 dark:divide-gray-800">
        <li class="flex items-center gap-5 py-2.5">
          <span class="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">Name</span>
          <span class="w-1/2 text-sm font-medium text-gray-700 sm:w-2/3 dark:text-gray-400"
            >Mushafrof Chowdhury</span
          >
        </li>
        <li class="flex items-center gap-5 py-2.5">
          <span class="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">Street</span>
          <span class="w-1/2 text-sm font-medium text-gray-700 sm:w-2/3 dark:text-gray-400"
            >800 E Elcamino Real, suite #400</span
          >
        </li>
        <li class="flex items-center gap-5 py-2.5">
          <span class="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">City/State</span>
          <span class="w-1/2 text-sm font-medium text-gray-700 sm:w-2/3 dark:text-gray-400"
            >Mountain View, CA, 94040</span
          >
        </li>
        <li class="flex items-center gap-5 py-2.5">
          <span class="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">Country</span>
          <span class="w-1/2 text-sm font-medium text-gray-700 sm:w-2/3 dark:text-gray-400"
            >United States of America</span
          >
        </li>
        <li class="flex items-center gap-5 py-2.5">
          <span class="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400"
            >Zip/Postal code</span
          >
          <span class="w-1/2 text-sm font-medium text-gray-700 sm:w-2/3 dark:text-gray-400"
            >19029</span
          >
        </li>
        <li class="flex items-center gap-5 py-2.5">
          <span class="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">Town/City</span>
          <span class="w-1/2 text-sm font-medium text-gray-700 sm:w-2/3 dark:text-gray-400"
            >New York</span
          >
        </li>
        <li class="flex items-center gap-5 py-2.5">
          <span class="w-1/2 text-sm text-gray-500 sm:w-1/3 dark:text-gray-400">VAT Number</span>
          <span class="w-1/2 text-sm font-medium text-gray-700 sm:w-2/3 dark:text-gray-400"
            >DE4920348</span
          >
        </li>
      </ul>

      <div class="mt-10 xl:mt-2 2xl:mt-12">
        <button
          type="button"
          class="shadow-theme-xs flex w-full justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              d="M12.8861 5.08135L15.4182 7.61345M16.1437 3.59219L16.908 4.35652C17.3962 4.84468 17.3962 5.63613 16.908 6.12429L8.33547 14.6968C8.19039 14.8419 8.01182 14.9491 7.81554 15.0088L4.47461 16.0256L5.49141 12.6847C5.55115 12.4884 5.65829 12.3098 5.80337 12.1647L14.3759 3.59219C14.8641 3.10404 15.6555 3.10404 16.1437 3.59219Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Update Billing Address
        </button>
      </div>
    </div>
  </div>
</template>
