<template>
  <div>trenode
    <node-content></node-content>
  </div>
</template>

<script>
import TreeNode from '../../tree/src/tree-node.vue'
export default {
  name: 'YrTreeNode',
  props: {
    renderContent: Function,
    node: {
      default: () => {
        return {}
      },
    },
  },
  components: {
    NodeContent: {
      render(h) {
        const parent = this.$parent
        const tree = parent.tree
        const node = this.node
        // const { data, store } = node
        // return parent.renderContent ? (
        //   parent.renderContent.call(parent._renderProxy, h, {
        //     _self: tree.$vnode.context,
        //     node,
        //     data,
        //     store,
        //   })
        // ) : tree.$scopedSlots.default ? (
        //   tree.$scopedSlots.default({ node, data })
        // ) : (
        //   <span class="el-tree-node__label">{node.label}</span>
        // )
        return 'aa'
      },
    },
  },
  mounted() {
  },
}
</script>

<style>
</style>