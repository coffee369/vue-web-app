import { useAuthStore } from '@/stores/auth'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
  ],
})

/**
 * Redirect users if unauthenticated
 */
router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const publicPages = ['/login', '/register', '/']
  const authenticatedPages = !publicPages.includes(to.path)

  if (authenticatedPages && !authStore.access_token) {
    return '/login'
  }
})

export default router
