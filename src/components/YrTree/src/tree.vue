<template>
  <div
    class="el-tree"
    role="tree"
  >
    <yr-tree-node
      v-for="(child,index) in root.childNodes"
      :node='child'
      :key="index"
    />
  </div>
</template>

<script>
import YrTreeNode from './tree-node'
import TreeStore from './model/tree-store.js'
export default {
  name: 'YTree',
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      root: null,
    }
  },
  components: {
    YrTreeNode,
  },
  created() {
    this.store = new TreeStore({
      data: this.data,
    })
    this.root = this.store.root
    console.log('root',this.root)
  },
}
</script>

<style>
</style>