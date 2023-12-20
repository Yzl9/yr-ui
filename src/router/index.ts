import { createRouter, createWebHistory } from 'vue-router'
import TableView from '../views/TableView.vue'
import LayoutView from '@/layout/LayoutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LayoutView,
      children: [
        {
          name: 'YrTable',
          path: '/yrTable',
          component: TableView
        },
        {
          path: '/',
          redirect: () => {
            return { name: 'YrTable' }
          }
        }
      ]
    }
  ]
})

export default router
