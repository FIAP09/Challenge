<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="px-4 py-4 sm:pl-6 sm:pr-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">All Folders</h3>

        <a
          href="#"
          class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
        >
          View All
          <svg
            class="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715C17.4175 9.99763 17.4175 9.99812 17.4175 9.9986Z"
              fill=""
            />
          </svg>
        </a>
      </div>
    </div>
    <div class="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        <!-- Folders item-->
        <div
          class="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-6 dark:border-gray-800 dark:bg-white/[0.03] xl:py-[27px]"
        >
          <div class="flex justify-between mb-6">
            <div>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.3986 4.40674C12.9265 3.77722 12.1855 3.40674 11.3986 3.40674H2.5C1.11929 3.40674 0 4.52602 0 5.90674V30.0959C0 31.4766 1.11929 32.5959 2.5 32.5959H33.5C34.8807 32.5959 36 31.4766 36 30.0959V11.7446C36 10.3639 34.8807 9.24458 33.5 9.24458H18.277C17.4901 9.24458 16.7492 8.87409 16.277 8.24458L13.3986 4.40674Z"
                  fill="url(#paint0_linear_2816_28044)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2816_28044"
                    x1="18"
                    y1="3.40674"
                    x2="18"
                    y2="32.5959"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFDC78" />
                    <stop offset="1" stop-color="#FBBC1A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div class="relative"></div>
          </div>

          <h4 class="mb-1 text-sm font-medium text-gray-800 dark:text-white/90">Image</h4>
          <div class="flex items-center justify-between">
            <span class="block text-sm text-gray-500 dark:text-gray-400"> 345 Files </span>
            <span class="block text-sm text-right text-gray-500 dark:text-gray-400">
              26.40 GB
            </span>
          </div>
        </div>

        <!-- Folders item-->
        <div
          class="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-6 dark:border-gray-800 dark:bg-white/[0.03] xl:py-[27px]"
        >
          <div class="flex justify-between mb-6">
            <div>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.3986 4.40674C12.9265 3.77722 12.1855 3.40674 11.3986 3.40674H2.5C1.11929 3.40674 0 4.52602 0 5.90674V30.0959C0 31.4766 1.11929 32.5959 2.5 32.5959H33.5C34.8807 32.5959 36 31.4766 36 30.0959V11.7446C36 10.3639 34.8807 9.24458 33.5 9.24458H18.277C17.4901 9.24458 16.7492 8.87409 16.277 8.24458L13.3986 4.40674Z"
                  fill="url(#paint0_linear_2816_28044)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2816_28044"
                    x1="18"
                    y1="3.40674"
                    x2="18"
                    y2="32.5959"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFDC78" />
                    <stop offset="1" stop-color="#FBBC1A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div class="relative"></div>
          </div>

          <h4 class="mb-1 text-sm font-medium text-gray-800 dark:text-white/90">Documents</h4>
          <div class="flex items-center justify-between">
            <span class="block text-sm text-gray-500 dark:text-gray-400"> 130 Files </span>
            <span class="block text-sm text-right text-gray-500 dark:text-gray-400">
              26.40 GB
            </span>
          </div>
        </div>

        <!-- Folders item-->
        <div
          class="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-6 dark:border-gray-800 dark:bg-white/[0.03] xl:py-[27px]"
        >
          <div class="flex justify-between mb-6">
            <div>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.3986 4.40674C12.9265 3.77722 12.1855 3.40674 11.3986 3.40674H2.5C1.11929 3.40674 0 4.52602 0 5.90674V30.0959C0 31.4766 1.11929 32.5959 2.5 32.5959H33.5C34.8807 32.5959 36 31.4766 36 30.0959V11.7446C36 10.3639 34.8807 9.24458 33.5 9.24458H18.277C17.4901 9.24458 16.7492 8.87409 16.277 8.24458L13.3986 4.40674Z"
                  fill="url(#paint0_linear_2816_28044)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2816_28044"
                    x1="18"
                    y1="3.40674"
                    x2="18"
                    y2="32.5959"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFDC78" />
                    <stop offset="1" stop-color="#FBBC1A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div class="relative"></div>
          </div>

          <h4 class="mb-1 text-sm font-medium text-gray-800 dark:text-white/90">Apps</h4>
          <div class="flex items-center justify-between">
            <span class="block text-sm text-gray-500 dark:text-gray-400"> 130 Files </span>
            <span class="block text-sm text-right text-gray-500 dark:text-gray-400">
              26.40 GB
            </span>
          </div>
        </div>

        <!-- Folders item-->
        <div
          class="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-6 dark:border-gray-800 dark:bg-white/[0.03] xl:py-[27px]"
        >
          <div class="flex justify-between mb-6">
            <div>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.3986 4.40674C12.9265 3.77722 12.1855 3.40674 11.3986 3.40674H2.5C1.11929 3.40674 0 4.52602 0 5.90674V30.0959C0 31.4766 1.11929 32.5959 2.5 32.5959H33.5C34.8807 32.5959 36 31.4766 36 30.0959V11.7446C36 10.3639 34.8807 9.24458 33.5 9.24458H18.277C17.4901 9.24458 16.7492 8.87409 16.277 8.24458L13.3986 4.40674Z"
                  fill="url(#paint0_linear_2816_28044)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2816_28044"
                    x1="18"
                    y1="3.40674"
                    x2="18"
                    y2="32.5959"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFDC78" />
                    <stop offset="1" stop-color="#FBBC1A" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div class="relative"></div>
          </div>

          <h4 class="mb-1 text-sm font-medium text-gray-800 dark:text-white/90">Downloads</h4>
          <div class="flex items-center justify-between">
            <span class="block text-sm text-gray-500 dark:text-gray-400"> 345 Files </span>
            <span class="block text-sm text-right text-gray-500 dark:text-gray-400">
              26.40 GB
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
