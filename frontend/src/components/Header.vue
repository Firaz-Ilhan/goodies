<template>
  <ion-header>
    <ion-toolbar>
      <img
        :src="require('@/assets/images/' + menuBgImg)"
        alt=""
        class="menu-bg-img"
      />
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
    const route = useRoute();
    const menuBgImg = ref('menu_background_home.svg');

    if (route.path.includes('orders')) {
      menuBgImg.value = 'menu_background_order.svg';
    } else if (route.path.includes('deliver')) {
      menuBgImg.value = 'menu_background_deliver.svg';
    }

    return { menuBgImg };
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
