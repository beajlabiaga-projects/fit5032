import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LearnView from '../views/LearnView.vue'
import { currentUser, isAuthenticated } from '../auth/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/learn',
      name: 'learn',
      component: LearnView,
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/BrowseView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/MyProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/organise',
      name: 'organise',
      component: () => import('../views/OrganiserView.vue'),
      meta: { requiresAuth: true, requiredRole: 'organiser' },
    },
    {
      path: '/organise/initiatives',
      name: 'manage-initiatives',
      component: () => import('../views/ManageInitiativesView.vue'),
      meta: { requiresAuth: true, requiredRole: 'organiser' },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})
// restricted protected page based on user role / login status using Vue Router
// https://router.vuejs.org/guide/advanced/navigation-guards.html
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'login' }
  }

  if (to.meta.requiredRole && currentUser.value?.role !== to.meta.requiredRole) {
    return { name: 'profile' }
  }
})
export default router
