import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import boardPage from '../views/board-page.vue'
import boardDetails from '../views/board-details.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/board',
      name: 'boardPage',
      component: boardPage
    },
    {
      path: '/board/:boardId',
      name: 'boardDetails',
      component: boardDetails
    },
  ]
})

export default router
