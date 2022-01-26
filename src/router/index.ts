import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import { useAuth } from '@/composables/useAuth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/onboarding',
    name: 'Onboarding',
    component: () => import('@/views/Onboarding.vue'),
  },
  {
    path: '/orders',
    name: 'OrderOverview',
    component: () => import('@/views/OrderOverview.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/deliveries',
    name: 'DeliverOverview',
    component: () => import('@/views/DeliverOverview.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/deliveries/:id',
    name: 'DeliverDetails',
    component: () => import('@/views/DeliverDetails.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/orders/:id',
    name: 'OrderDetails',
    component: () => import('@/views/OrderDetails.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/orders/:id/confirmation',
    name: 'OrderConfirmation',
    component: () => import('@/views/OrderConfirmation.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// auth guard for navigation
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await useAuth().getCurrentUser())) {
    next('login');
  } else {
    next();
  }
});

export default router;
