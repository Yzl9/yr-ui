import YrMenuItem from '../menu/src/menu-item'

YrMenuItem.install = function(Vue){
  Vue.component(YrMenuItem.name,YrMenuItem)
}

export default YrMenuItem