<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>

        <ion-title>New Item</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <Map></Map>
      <ion-button @click="useGeolocation().startWatch()"
        >start watch</ion-button
      >
      <br />
      <ion-button @click="useGeolocation().stopWatch()">stop watch</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import Map from '../components/Map.vue';
import { useGeolocation } from '../services/useGeolocation';

export default defineComponent({
  name: 'Example',
  components: {
    IonBackButton,
    IonButtons,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    Map,
  },
  setup() {
    return {
      useGeolocation,
    };
  },
});
</script>
