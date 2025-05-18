import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/kontak',
    name: 'kontak',
    component: () => import('../pages/ContactView.vue'),
  },
  {
    path: '/tentang-kami',
    name: 'about',
    component: () => import('../pages/AboutView.vue'),
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../pages/MenuView.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../pages/CartView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
