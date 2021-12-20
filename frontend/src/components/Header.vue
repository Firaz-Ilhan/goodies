<template>
  <ion-header>
    <ion-toolbar>
      <img :src="require('@/assets/images/' + menuBgImg)" class="menu-bg-img" />
      <ion-buttons slot="start" v-if="hasBackButton">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-menu-button menu="app-menu"></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
    <slot />
  </ion-header>
</template>

<script lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Header',
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonBackButton,
  },
  setup() {
    //Created life cycle hook, wird automatisch beim Aufruf ausgeführt*/
    const route = useRoute();
    const menuBgImg = ref('menu_background_order.svg');

    switch (route.path) {
      case '/home':
      case '/':
      case '/register': //for test reasons different ways for the imgpath..:
      case '/login':
      case '/onboarding':
      case '/profile':
        menuBgImg.value = 'menu_background_home.svg';
        break;
      case '/orders':
        menuBgImg.value = 'menu_background_order.svg';
        break;
      case '/example':
        menuBgImg.value = 'menu_background_deliver.svg';
        break;
      default:
        menuBgImg.value = 'menu_background_home.svg';
        break;
    }
    return { menuBgImg };

    /*Cleanere Alternative von Chris:  ToDo: verewnden, wenn alle Routen klar sind -> decken die Fälle alle Routen ab?
        if (route.path.includes('orders)){
          menuBgImg.value='menue_background_order.svg';
        } else if (route.path.includes('deliver')) {
          menuBgImg.value = 'menue_background_deliver.svg';
        }      
      */
  },
  props: { title: String, hasBackButton: Boolean },
});
</script>

<style scoped>
ion-menu-button {
  color: white;
}
.menu-bg-img {
  position: absolute;
  height: 100%;
  top: 0px;
  right: 0px;
}
</style>
