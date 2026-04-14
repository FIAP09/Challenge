<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Primary Button Group">
        <PrimaryButtonGroup />
      </ComponentCard>
      <ComponentCard title="Primary Button Group with Left Icon">
        <ButtonGroupWithLeftIcon />
      </ComponentCard>
      <ComponentCard title="Primary Button Group with Right Icon">
        <ButtonGroupWithRightIcon />
      </ComponentCard>
      <ComponentCard title="Secondary Button Group">
        <SecondaryButtonGroup />
      </ComponentCard>
      <ComponentCard title="Secondary Button Group with Left Icon">
        <SecondaryButtonGroupWithLeftIcon />
      </ComponentCard>
      <ComponentCard title="Secondary Button Group with Right Icon">
        <SecondaryButtonGroupWithRightIcon />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PrimaryButtonGroup from '@/components/example/ButtonsGroup/PrimaryButtonGroup.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import ButtonGroupWithLeftIcon from '@/components/example/ButtonsGroup/ButtonGroupWithLeftIcon.vue'
import ButtonGroupWithRightIcon from '@/components/example/ButtonsGroup/ButtonGroupWithRightIcon.vue'
import SecondaryButtonGroup from '@/components/example/ButtonsGroup/SecondaryButtonGroup.vue'
import SecondaryButtonGroupWithLeftIcon from '@/components/example/ButtonsGroup/SecondaryButtonGroupWithLeftIcon.vue'
import SecondaryButtonGroupWithRightIcon from '@/components/example/ButtonsGroup/SecondaryButtonGroupWithRightIcon.vue'

const currentPageTitle = ref('Buttons Groups')
</script>

<style></style>
