<template>
  <ion-menu menu-id="app-menu" side="end" content-id="main-content">
    <ion-header>
      <ion-toolbar translucent>
        <ion-title>Goodies | Menü</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="menu-content">
      <ion-list id="menu-list">
        <ion-item
          @click="navigateMenu('/home')"
          detail="false"
          menu-close
          button
        >
          <ion-icon :icon="home" ></ion-icon>
          <ion-label>Home</ion-label>
        </ion-item>    
        <ion-item
          @click="navigateMenu('/orders')"
          detail="false"
          menu-close
          button
        >
          <ion-icon :icon="bagCheck" ></ion-icon>
          <ion-label>Bestellen</ion-label>
        </ion-item>

        <ion-item>
          <ion-icon :icon="cart" ></ion-icon>
          <ion-label>Einkaufen &#38; Liefern</ion-label>
        </ion-item>
        <ion-item @click="navigateMenu('/onboarding')" detail="false" button>
          <ion-icon :icon="rocket" ></ion-icon>
          <ion-label>Onoarding</ion-label>
        </ion-item>
        <br/>
        <br/>
        <br/>
        <br/>
        <ion-item @click="navigateMenu('/profile')" detail="false" button>
          <ion-icon :icon="personCircle" ></ion-icon>
          <ion-label>Profil</ion-label>
        </ion-item>
        <ion-item button detail="false" @click="presentLogoutAlert">
          <ion-icon :icon="logOut" ></ion-icon>
          <ion-label>Abmelden</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { useAuth } from '../composables/useAuth';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonLabel,
  IonToolbar,
  IonTitle,
  alertController,
  menuController,
} from '@ionic/vue';
import { home, bagCheck, cart, logOut, personCircle, rocket } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Menu',
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonIcon,
    IonLabel,
    IonToolbar,
    IonTitle,
  },
  methods: {
    // navigate to path and close the menu
    async navigateMenu(path: string) {
      this.$router.push(path);
      menuController.close('app-menu');
    },

    // open alert to confirm logout
    async presentLogoutAlert() {
      const alert = await alertController.create({
        header: 'Möchtest du dich wirklich ausloggen?',
        buttons: [
          {
            text: 'Abbrechen',
            role: 'cancel',
          },
          {
            text: 'Logout',
            handler: () => {
              useAuth().logout();
              this.navigateMenu('/login');
            },
          },
        ],
      });
      return alert.present();
    },
  },
  data() {
    return {
      home,
      personCircle,
      cart,
      bagCheck,
      rocket,
      logOut,
    };
  },

  props: { title: String, hasBackButton: Boolean },
});
</script>

<style scoped>
a {
  text-decoration: none;
}

.router-link-active * {
  color: #3880ff;
}
</style>
