<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800"
    >
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Support Tickets</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Your most recent support tickets list
        </p>
      </div>
      <div class="flex gap-3.5">
        <div
          class="hidden h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 lg:inline-flex dark:bg-gray-900"
        >
          <button
            v-for="status in ['All', 'Solved', 'Pending']"
            :key="status"
            @click="selectedStatus = status"
            :class="{
              'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800':
                selectedStatus === status,
              'text-gray-500 dark:text-gray-400': selectedStatus !== status,
            }"
            class="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white"
          >
            {{ status }}
          </button>
        </div>
        <div class="hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center">
          <div class="relative">
            <span class="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
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
                  d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                  fill=""
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <th class="px-4 py-3 whitespace-nowrap">
              <div class="flex w-full cursor-pointer items-center justify-between">
                <div class="flex items-center gap-3">
                  <label
                    class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400"
                  >
                    <span class="relative">
                      <input
                        type="checkbox"
                        class="sr-only"
                        v-model="selectAll"
                        @change="toggleAll"
                      />
                      <span
                        :class="{
                          'border-brand-500 bg-brand-500': selectAll,
                          'bg-transparent border-gray-300 dark:border-gray-700': !selectAll,
                        }"
                        class="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]"
                      >
                        <span :class="{ 'opacity-0': !selectAll }">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              strokeರ
                              stroke="white"
                              stroke-width="1.6666"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </span>
                    </span>
                  </label>
                  <p class="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                    Ticket ID
                  </p>
                </div>
              </div>
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-700 dark:text-gray-400"
            >
              <div
                class="flex cursor-pointer items-center justify-between gap-3"
                @click="sortTickets('name')"
              >
                <p class="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                  Requested By
                </p>
                <span class="flex flex-col gap-0.5">
                  <svg
                    :class="{
                      'text-gray-500 dark:text-gray-300': sortBy === 'name' && sortAsc,
                      'text-gray-300 dark:text-gray-400': !(sortBy === 'name' && sortAsc),
                    }"
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    :class="{
                      'text-gray-500 dark:text-gray-300': sortBy === 'name' && !sortAsc,
                      'text-gray-300 dark:text-gray-400': !(sortBy === 'name' && !sortAsc),
                    }"
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </div>
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-700 dark:text-gray-400"
            >
              Subject
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-700 dark:text-gray-400"
            >
              <div
                class="flex cursor-pointer items-center justify-between gap-3"
                @click="sortTickets('date')"
              >
                <p class="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                  Create Date
                </p>
                <span class="flex flex-col gap-0.5">
                  <svg
                    :class="{
                      'text-gray-500 dark:text-gray-300': sortBy === 'date' && sortAsc,
                      'text-gray-300 dark:text-gray-400': !(sortBy === 'date' && sortAsc),
                    }"
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    :class="{
                      'text-gray-500 dark:text-gray-300': sortBy === 'date' && !sortAsc,
                      'text-gray-300 dark:text-gray-400': !(sortBy === 'date' && !sortAsc),
                    }"
                    width="8"
                    height="5"
                    viewBox="0 0 8 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </div>
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-700 dark:text-gray-400"
            >
              Status
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-medium whitespace-nowrap text-gray-700 dark:text-gray-400"
            >
              <div class="relative">
                <span class="sr-only">Action</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
          <tr
            v-for="ticket in paginatedTickets"
            :key="ticket.id"
            class="transition hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="flex items-center gap-3">
                <label
                  class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400"
                >
                  <span class="relative">
                    <input
                      type="checkbox"
                      class="sr-only"
                      :value="ticket.id"
                      v-model="selected"
                      @change="toggleOne(ticket.id)"
                    />
                    <span
                      :class="{
                        'border-brand-500 bg-brand-500': selected.includes(ticket.id),
                        'bg-transparent border-gray-300 dark:border-gray-700': !selected.includes(
                          ticket.id,
                        ),
                      }"
                      class="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]"
                    >
                      <span :class="{ 'opacity-0': !selected.includes(ticket.id) }">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="white"
                            stroke-width="1.6666"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                  </span>
                </label>
                <p class="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                  {{ ticket.id }}
                </p>
              </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <div>
                <span class="text-sm font-medium text-gray-800 dark:text-white/90">{{
                  ticket.name
                }}</span>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ ticket.email }}</p>
              </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <p class="text-sm text-gray-700 dark:text-gray-400">{{ ticket.subject }}</p>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <p class="text-sm text-gray-700 dark:text-gray-400">{{ ticket.date }}</p>
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <span
                :class="ticket.statusClass + ' text-theme-xs rounded-full px-2 py-0.5 font-medium'"
                >{{ ticket.status }}</span
              >
            </td>
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="relative flex justify-center">
                <TableDropdown>
                  <template v-slot:dropdown-button>
                    <button
                      type="button"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      class="text-gray-500 dark:text-gray-400'"
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
                          d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </template>
                  <template v-slot:dropdown-content>
                    <a
                      href="#"
                      class="flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      role="menuitem"
                    >
                      View More
                    </a>
                    <a
                      href="#"
                      class="flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      role="menuitem"
                    >
                      Delete
                    </a>
                  </template>
                </TableDropdown>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="flex items-center flex-col sm:flex-row justify-between border-t border-gray-200 px-5 py-4 dark:border-gray-800"
    >
      <div class="pb-3 sm:p-0">
        <span class="block text-sm font-medium text-gray-500 dark:text-gray-400">
          Showing
          <span class="text-gray-800 dark:text-white/90">{{
            (currentPage - 1) * perPage + 1
          }}</span>
          to
          <span class="text-gray-800 dark:text-white/90">{{
            Math.min(currentPage * perPage, filteredTickets.length)
          }}</span>
          of <span class="text-gray-800 dark:text-white/90">{{ filteredTickets.length }}</span>
        </span>
      </div>
      <div
        class="flex items-center justify-between gap-2 w-full sm:w-auto rounded-lg sm:justify-normal bg-gray-50 dark:bg-white/[0.03] p-4 sm:p-0 sm:bg-transparent dark:sm:bg-transparent"
      >
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          <span>
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
                d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z"
              />
            </svg>
          </span>
        </button>
        <span class="block text-sm font-medium text-gray-700 sm:hidden dark:text-gray-400">
          Page <span>{{ currentPage }}</span> of <span>{{ totalPages }}</span>
        </span>
        <ul class="hidden items-center gap-0.5 sm:flex">
          <li v-for="page in totalPages" :key="page">
            <a
              href="#"
              @click.prevent="goToPage(page)"
              :class="{
                'bg-brand-500 hover:bg-brand-500 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-white hover:text-white':
                  currentPage === page,
                'hover:bg-brand-500 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:text-white dark:text-gray-400 dark:hover:text-white':
                  currentPage !== page,
              }"
            >
              <span>{{ page }}</span>
            </a>
          </li>
        </ul>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          <span>
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
                d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TableDropdown from '../common/TableDropdown.vue'

