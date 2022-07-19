import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../views/home-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/board',
    //   name: 'board-details',
    //   component: homePage
    // },
    {
      path: '/',
      name: 'home',
      component: homePage
    },
  ]
})

export default router
