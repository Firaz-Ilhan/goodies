<template>
  <ion-page>
    <ion-content>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>Blank</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item>
          <ion-checkbox slot="start"></ion-checkbox>
          <ion-label>
            <h1>Create Idea</h1>
            <ion-note>Run Idea By Brandy</ion-note>
          </ion-label>
          <ion-badge color="danger" slot="end"> 5 Days </ion-badge>
        </ion-item>
      </ion-list>

      <ion-button @click="() => router.push('/onboarding')"
        >Go to Onboarding
      </ion-button>

      <ion-button @click="() => logout()">Logout</ion-button>

      <ion-fab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        @click="() => router.push('/example')"
      >
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonNote,
  IonButton,
  IonIcon,
  IonList,
  IonCheckbox,
  IonLabel,
  IonBadge,
  IonItem,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import firebase from 'firebase';

export default defineComponent({
  name: 'Home',
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonNote,
    IonButton,
    IonIcon,
    IonList,
    IonCheckbox,
    IonLabel,
    IonBadge,
    IonItem,
  },
  setup() {
    const logout = () => {
      firebase
        .auth()
        .signOut()
        .catch((error) => {
          alert(error);
        });
    };
    return {
      router: useRouter(),
      logout,
      add,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
