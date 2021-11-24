import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Onboarding from '@/views/Onboarding.vue';
import LiefernHome from '@/views/LiefernHome.vue';
import BestellenHome from '@/views/BestellenHome.vue';
import Example from '@/views/Example.vue';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
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
    path: '/bestellen',
    name: 'Bestellen Übersicht',
    component: () => import('@/BestellenHome),
  },
  {
    path: '/liefern',
    name: 'Liefern Übersicht',
    component: () => import('@/LiefernHome'),
  },
  {
    path: '/example',
    name: 'Example',
    component: () => import('@/views/Example.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
