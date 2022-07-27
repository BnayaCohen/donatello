import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import boardsPage from '../views/boards-page.vue'
import boardDetails from '../views/board-details.vue'
import taskDetails from '../views/task-details.vue'
import loginPage from '../views/login-page.vue'
import dashboard from '../views/dashboard.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/board',
      name: 'boardsPage',
      component: boardsPage,
    },
    {
      path: '/board/:boardId',
      name: 'boardDetails',
      component: boardDetails,
      children: [
        {
          path: ':groupId/:taskId',
          component: taskDetails,
        },
        {
          path: 'dashboard',
          component: dashboard,
        },
      ],
    },
    {
      path: '/:loginOrSignup',
      name: 'loginPage',
      component: loginPage,
    },
  ],
})
router.addRoute({ path: '/:groupId/:taskId', component: taskDetails })

export default router