const tickets = ref([
  {
    id: '#323534',
    name: 'Lindsey Curtis',
    email: 'demoemail@gmail.com',
    subject: 'Issue with Dashboard Login Access',
    date: '12 Feb, 2027',
    status: 'Solved',
    statusClass: 'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500',
  },
  {
    id: '#323535',
    name: 'Kaiya George',
    email: 'demoemail@gmail.com',
    subject: 'Billing Information Not Updating Properly',
    date: '13 Mar, 2027',
    status: 'Pending',
    statusClass: 'bg-warning-50 dark:bg-warning-500/15 text-warning-600 dark:text-warning-500',
  },
  {
    id: '#323536',
    name: 'Zain Geidt',
    email: 'demoemail@gmail.com',
    subject: 'Bug Found in Dark Mode Layout',
    date: '19 Mar, 2027',
    status: 'Pending',
    statusClass: 'bg-warning-50 dark:bg-warning-500/15 text-warning-600 dark:text-warning-500',
  },
  {
    id: '#323537',
    name: 'Abram Schleifer',
    email: 'demoemail@gmail.com',
    subject: 'Request to Add New Integration Feature',
    date: '25 Apr, 2027',
    status: 'Solved',
    statusClass: 'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500',
  },
  {
    id: '#323538',
    name: 'Mia Chen',
    email: 'mia.chen@email.com',
    subject: 'Unable to Reset Password',
    date: '28 Apr, 2027',
    status: 'Pending',
    statusClass: 'bg-warning-50 dark:bg-warning-500/15 text-warning-600 dark:text-warning-500',
  },
  {
    id: '#323539',
    name: 'John Doe',
    email: 'john.doe@email.com',
    subject: 'Feature Request: Dark Mode',
    date: '30 Apr, 2027',
    status: 'Solved',
    statusClass: 'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500',
  },
  {
    id: '#323540',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    subject: 'Error 500 on Dashboard',
    date: '01 May, 2027',
    status: 'Pending',
    statusClass: 'bg-warning-50 dark:table-dark-500/15 text-warning-600 dark:text-warning-500',
  },
  {
    id: '#323541',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@email.com',
    subject: 'Cannot Download Invoice',
    date: '02 May, 2027',
    status: 'Solved',
    statusClass: 'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500',
  },
  {
    id: '#323542',
    name: 'Emily Clark',
    email: 'emily.clark@email.com',
    subject: 'UI Bug in Mobile View',
    date: '03 May, 2027',
    status: 'Pending',
    statusClass: 'bg-warning-50 dark:bg-warning-500/15 text-warning-600 dark:text-warning-500',
  },
  {
    id: '#323543',
    name: 'Liam Wong',
    email: 'liam.wong@email.com',
    subject: 'Account Locked',
    date: '04 May, 2027',
    status: 'Solved',
    statusClass: 'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500',
  },
  {
    id: '#323544',
    name: 'Sophia Patel',
    email: 'sophia.patel@email.com',
    subject: 'Integration Not Working',
    date: '05 May, 2027',
    status: 'Pending',
    statusClass: 'bg-warning-50 dark:bg-warning-500/15 text-warning-600 dark:text-warning-500',
  },
  {
    id: '#323545',
    name: 'Noah Kim',
    email: 'noah.kim@email.com',
    subject: 'Request for API Access',
    date: '06 May, 2027',
    status: 'Solved',
    statusClass: 'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500',
  },
])

