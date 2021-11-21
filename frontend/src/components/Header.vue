<template>
  <div>
    <ion-menu side="end" content-id="main-content">
      <ion-header>
        <ion-toolbar translucent>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <!-- TODO choose between router-link wrap or href -->
          <router-link to="/example">
            <ion-item button detail="false">
              <ion-icon :icon="personCircle" slot="start"></ion-icon>
              <ion-label>Profil</ion-label>
            </ion-item>
          </router-link>
          <ion-item>
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
          <ion-item button detail="false" @click="logout">
            <ion-icon :icon="logOut" slot="start"></ion-icon>
            <ion-label>Abmelden</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ title }}</ion-title>
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
  },
  setup() {
    const logout = () => {
      firebase
        .auth()
        .signOut()
        .catch((error: Error) => {
          alert(error.message);
        });
    };
    return { personCircle, cart, bagCheck, settings, logOut, logout };
  },

  props: { title: String },
});
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
