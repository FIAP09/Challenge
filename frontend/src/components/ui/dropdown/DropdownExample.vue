<template>
  <div class="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
    <ComponentCard title="Default Dropdown">
      <div class="pb-[300px]">
        <DefaultDropdown />
      </div>
    </ComponentCard>
    <ComponentCard title="Dropdown With Divider">
      <div class="pb-[300px]">
        <DropdownWithDivider />
      </div>
    </ComponentCard>
    <ComponentCard title="Dropdown With Icon">
      <div class="pb-[300px]">
        <DropdownWithIcon />
      </div>
    </ComponentCard>
    <ComponentCard title="Dropdown With Icon and Divider">
      <div class="pb-[300px]">
        <DropdownIconDivider />
      </div>
    </ComponentCard>
  </div>
</template>

<script setup lang="ts">
import ComponentCard from '@/components/common/ComponentCard.vue'
import DefaultDropdown from './DefaultDropdown.vue'
import DropdownWithDivider from './DropdownWithDivider.vue'
import DropdownWithIcon from './DropdownWithIcon.vue'
import DropdownIconDivider from './DropdownIconDivider.vue'
</script>
