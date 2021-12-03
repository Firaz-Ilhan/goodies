<template>
  <ion-menu menu-id="app-menu" side="end" content-id="main-content">
    <ion-header>
      <ion-toolbar translucent>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="menu-content">
      <ion-list id="menu-list">
        <ion-item @click="navigateMenu('/example')" detail="false" button>
          <ion-icon :icon="personCircle" slot="start"></ion-icon>
          <ion-label>Profil</ion-label>
        </ion-item>
        <ion-item
          @click="navigateMenu('/orders')"
          detail="false"
          menu-close
          button
        >
          <ion-icon :icon="bagCheck" slot="start"></ion-icon>
          <ion-label>Bestellen</ion-label>
        </ion-item>

        <ion-item>
          <ion-icon :icon="cart" slot="start"></ion-icon>
          <ion-label>Einkaufen &#38; Liefern</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :icon="settings" slot="start"></ion-icon>
          <ion-label>Einstellungen</ion-label>
        </ion-item>
        <ion-item button detail="false" @click="presentLogoutAlert">
          <ion-icon :icon="logOut" slot="start"></ion-icon>
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
import { bagCheck, cart, logOut, personCircle, settings } from 'ionicons/icons';
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
      personCircle,
      cart,
      bagCheck,
      settings,
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
