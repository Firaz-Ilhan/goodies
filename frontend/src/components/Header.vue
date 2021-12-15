<template>
  <ion-header>
    <img :src="require('@/assets/images/'+ menueBgImg)" class="menue-bg-img">
    <ion-toolbar color="translucent">
      <ion-buttons slot="start" v-if="hasBackButton">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-menu-button id="menu-button" menu="app-menu"></ion-menu-button>
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
import { defineComponent, ref } from 'vue';
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
  setup() {                         //Created life cycle hook, wird automatisch beim Aufruf ausgeführt*/
    const route = useRoute();
    const menueBgImg = ref('menue_background_order.svg');

     switch(route.path){          //Kann in setup() ohne extra Methode/ function geschrieben werden
        case "/home":
         case "/": 
          case "/register": //for test reasons different ways for the imgpath..:
            case "/login":
             case"/onboarding":
              case "/profile": menueBgImg.value='menue_background_home.svg'; break;
        case "/orders": menueBgImg.value='menue_background_order.svg'; break;
        case "/example": menueBgImg.value='menue_background_deliver.svg'; break;
        default: menueBgImg.value ='menue_background_home.svg'; break;
      } return { menueBgImg }

      /*Cleanere Alternative von Chris:  ToDo: verewnden, wenn alle Routen klar sind -> decken die Fälle alle Routen ab?
        if (route.path.includes('ordersÄ)){
          menueBgImg.value='menue_background_order.svg';
        } else if (route.path.includes('deliver')) {
           menuBgImg.value = 'menue_background_deliver.svg';
        }      
      */
   
     
  }, 
  props: { title: String, hasBackButton: Boolean },
});
</script>


<style scoped>
a {
  text-decoration: none;
}
ion-toolbar{
--background-color: transparent;
}
menu-button{
  --ion-color-rgb:0,0,0;
}
.menue-bg-img{
  position: absolute;
  width: 80px;
  height: 100%;
  top: 0px;
  right: 0px;

}
</style>