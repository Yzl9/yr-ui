### 简单介绍下背景

因为以前写vue2项目像element-ui自己简的封装了个tabs组件,就想迁移到vue3 改怎么写。

# vue3 的改变

### 没有了this

在 setup() 内部，this 不会是该活跃实例的引用（即不指向vue实例），因为 setup() 是在解析其它组件选项之前被调用的，所以 setup() 内部的 this 的行为与其它选项中的 this 完全不同。这在和其它选项式 API 一起使用 setup() 时可能会导致混淆。因此setup函数中不能使用this。所以Vue3为了避免我们错误的使用，直接将setup函数中的this修改成了 undefined.

### 这对我们有什么影响

首先一个tabs 组件应改像element-ui 一样分为tabs，tab-pane 的结构

![截屏2023-12-20 15.17.40.png](./src/assets/img/截屏2023-12-20%2015.17.40.png)

我们在tabs 组件内要获取到用props传给tab-pane 内部的 label ,name等属性 然后渲染成tab-bar。

在vue2中一般都是像这样做：

```
// tabs.vue
//...
<template>
  <div :class="className">
     <div
          v-for="(item, index) in list"
          :class="{
            isActive: classes(index)
          }"
          :key="index"
          @click="handleChange(item)"
        >
          {{ item.label }}
        </div>
    <div class="tab-cont"><slot></slot></div>
  </div>
</template>

  ...

  methods: {
    getTabsItem() {
    //list 存放了所有的tab-pane组件
      this.list = this.$children.filter(item => {
        return item.$options.name === 'TabPane'
      })
    },
  }
//...
```

上面代码中list 存放了所有的tab-pane组件，并用 v-for 渲染了label 属性

而tab-pane 的隐藏与显示,应该由自己控制

```
// tab-pane.vue
<template>
  <div
    :class="className"
    class="item"
    v-show="show"
    @click="handleClick"
    role="tabsitem"
  >
    <slot></slot>
  </div>
</template>

...
  data() {
    return {
      show: false,
    }
  },
...
```

在所有的节点挂载后 父组件tabs修改子组件的show属性来达到显示隐藏

```
// tabs.vue
...
    upData() {
      this.list.forEach(item => {
        item.show = item.name === this.activeName
      })
    },
...
```

为了确保所有组件挂载完成，你可以在tab-pane 组件挂在时 调用 tabs 的 initData()

```
 mounted() {
    this.$parent.initData()
  },
```

tabs 的 initData 方法

```
 initData() {
      this.getTabsItem()
      this.upData()
    },
```

你也可以在tabs 挂载后 在 nextTick 内调用initData

以上就是vue2 的思路。实际上elementui 的 vue2版本也是这个思路。

---

**但是vue3,没了this，改如何获取子组件的信息？**

**用getCurrentInstance？ 这个函数 or useSlot ?**

者两个确实都可以获取到用props 传个tab-pane 的name ,label 属性

##### 但是还有个致命的问题，以上两种方法虽然从tabs获取到name ,label 属性，但是显然还不够，这两种方式都无法获取 tab-pane 的 show 属性去控制子组件tab-pane的隐藏与显示.

#### 实际上连defineSlots() 返回的 slot 都能获取到name ,label 属性,那么该怎么做？

![截屏2023-12-20 16.25.21.png](./src/assets/img/截屏2023-12-20%2016.25.21.png)

其实我们可以在父组件提供个方法给子组件调用，当子组件挂载后就调用，把需要的属性传给父组件，需要用到provide，与 inject

tab.vue

```
<script setup lang="ts">

...

const chlldren: Child[]  = []

const setChildrenInstance: SetChildrenInstance = (child) => {
  chlldren.push(child)
}

provide('setChildrenInstance', setChildrenInstance)

...
</script>
```

tab-pane.vue

```
<script setup lang="ts">

...
const fn = inject<SetChildrenInstance>('setChildrenInstance')!

onMounted(() => {
  fn({
    setShow,
    name: props.name!,
    label: props.label
  })
})

...
</script>
```

### 详情请自行查看tabs下的文件

https://github.com/Yzl9/yr-ui/tree/master/src/components/table



事实上我估计 element-plus 内部也是差不多是这样，

```
...
const pane = reactive({
  uid: instance.uid,
  slots,
  props,
  paneName,
  active,
  index,
  isClosable,
})

onMounted(() => {
  tabsRoot.registerPane(pane)
})

...
```

我没看里面代码太复杂了 有兴趣的请自行探索   https://github.com/element-plus/element-plus/blob/dev/packages/components/tabs/src/tab-pane.vue
