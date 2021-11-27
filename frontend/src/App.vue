<template>
  <ion-app>
    <Menu />
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import firebase from 'firebase';
import { defineComponent, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Menu from './components/Menu.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Menu,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          if (route.path !== '/register') {
            router.replace('/login');
          }
        } else if (
          (user && route.path === '/login') ||
          route.path === '/register'
        ) {
          router.replace('/');
        }
      });
    });
  },
});
</script>
