import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/assets/css/base.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import  YrMenu from '@/components/menu'
import  YrSubMenu from '@/components/sub-menu'
const  components  = [
  YrMenu,
  YrSubMenu,
]

components.forEach(item => {
  Vue.use(item);
});



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
