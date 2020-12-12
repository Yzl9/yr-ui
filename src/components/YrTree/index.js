import YrTree from './src/tree'

YrTree.install = function(Vue){
  Vue.component(YrTree.name,YrTree)
}

export default YrTree