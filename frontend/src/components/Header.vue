<template>
  <ion-header class="ion-margin-bottom">
    <img v-bind;´:src="menueBgImg()" class="menue-bg-img">
    <ion-toolbar>
      <ion-buttons slot="start" v-if="hasBackButton">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-menu-button menu="app-menu"></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
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
import { defineComponent } from 'vue';
import {useRoute} from 'vue-router';

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
    const route = useRoute()
    function menueBgImg() { 
      const currentRoute= route.path; 
      console.log(currentRoute);

      switch(currentRoute){ 
        case "/home" || "/" || "/register" || "/login" || "/onboarding": return "require('@/assets/menueBgDelivery.svg')"; //  
        case "/bestellen": return "require('@/assets/images/menueBgOrder.svg')"; 
        case "/liefern": return "require('@/assets/images/menueBgDelivery.svg')"; 
        default: return "require('@/assets/images/menue_bg_deliver.svg')"; 
      } 
    }
     return { menueBgImg }
  }, 
  props: { title: String, hasBackButton: Boolean },
});
</script>
