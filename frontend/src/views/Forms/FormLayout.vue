<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div class="space-y-5 sm:space-y-6">
        <ComponentCard title="Basic Form">
          <BasicForm />
        </ComponentCard>
        <ComponentCard title="Example Form">
          <ExampleForm />
        </ComponentCard>
      </div>
      <div class="space-y-5 sm:space-y-6">
        <ComponentCard title="Example Form With Icons">
          <ExampleFormWithIcons />
        </ComponentCard>
        <ComponentCard title="Example Form">
          <ExampleFormTwo />
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import BasicForm from '@/components/forms/FormLayout/BasicForm.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import ExampleForm from '@/components/forms/FormLayout/ExampleForm.vue'
import ExampleFormWithIcons from '@/components/forms/FormLayout/ExampleFormWithIcons.vue'
import ExampleFormTwo from '@/components/forms/FormLayout/ExampleFormTwo.vue'

const currentPageTitle = ref('Form Layout')
</script>
