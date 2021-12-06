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
      <Map :mapPosition="mapPosition"></Map>
      <ion-button @click="useGeolocation().startWatch()"
        >start watch</ion-button
      >
      <br />
      <ion-button @click="useGeolocation().stopWatch()">stop watch</ion-button>
      <br />
      <ion-button @click="movePosition">Change Position</ion-button>
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
import { useGeolocation } from '../composables/useGeolocation';

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
  async created() {
    this.mapPosition = await useGeolocation().getCurrentCoordinates();
  },

  methods: {
    movePosition() {
      this.mapPosition = {
        lat: 47,
        lng: 47,
      };
    },
  },
  data() {
    const mapPosition = {
      lat: 22,
      lng: 22,
    };
    return {
      useGeolocation,
      mapPosition,
    };
  },
});
</script>
