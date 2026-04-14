<template>
  <form @submit.prevent="handleSubmit">
    <div class="-mx-2.5 flex flex-wrap gap-y-5">
      <div class="w-full px-2.5">
        <h4
          class="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90"
        >
          Personal Info
        </h4>
      </div>

      <div class="w-full px-2.5 xl:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          First Name
        </label>
        <input
          v-model="form.firstName"
          type="text"
          placeholder="Enter first name"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>

      <div class="w-full px-2.5 xl:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Last Name
        </label>
        <input
          v-model="form.lastName"
          type="text"
          placeholder="Enter last name"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>

      <div class="w-full px-2.5">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Gender
        </label>
        <div class="relative z-20 bg-transparent">
          <select
            v-model="form.gender"
            class="w-full px-4 py-3 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-11 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            :class="{ 'text-gray-500 dark:text-gray-400': form.gender }"
          >
            <option value="" disabled selected>Select Gender</option>
            <option value="male" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              Male
            </option>
            <option value="female" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              Female
            </option>
            <option value="other" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              Others
            </option>
          </select>
          <span
            class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
          >
            <svg
              class="stroke-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke=""
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="w-full px-2.5">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Date Picker Input
          </label>
          <div class="relative">
            <flat-pickr
              v-model="date"
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

      <div class="w-full px-2.5">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Category
        </label>
        <div class="relative z-20 bg-transparent">
          <select
            v-model="form.category"
            class="w-full px-4 py-3 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-11 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            :class="{ 'text-gray-500 dark:text-gray-400': form.category }"
          >
            <option value="" disabled selected>Select Category</option>
            <option value="category1" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              Category 1
            </option>
            <option value="category2" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              Category 2
            </option>
            <option value="category3" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              Category 3
            </option>
          </select>
          <span
            class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
          >
            <svg
              class="stroke-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke=""
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="w-full px-2.5">
        <h4
          class="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90"
        >
          Address
        </h4>
      </div>

      <div class="w-full px-2.5">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Street
        </label>
        <input
          v-model="form.street"
          type="text"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>

      <div class="w-full px-2.5 xl:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          City
        </label>
        <input
          v-model="form.city"
          type="text"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>

      <div class="w-full px-2.5 xl:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          State
        </label>
        <input
          v-model="form.state"
          type="text"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>

      <div class="w-full px-2.5 xl:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Post Code
        </label>
        <input
          v-model="form.postCode"
          type="text"
          class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>

      <div class="w-full px-2.5 xl:w-1/2">
        <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Country
        </label>
        <div class="relative z-20 bg-transparent">
          <select
            v-model="form.country"
            class="w-full px-4 py-3 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-11 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            :class="{ 'text-gray-500 dark:text-gray-400': form.country }"
          >
            <option value="" disabled selected>--Select Country--</option>
            <option value="usa" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              USA
            </option>
            <option value="canada" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              Canada
            </option>
          </select>
          <span
            class="absolute z-30 text-gray-500 -translate-y-1/2 right-4 top-1/2 dark:text-gray-400"
          >
            <svg
              class="stroke-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke=""
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div class="w-full px-2.5">
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium text-gray-800 dark:text-white/90"> Membership: </label>

          <div class="flex flex-wrap items-center gap-4">
            <div>
              <label
                class="relative flex items-center gap-3 text-sm font-medium cursor-pointer select-none"
                :class="
                  form.membership === 'free'
                    ? 'text-gray-700 dark:text-gray-400'
                    : 'text-gray-500 dark:text-gray-400'
                "
              >
                <input
                  class="sr-only"
                  type="radio"
                  name="membership"
                  value="free"
                  v-model="form.membership"
                />
                <span
                  :class="
                    form.membership === 'free'
                      ? 'border-brand-500 bg-brand-500'
                      : 'bg-transparent border-gray-300 dark:border-gray-700'
                  "
                  class="flex h-5 w-5 items-center justify-center rounded-full border-[1.25px]"
                >
                  <span
                    :class="form.membership === 'free' ? 'block' : 'hidden'"
                    class="w-2 h-2 bg-white rounded-full"
                  ></span>
                </span>
                Free
              </label>
            </div>

            <div>
              <label
                class="relative flex items-center gap-3 text-sm font-medium cursor-pointer select-none"
                :class="
                  form.membership === 'paid'
                    ? 'text-gray-700 dark:text-gray-400'
                    : 'text-gray-500 dark:text-gray-400'
                "
              >
                <input
                  class="sr-only"
                  type="radio"
                  name="membership"
                  value="paid"
                  v-model="form.membership"
                />
                <span
                  :class="
                    form.membership === 'paid'
                      ? 'border-brand-500 bg-brand-500'
                      : 'bg-transparent border-gray-300 dark:border-gray-700'
                  "
                  class="flex h-5 w-5 items-center justify-center rounded-full border-[1.25px]"
                >
                  <span
                    :class="form.membership === 'paid' ? 'block' : 'hidden'"
                    class="w-2 h-2 bg-white rounded-full"
                  ></span>
                </span>
                Paid
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full px-2.5">
        <div class="flex items-center gap-3 mt-1">
          <button
            type="submit"
            class="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600"
          >
            Save Changes
          </button>

          <button
            type="button"
            @click="resetForm"
            class="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import flatPickr from 'vue-flatpickr-component'
const form = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  dateOfBirth: '',
  category: '',
  street: '',
  city: '',
  state: '',
  postCode: '',
  country: '',
  membership: '',
})

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form)
}

const resetForm = () => {
  // Reset form fields
  Object.keys(form).forEach((key) => {
    form[key as keyof typeof form] = ''
  })
}

const date = ref(null)

const flatpickrConfig = {
  dateFormat: 'Y-m-d',
  altInput: true,
  altFormat: 'F j, Y',
  wrap: true,
}
</script>
