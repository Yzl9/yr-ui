import Tree from './src/tree.vue';

/* istanbul ignore next */
Tree.install = function(Vue) {
  Vue.component('YrTree', Tree);
};

export default Tree;
