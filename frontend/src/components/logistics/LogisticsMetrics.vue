<template>
  <!-- Metrics -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <article
      class="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3"
    >
      <div
        class="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90"
      >
        <svg
          class="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M14.0003 24.5898V24.5863M14.0003 12.8684V24.5863M9.06478 16.3657V10.6082M18.9341 5.67497C18.9341 5.67497 12.9204 8.68175 9.06706 10.6084M23.5913 8.27989C23.7686 8.55655 23.8679 8.88278 23.8679 9.2241V18.7779C23.8679 19.4407 23.4934 20.0467 22.9005 20.3431L14.7834 24.4015C14.537 24.5248 14.2686 24.5864 14.0003 24.5863M23.5913 8.27989L14.7834 12.6837C14.2908 12.93 13.7109 12.93 13.2182 12.6837L4.41037 8.27989M23.5913 8.27989C23.4243 8.01927 23.1881 7.80264 22.9005 7.65884L14.7834 3.60044C14.2908 3.35411 13.7109 3.35411 13.2182 3.60044L5.10118 7.65884C4.81359 7.80264 4.57737 8.01927 4.41037 8.27989M4.41037 8.27989C4.23309 8.55655 4.13379 8.88278 4.13379 9.2241V18.7779C4.13379 19.4407 4.5083 20.0467 5.10118 20.3431L13.2182 24.4015C13.4644 24.5246 13.7324 24.5862 14.0003 24.5863"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div>
        <h3 class="text-2xl font-semibold text-gray-800 dark:text-white/90">12,384</h3>
        <p class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          Total Orders
          <span
            class="bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500 inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium"
            >+20%</span
          >
        </p>
      </div>
    </article>
    <article
      class="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3"
    >
      <div
        class="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
        >
          <path
            d="M7.04102 4.66667H15.791C16.7575 4.66667 17.541 5.45017 17.541 6.41667V20.4167M17.541 20.4167V8.33004H20.4036C20.9846 8.33004 21.5277 8.61836 21.8532 9.09958L24.8239 13.4917C24.9171 13.6295 24.9897 13.7792 25.0402 13.9359M17.541 20.4167H17.5495M17.541 20.4167H11.5592M3.54102 20.4167H6.17451M25.1243 20.4167V14.4721C25.1243 14.2891 25.0956 14.1082 25.0402 13.9359M25.9993 20.4167H22.9342M12.8743 20.4167H17.5495M17.541 13.9359H25.0402M5.29102 9.04167H10.541M10.541 13.4167H3.54102M17.5495 20.4167C17.6595 19.026 18.8229 17.9317 20.2418 17.9317C21.6608 17.9317 22.8242 19.026 22.9342 20.4167M17.5495 20.4167C17.5439 20.4879 17.541 20.5599 17.541 20.6325C17.541 22.1241 18.7502 23.3333 20.2418 23.3333C21.7335 23.3333 22.9427 22.1241 22.9427 20.6325C22.9427 20.5599 22.9398 20.4879 22.9342 20.4167M11.5592 20.4167C11.5648 20.4879 11.5677 20.5599 11.5677 20.6325C11.5677 22.1241 10.3585 23.3333 8.86685 23.3333C7.37522 23.3333 6.16602 22.1241 6.16602 20.6325C6.16602 20.5599 6.16888 20.4879 6.17451 20.4167M11.5592 20.4167C11.4492 19.026 10.2858 17.9317 8.86685 17.9317C7.44787 17.9317 6.28447 19.026 6.17451 20.4167"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div>
        <h3 class="text-2xl font-semibold text-gray-800 dark:text-white/90">728</h3>
        <p class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          Orders in Transit
          <span
            class="bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500 inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium"
            >+20%</span
          >
        </p>
      </div>
    </article>
    <article
      class="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/3"
    >
      <div
        class="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white/90"
      >
        <svg
          class="h-7 w-7"
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.625 9.33333L3 9.33333M4.75 14H3M3.875 18.6667H3M9.90222 22.3117H23.0071C23.9027 22.3117 24.6537 21.6356 24.7475 20.7449L26.129 7.62071C26.2378 6.58744 25.4276 5.6875 24.3887 5.6875H11.2838C10.3882 5.6875 9.63716 6.36364 9.5434 7.25429L8.16184 20.3785C8.05307 21.4118 8.86324 22.3117 9.90222 22.3117ZM16.4622 5.6875H19.5793L18.7043 11.508H15.5872L16.4622 5.6875Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div>
        <h3 class="text-2xl font-semibold text-gray-800 dark:text-white/90">12,384</h3>
        <p class="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          Total Orders
          <span
            class="bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500 inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium"
            >+20%</span
          >
        </p>
      </div>
    </article>
  </div>
</template>
