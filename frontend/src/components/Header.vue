<template>
  <ion-header class="ion-margin-bottom">
    <img :src="menueBgImg()" class="menue-bg-img">
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
    const route = useRoute();
    //const imgRoute=menueBgImg();
    function menueBgImg() { 
      const currentRoute= route.path; 
      console.log(currentRoute);

      switch(currentRoute){ 
        case "/home":
          case "/": 
          case "/register":
            case "/login": case"/onboarding": return "require('../assets/images/menue_background_home.svg')";
        case "/bestellen": return "require('../assets/images/menue_background_order.svg')"; 
        case "/liefern": return "require('../assets/images/menue_background_deliver.svg')"; 
        default: return "require('../assets/images/menue_background_deliver.svg')"; 
      } 
    }
     return { menueBgImg }
  }, 
  props: { title: String, hasBackButton: Boolean },
});
</script>
