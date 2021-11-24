import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Onboarding from '../views/Onboarding.vue';
import LiefernHome from '../views/LiefernHome.vue';
import BestellenHome from '../views/BestellenHome.vue';
import Example from '@/views/Example.vue';

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
    path: '/onboarding',
    name: 'Onboarding',
    component: Onboarding,
  },
  {
    path: '/bestellen',
    name: 'Bestellen Übersicht',
    component: BestellenHome,
  },
  {
    path: '/liefern',
    name: 'Liefern Übersicht',
    component: LiefernHome,
  },
  {
    path: '/example',
    name: 'Example',
    component: Example,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
