import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name:'posts',
    component: () => import('../views/PostsView.vue')
  }, 
  {
    path: '/usuarios',
    name:'users',
    component: () => import('../views/UsersView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
