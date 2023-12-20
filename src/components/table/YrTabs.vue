<script setup lang="ts">
import { computed, ref, nextTick, provide, onMounted, watch } from 'vue'
import type { Child, SetChildrenInstance, retSlot, slotProps } from './components'

const slots = defineSlots<{
  default(): retSlot[]
}>()

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const slotList = slots.default()
const currentActive = ref(props.modelValue)
const list: slotProps[] = []

const children: Child[] = []

slotList.forEach((item) => {
  if (item.type.name === 'YrTabsItem') {
    list.push(item.props)
  }
})

const animation = computed(() => list[1].name === currentActive.value)

const handleClick = (item: slotProps) => {
  currentActive.value = item.name
  handdenchidren()
}

const handdenchidren = () => {
  children.forEach((item) => {
    item.setShow(currentActive.value === item.name)
  })
}

const setChildrenInstance: SetChildrenInstance = (child) => {
  children.push(child)
}

provide('setChildrenInstance', setChildrenInstance)

watch(
  () => currentActive.value,
  () => {
    emit('update:modelValue', currentActive.value)
  }
)

onMounted(() => {
  nextTick(() => {
    //确保挂载好了
    handdenchidren()
  })
})
</script>

<template>
  <div class="tab-box">
    <div class="tab-wrp">
      <div v-for="item in list" @click="handleClick(item)" :key="item.label" class="tabs-item">
        {{ item.label }}
      </div>
    </div>
    <div class="line-box">
      <div class="slider" :class="{ animation: animation }"></div>
      <div class="line"></div>
    </div>
    <div class="tab-cont"><slot></slot></div>
  </div>
</template>

<style>
.tab-box {
  background: white;
  flex: 1;
}
</style>
<style scoped lang="less">
.tab-wrp {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  justify-content: flex-start;
  .tabs-item {
    margin-top: 20px;
    color: #8bafd3;
    font-size: 17px;
    text-align: center;
    transition: all 0.3s ease;
    font-weight: 400;
    padding: 20px;
    min-width: 90px;
    border-right: 1px solid #8bafd3;
    cursor: pointer;
    &:last-child {
      border-right: none;
    }
  }
}

.line-box {
  margin: 20px 0 0 0px;
  position: relative;
}
.slider {
  position: relative;
  top: 2px;
  width: 90px;
  height: 2px;
  transition: transform 0.2s;
  background-color: #5586ff;
}
.animation {
  transform: translateX(90px);
}
.line {
  width: 100%;
  height: 2px;
  background: #c8c8c8;
}
</style>
