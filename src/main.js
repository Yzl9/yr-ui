/*
 * @Author: your name
 * @Date: 2020-10-13 09:50:34
 * @LastEditTime: 2020-10-29 16:24:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sr-v.2.0d:\yzl\work\pc\pr\yr-ui\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/base.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

<<<<<<< HEAD
import  YrMenu from '@/components/menu'
import  YrSubMenu from '@/components/sub-menu'
import  YrMenuItem from '@/components/menu-item'
import  YrCarousel from '@/components/carousel'
import  YrCarouselItem from '@/components/carousel-item'
import  YrTree from '@/components/tree'
import  YTree from '@/components/YrTree/index.js'
const  components  = [
  YrMenu,
  YrSubMenu,
  YrMenuItem,
  YrCarousel,
  YrCarouselItem,
  YrTree,
  YTree
]
=======
import YrMenu from "@/components/menu";
import YrSubMenu from "@/components/sub-menu";
import YrMenuItem from "@/components/menu-item";
import YrCarousel from "@/components/carousel";
import YrCarouselItem from "@/components/carousel-item";
import * as VueWindow from "@/components/VueWindow";
>>>>>>> 5d4409ce8272a97e1e0db176369d4a0f3f257099

const components = [YrMenu, YrSubMenu, YrMenuItem, YrCarousel, YrCarouselItem];

components.forEach((item) => {
  Vue.use(item);
});
Vue.use(VueWindow);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
