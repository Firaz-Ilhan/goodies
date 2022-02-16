<template>
  <ion-menu menu-id="app-menu" side="end" content-id="main-content" id="menu">
    <ion-header>
      <ion-toolbar translucent id="ion-toolbar-menu">
        <ion-title>Goodies | Menü</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list class="menu-list">
        <div>
          <ion-item
            :class="$route.path === '/home' && 'active-link'"
            @click="navigateMenu('/home')"
            detail="false"
            button
          >
            <ion-icon :icon="home" slot="start"></ion-icon>
            <ion-label>Home</ion-label>
          </ion-item>

          <ion-item
            :class="$route.path.includes('/orders') && 'active-link'"
            @click="navigateMenu('/orders')"
            detail="false"
            button
          >
            <ion-icon :icon="bagCheck" slot="start"></ion-icon>
            <ion-label>Bestellen</ion-label>
          </ion-item>

          <ion-item
            :class="$route.path.includes('/deliveries') && 'active-link'"
            @click="navigateMenu('/deliveries')"
            detail="false"
            button
          >
            <ion-icon :icon="cart" slot="start"></ion-icon>
            <ion-label>Einkaufen &#38; Liefern</ion-label>
          </ion-item>
        </div>
        <div class="ion-margin-bottom">
          <ion-item
            :class="$route.path === '/profile' && 'active-link'"
            @click="navigateMenu('/profile')"
            detail="false"
            button
          >
            <ion-icon :icon="personCircle" slot="start"></ion-icon>
            <ion-label>Profil</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon :icon="isDarkMode ? moon : sunny" slot="start"></ion-icon>
            <ion-label>Dark Mode </ion-label>
            <ion-toggle
              :checked="isDarkMode"
              @ionChange="($ev) => handleDarkMode($ev)"
            >
            </ion-toggle>
          </ion-item>

          <ion-item button detail="false" @click="presentLogoutAlert">
            <ion-icon :icon="logOut" slot="start"></ion-icon>
            <ion-label>Abmelden</ion-label>
          </ion-item>
        </div>
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
  IonToggle,
  alertController,
  menuController,
} from '@ionic/vue';
import {
  home,
  bagCheck,
  cart,
  logOut,
  personCircle,
  sunny,
  moon,
} from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

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
    IonToggle,
  },
  methods: {
    // navigate to path and close the menu
    async navigateMenu(path: string) {
      this.$router.push(path);
      menuController.close('app-menu');
    },

    handleDarkMode($ev: CustomEvent) {
      const isChecked = $ev.detail.checked;
      document.body.setAttribute('color-theme', isChecked ? 'dark' : 'light');

      localStorage.darkmode = isChecked;
      this.isDarkMode = isChecked;
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
  mounted() {
    if (localStorage.darkmode === 'true') {
      document.body.setAttribute('color-theme', 'dark');
    }
  },
  setup() {
    const isDarkMode = ref(localStorage.darkmode === 'true');
    return {
      isDarkMode,
      home,
      personCircle,
      cart,
      bagCheck,
      logOut,
      sunny,
      moon,
    };
  },

  props: { title: String, hasBackButton: Boolean },
});
</script>

<style scoped>
.menu-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.active-link * {
  color: var(--ion-color-primary);
}
</style>
