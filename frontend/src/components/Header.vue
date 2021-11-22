<template>
  <div>
    <ion-menu side="end" content-id="main-content">
      <ion-header>
        <ion-toolbar translucent>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list id="menu-list">
          <router-link to="/profile">
            <ion-item detail="false" button>
              <ion-icon :icon="personCircle" slot="start"></ion-icon>
              <ion-label>Profil</ion-label>
            </ion-item>
          </router-link>
          <router-link to="/orders" button>
            <ion-item detail="false">
              <ion-icon :icon="bagCheck" slot="start"></ion-icon>
              <ion-label>Bestellen</ion-label>
            </ion-item>
          </router-link>

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

    <div id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start" v-if="hasBackButton">
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title>{{ title }}</ion-title>
          <ion-buttons slot="end">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </div>
  </div>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonLabel,
  alertController,
  IonBackButton,
} from '@ionic/vue';
import firebase from 'firebase';
import { bagCheck, cart, logOut, personCircle, settings } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButtons,
    IonMenuButton,
    IonLabel,
    IonBackButton,
  },
  setup() {
    const presentLogoutAlert = async () => {
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
              firebase
                .auth()
                .signOut()
                .catch((error: Error) => {
                  console.log(error.message);
                });
            },
          },
        ],
      });
      return alert.present();
    };

    return {
      personCircle,
      cart,
      bagCheck,
      settings,
      logOut,
      presentLogoutAlert,
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
