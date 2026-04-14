<template>
  <div>
    <div class="flex flex-col items-center px-4 py-5 xl:px-6 xl:py-6">
      <div class="flex flex-col w-full gap-5 sm:justify-between xl:flex-row xl:items-center">
        <div
          class="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900"
        >
          <button
            v-for="group in taskGroups"
            :key="group.name"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md h group hover:text-gray-900 dark:hover:text-white"
            :class="
              selectedTaskGroup === group.name
                ? 'text-gray-900 dark:text-white bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400'
            "
            @click="selectedTaskGroup = group.name"
          >
            {{ group.label }}
            <span
              class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium leading-normal group-hover:bg-brand-50 group-hover:text-brand-500 dark:group-hover:bg-brand-500/15 dark:group-hover:text-brand-400"
              :class="
                selectedTaskGroup === group.name
                  ? 'text-brand-500 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/15'
                  : 'bg-white dark:bg-white/[0.03]'
              "
            >
              {{ group.count }}
            </span>
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-3 xl:justify-end">
          <button
            class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]"
          >
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
                d="M12.0826 4.0835C11.0769 4.0835 10.2617 4.89871 10.2617 5.90433C10.2617 6.90995 11.0769 7.72516 12.0826 7.72516C13.0882 7.72516 13.9034 6.90995 13.9034 5.90433C13.9034 4.89871 13.0882 4.0835 12.0826 4.0835ZM2.29004 6.65409H8.84671C9.18662 8.12703 10.5063 9.22516 12.0826 9.22516C13.6588 9.22516 14.9785 8.12703 15.3184 6.65409H17.7067C18.1209 6.65409 18.4567 6.31831 18.4567 5.90409C18.4567 5.48988 18.1209 5.15409 17.7067 5.15409H15.3183C14.9782 3.68139 13.6586 2.5835 12.0826 2.5835C10.5065 2.5835 9.18691 3.68139 8.84682 5.15409H2.29004C1.87583 5.15409 1.54004 5.48988 1.54004 5.90409C1.54004 6.31831 1.87583 6.65409 2.29004 6.65409ZM4.6816 13.3462H2.29085C1.87664 13.3462 1.54085 13.682 1.54085 14.0962C1.54085 14.5104 1.87664 14.8462 2.29085 14.8462H4.68172C5.02181 16.3189 6.34142 17.4168 7.91745 17.4168C9.49348 17.4168 10.8131 16.3189 11.1532 14.8462H17.7075C18.1217 14.8462 18.4575 14.5104 18.4575 14.0962C18.4575 13.682 18.1217 13.3462 17.7075 13.3462H11.1533C10.8134 11.8733 9.49366 10.7752 7.91745 10.7752C6.34124 10.7752 5.02151 11.8733 4.6816 13.3462ZM9.73828 14.096C9.73828 13.0904 8.92307 12.2752 7.91745 12.2752C6.91183 12.2752 6.09662 13.0904 6.09662 14.096C6.09662 15.1016 6.91183 15.9168 7.91745 15.9168C8.92307 15.9168 9.73828 15.1016 9.73828 14.096Z"
                fill=""
              />
            </svg>

            Filter & Short
          </button>

          <button
            @click="openTaskModal"
            class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
          >
            Add New Task
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
                d="M9.2502 4.99951C9.2502 4.5853 9.58599 4.24951 10.0002 4.24951C10.4144 4.24951 10.7502 4.5853 10.7502 4.99951V9.24971H15.0006C15.4148 9.24971 15.7506 9.5855 15.7506 9.99971C15.7506 10.4139 15.4148 10.7497 15.0006 10.7497H10.7502V15.0001C10.7502 15.4143 10.4144 15.7501 10.0002 15.7501C9.58599 15.7501 9.2502 15.4143 9.2502 15.0001V10.7497H5C4.58579 10.7497 4.25 10.4139 4.25 9.99971C4.25 9.5855 4.58579 9.24971 5 9.24971H9.2502V4.99951Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <Modal v-if="isTaskModalOpen" @close="closeTaskModal">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-11"
        >
          <div class="px-2">
            <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add a new task
            </h4>
            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Effortlessly manage your to-do list: add a new task
            </p>
          </div>
          <!-- close btn -->
          <button
            @click="closeTaskModal"
            class="transition-color absolute right-5 top-5 z-999 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300 sm:h-11 sm:w-11"
          >
            <svg
              class="fill-current size-5 sm:size-6"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                fill=""
              />
            </svg>
          </button>

          <form class="flex flex-col">
            <div class="custom-scrollbar h-[450px] overflow-y-auto px-2">
              <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Task Title
                  </label>
                  <input
                    type="text"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>

                <div>
                  <div>
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Due Date
                    </label>
                    <div class="relative">
                      <flat-pickr
                        v-model="formData.date"
                        :config="flatpickrConfig"
                        class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        placeholder="Select date"
                      />
                      <span
                        class="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400"
                      >
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
                            d="M6.66659 1.5415C7.0808 1.5415 7.41658 1.87729 7.41658 2.2915V2.99984H12.5833V2.2915C12.5833 1.87729 12.919 1.5415 13.3333 1.5415C13.7475 1.5415 14.0833 1.87729 14.0833 2.2915V2.99984L15.4166 2.99984C16.5212 2.99984 17.4166 3.89527 17.4166 4.99984V7.49984V15.8332C17.4166 16.9377 16.5212 17.8332 15.4166 17.8332H4.58325C3.47868 17.8332 2.58325 16.9377 2.58325 15.8332V7.49984V4.99984C2.58325 3.89527 3.47868 2.99984 4.58325 2.99984L5.91659 2.99984V2.2915C5.91659 1.87729 6.25237 1.5415 6.66659 1.5415ZM6.66659 4.49984H4.58325C4.30711 4.49984 4.08325 4.7237 4.08325 4.99984V6.74984H15.9166V4.99984C15.9166 4.7237 15.6927 4.49984 15.4166 4.49984H13.3333H6.66659ZM15.9166 8.24984H4.08325V15.8332C4.08325 16.1093 4.30711 16.3332 4.58325 16.3332H15.4166C15.6927 16.3332 15.9166 16.1093 15.9166 15.8332V8.24984Z"
                            fill=""
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Status
                  </label>
                  <div
                    x-data="{ isOptionSelected: false }"
                    class="relative z-20 bg-transparent dark:bg-form-input"
                  >
                    <select
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option value="" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        To Do
                      </option>
                      <option value="" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        In Progress
                      </option>
                      <option value="" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        Completed
                      </option>
                    </select>
                    <span
                      class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
                    >
                      <svg
                        class="stroke-current"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                          stroke=""
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Tags
                  </label>
                  <div class="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option value="" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        Marketing
                      </option>
                      <option value="" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        Template
                      </option>
                      <option value="" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        Development
                      </option>
                    </select>
                    <span
                      class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
                    >
                      <svg
                        class="stroke-current"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                          stroke=""
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Assignees
                  </label>
                  <div class="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    >
                      <option value="" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        Mayad Ahmed
                      </option>
                      <option value="" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        Juhan Ahamed
                      </option>
                      <option value="" class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                        Mahim Ahmed
                      </option>
                    </select>
                    <span
                      class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
                    >
                      <svg
                        class="stroke-current"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                          stroke=""
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Description
                  </label>
                  <textarea
                    rows="6"
                    class="dark:bg-dark-900 resize-none w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  ></textarea>
                </div>
              </div>

              <div
                class="relative p-3 mt-6 border border-gray-200 rounded-xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:p-5"
              >
                <input type="file" class="sr-only" />
                <div class="flex items-center gap-3 mb-5">
                  <span class="text-lg font-medium text-gray-800 dark:text-white/90">
                    Attachments
                  </span>
                  <span class="block w-px h-4 bg-gray-200 dark:bg-gray-800"></span>
                  <span class="text-sm font-medium text-brand-500"> Upload file </span>
                </div>

                <div class="flex flex-col items-center gap-3 sm:flex-row">
                  <div
                    class="group relative flex w-full cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-5 dark:border-gray-800 dark:bg-white/5 sm:w-auto"
                  >
                    <span
                      class="absolute flex items-center justify-center w-5 h-5 text-gray-400 bg-white border border-gray-200 rounded-full opacity-0 -right-2 -top-2 group-hover:opacity-100 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <svg
                        class="fill-current"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.02145 8.2704C2.82618 8.46567 2.82618 8.78225 3.02145 8.97751C3.21671 9.17277 3.53329 9.17277 3.72855 8.97751L5.99935 6.70672L8.2704 8.97777C8.46567 9.17303 8.78225 9.17303 8.97751 8.97777C9.17277 8.78251 9.17277 8.46592 8.97751 8.27066L6.70646 5.99961L8.97751 3.72855C9.17277 3.53329 9.17277 3.21671 8.97751 3.02145C8.78225 2.82618 8.46567 2.82618 8.2704 3.02145L5.99935 5.2925L3.72855 3.02171C3.53329 2.82644 3.21671 2.82644 3.02145 3.02171C2.82618 3.21697 2.82618 3.53355 3.02145 3.72881L5.29224 5.99961L3.02145 8.2704Z"
                          fill=""
                        />
                      </svg>
                    </span>

                    <div class="w-full h-10 max-w-10">
                      <img src="/images/task/pdf.svg" alt="icon" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                        Guidelines.pdf
                      </p>
                      <span class="flex items-center gap-1.5">
                        <span class="text-gray-500 text-theme-xs dark:text-gray-400"> PDF </span>
                        <span class="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span class="text-gray-500 text-theme-xs dark:text-gray-400">
                          Download
                        </span>
                      </span>
                    </div>
                  </div>

                  <div
                    class="group relative flex w-full cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-5 dark:border-gray-800 dark:bg-white/5 sm:w-auto"
                  >
                    <span
                      class="absolute flex items-center justify-center w-5 h-5 text-gray-400 bg-white border border-gray-200 rounded-full opacity-0 -right-2 -top-2 group-hover:opacity-100 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <svg
                        class="fill-current"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.02145 8.2704C2.82618 8.46567 2.82618 8.78225 3.02145 8.97751C3.21671 9.17277 3.53329 9.17277 3.72855 8.97751L5.99935 6.70672L8.2704 8.97777C8.46567 9.17303 8.78225 9.17303 8.97751 8.97777C9.17277 8.78251 9.17277 8.46592 8.97751 8.27066L6.70646 5.99961L8.97751 3.72855C9.17277 3.53329 9.17277 3.21671 8.97751 3.02145C8.78225 2.82618 8.46567 2.82618 8.2704 3.02145L5.99935 5.2925L3.72855 3.02171C3.53329 2.82644 3.21671 2.82644 3.02145 3.02171C2.82618 3.21697 2.82618 3.53355 3.02145 3.72881L5.29224 5.99961L3.02145 8.2704Z"
                          fill=""
                        />
                      </svg>
                    </span>

                    <div class="w-full h-10 max-w-10">
                      <img src="/images/task/google-drive.svg" alt="icon" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                        Branding Assets
                      </p>
                      <span class="flex items-center gap-1.5">
                        <span class="text-gray-500 text-theme-xs dark:text-gray-400"> Media </span>
                        <span class="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span class="text-gray-500 text-theme-xs dark:text-gray-400">
                          Download
                        </span>
                      </span>
                    </div>
                  </div>

                  <div
                    class="flex h-[60px] w-full cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 dark:border-gray-800 dark:bg-white/5 dark:text-gray-400 sm:w-[60px]"
                  >
                    <svg
                      class="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.2502 5.99951C11.2502 5.5853 11.586 5.24951 12.0002 5.24951C12.4145 5.24951 12.7502 5.5853 12.7502 5.99951V11.2498H18.0007C18.4149 11.2498 18.7507 11.5855 18.7507 11.9998C18.7507 12.414 18.4149 12.7498 18.0007 12.7498H12.7502V18.0002C12.7502 18.4144 12.4145 18.7502 12.0002 18.7502C11.586 18.7502 11.2502 18.4144 11.2502 18.0002V12.7498H6C5.58579 12.7498 5.25 12.414 5.25 11.9998C5.25 11.5855 5.58579 11.2498 6 11.2498H11.2502V5.99951Z"
                        fill=""
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center gap-6 px-2 mt-6 sm:flex-row sm:justify-between">
              <div class="flex flex-col items-center gap-3 sm:flex-row">
                <p class="text-sm text-gray-700 dark:text-gray-400">Viewers:</p>
                <div class="flex -space-x-2">
                  <div
                    class="w-8 h-8 overflow-hidden border border-white rounded-full dark:border-gray-900"
                  >
                    <img src="/images/user/user-13.jpg" alt="user" />
                  </div>
                  <div
                    class="w-8 h-8 overflow-hidden border border-white rounded-full dark:border-gray-900"
                  >
                    <img src="/images/user/user-14.jpg" alt="user" />
                  </div>
                  <div
                    class="w-8 h-8 overflow-hidden border border-white rounded-full dark:border-gray-900"
                  >
                    <img src="/images/user/user-15.jpg" alt="user" />
                  </div>
                </div>
              </div>

              <div class="flex items-center w-full gap-3 sm:w-auto">
                <button
                  @click="closeTaskModal"
                  type="button"
                  class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  @click="closeTaskModal"
                  type="button"
                  class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                >
                  Create Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Modal from './Modal.vue'
const selectedTaskGroup = ref('All')
const isTaskModalOpen = ref(false)

const openTaskModal = () => (isTaskModalOpen.value = true)
const closeTaskModal = () => (isTaskModalOpen.value = false)

const taskGroups = [
  { name: 'All', label: 'All Tasks', count: 23 },
  { name: 'Todo', label: 'To do', count: 3 },
  { name: 'InProgress', label: 'In Progress', count: 6 },
  { name: 'Completed', label: 'Completed', count: 14 },
]

import flatPickr from 'vue-flatpickr-component'

const flatpickrConfig = {
  dateFormat: 'Y-m-d',
  altInput: true,
  altFormat: 'F j, Y',
  wrap: true,
}

const formData = reactive({
  date: '',
})
</script>
