<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
import type { SetChildrenInstance } from './components'

defineOptions({
  name: 'YrTabsItem'
})

const props = defineProps({
  label: {
    type: String,
    default: 'Item'
  },
  name: {
    type: String
  }
})

const show = ref(true)

const setShow = (val: boolean) => {
  show.value = val
}

const fn = inject<SetChildrenInstance>('setChildrenInstance')!

onMounted(() => {
  fn({
    setShow,
    name: props.name!,
    label: props.label
  })
})
</script>

<template>
  <div v-show="show" class="cotent">
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
.cotent {
  min-height: 300px;
  padding: 20px;
}
</style>