const selectedStatus = ref('All')
const showFilter = ref(false)
const selectAll = ref(false)
const selected = ref([])
const currentPage = ref(1)
const perPage = 10
const sortBy = ref('')
const sortAsc = ref(true)
const openDropdown = ref(null)

const filteredTickets = computed(() => {
  if (selectedStatus.value === 'All') return tickets.value
  return tickets.value.filter((ticket) => ticket.status === selectedStatus.value)
})

const totalPages = computed(() => Math.ceil(filteredTickets.value.length / perPage) || 1)

const paginatedTickets = computed(() => {
  const sorted = [...filteredTickets.value].sort((a, b) => {
    if (!sortBy.value) return 0
    let valA = a[sortBy.value]
    let valB = b[sortBy.value]
    if (sortBy.value === 'date') {
      const parse = (v) =>
        new Date(v.split(',').length > 1 ? v : v.replace(/(\d{2}) (\w+), (\d{4})/, '$2 $1, $3'))
      valA = parse(valA)
      valB = parse(valB)
    } else {
      valA = valA.toLowerCase()
      valB = valB.toLowerCase()
    }
    if (valA < valB) return sortAsc.value ? -1 : 1
    if (valA > valB) return sortAsc.value ? 1 : -1
    return 0
  })
  const start = (currentPage.value - 1) * perPage
  return sorted.slice(start, start + perPage)
})

function sortTickets(field) {
  if (sortBy.value === field) {
    sortAsc.value = !sortAsc.value
  } else {
    sortBy.value = field
    sortAsc.value = true
  }
  currentPage.value = 1
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page
}

function toggleAll() {
  if (selectAll.value) {
    selected.value = paginatedTickets.value.map((t) => t.id)
  } else {
    selected.value = []
  }
}

function toggleOne(id) {
  if (selected.value.includes(id)) {
    selected.value = selected.value.filter((i) => i !== id)
  } else {
    selected.value.push(id)
  }
  selectAll.value = selected.value.length === paginatedTickets.value.length
}

function toggleDropdown(id) {
  openDropdown.value = openDropdown.value === id ? null : id
}
</script>

<style>
.shadow-theme-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
```
