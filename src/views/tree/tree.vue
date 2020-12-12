<template>
  <div>
    <yr-tree :data='labelData' />

    <div>
      <y-tree :data='labelData' />
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      labelData: [
        {
          label: '1',
          id: '1',
          children: [{ label: '1-1', id: '1-1', isLeaf: 'leaf' }],
        },
        {
          label: '2',
          id: '2',
          children: [{ label: '2-1', id: '2-2' }],
        },
      ],
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region' }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const data = [
          {
            name: 'leaf',
            leaf: true,
          },
          {
            name: 'zone',
          },
        ]

        resolve(data)
      }, 500)
    },
    renderContent(h, { node, data, store }) {
      return 'sss'
    },
    renderContent1(h, { node, data, store }) {
      return 'sss'
    },
  },
}
</script>

<style>
</style>