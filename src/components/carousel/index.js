import YrCarousel from './src/main'

YrCarousel.install = function(Vue){
  Vue.component(YrCarousel.name,YrCarousel)
}

export default YrCarousel