<script setup lang="ts">
import YrTabs from '@/components/table/YrTabs.vue'
import YrTabsItem from '@/components/table/YrTabsItem.vue'
import { ref } from 'vue'
const active = ref('first')
</script>

<template>
  <div class="box">
    <YrTabs v-model="active">
      <YrTabsItem label="user" name="first">
        <h2>use</h2>
      </YrTabsItem>
      <YrTabsItem label="config" name="second">
        <h2>config</h2>
      </YrTabsItem>
    </YrTabs>
  </div>
</template>

<style scoped></style>
