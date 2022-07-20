import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import boardsPage from '../views/boards-page.vue'
import boardDetails from '../views/board-details.vue'
import taskDetails from '../views/task-details.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/board',
      name: 'boardsPage',
      component: boardsPage
    },
    {
      path: '/board/:boardId',
      name: 'boardDetails',
      component: boardDetails
    },
    {
      path: '/board/:boardId/:groupId/:taskId',
      name: 'taskDetails',
      component: taskDetails
    },
  ]
})

export default router
