/*
 * @Author: your name
 * @Date: 2020-10-13 09:50:34
 * @LastEditTime: 2020-10-29 16:50:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sr-v.2.0d:\yzl\work\pc\pr\yr-ui\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
<<<<<<< HEAD
import Home from "../views/tree/tree";
=======
import Home from "@/components/VueWindow/example/Float";
>>>>>>> 5d4409ce8272a97e1e0db176369d4a0f3f257099

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
  // {
  //   path: "/about",
  //   name: "About",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
