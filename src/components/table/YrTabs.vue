<script setup lang="ts">
import { computed, ref, nextTick, provide, onMounted, watch } from 'vue'
import type { SetChildrenInstance, retSlot, slotProps } from './components'
//const { ctx }  = getCurrentInstance();  //  方式一，这种方式只能在开发环境下使用，生产环境下//的ctx将访问不到
//const { proxy }  = getCurrentInstance();  //  方式二，此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
// getCurrentInstance 只能在 setup 或生命周期钩子中调用。

//访问组件实例的属性：可以通过 getCurrentInstance().ctx 或 getCurrentInstance().proxy 来获取当前组件实例的属性。例如，可以使用 getCurrentInstance().ctx.$props 访问组件的 props 属性。

//调用组件实例的方法：可以通过 getCurrentInstance().ctx 或 getCurrentInstance().proxy 来调用当前组件实例的方法。例如，可以使用 getCurrentInstance().ctx.$emit 来触发组件的自定义事件。

//在生命周期钩子中使用：可以在组件的生命周期钩子中使用 getCurrentInstance() 来获取当前组件实例，以便在钩子函数中访问组件实例的属性或调用组件实例的方法。

// 请注意，getCurrentInstance 的返回值是一个组件实例对象，可以通过 .ctx 来访问该实例的上下文对象，或者通过 .proxy 来访问该实例的代理对象。两者的区别在于，通过 .ctx 访问的是真实的组件实例，而通过 .proxy 访问的是一个代理对象，该代理对象可以在模板中直接使用。
//官方解说： 在 setup() 内部，this 不会是该活跃实例的引用（即不指向vue实例），因为 setup() 是在解析其它组件选项之前被调用的，所以 setup() 内部的 this 的行为与其它选项中的 this 完全不同。这在和其它选项式 API 一起使用 setup() 时可能会导致混淆。因此setup函数中不能使用this。所以Vue为了避免我们错误的使用，直接将setup函数中的this修改成了 undefined）

//我理解： 在Vue3中，setup 在生命周期 beforecreate 和 created 前执行，此时 vue 对象还未创建，因此，无法使用我们在 vue2.x 常用的 this。在生产环境内可能会获取不到该实例!!,而且我们确实不应该用该方法去代替this
//useOrderedChildren

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

const children: any[] = []

slotList.forEach((item) => {
  if (item.type.name === 'YrTabsItem') {
    list.push(item.props)
  }
})

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

const animation = computed(() => list[1].name === currentActive.value)
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
