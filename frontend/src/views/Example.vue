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
      <Map
        :markerPosition="markerPosition"
        :centerPosition="centerPosition"
      ></Map>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ILocation } from '@/interfaces/ILocation';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import Map from '../components/Map.vue';
import { useGeolocation } from '../composables/useGeolocation';
import * as geofire from 'geofire-common';

export default defineComponent({
  name: 'Example',
  components: {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    Map,
  },

  async created() {
    useGeolocation().getMockedLocation(this.setMapPosition);
  },

  methods: {
    setMapPosition(position: ILocation) {
      this.markerPosition = position;
      // synchronize center and marker position after 10 updates
      if (this.updateCounter % 10 === 0) {
        this.centerPosition = this.markerPosition;
      }
      this.updateCounter++;
    },
  },
  data() {
    const distanceInKm = geofire.distanceBetween([48.1, 10.2], [46.2, 9.1]);
    console.log(distanceInKm);

    return {
      useGeolocation,
      markerPosition: { lat: 0, lng: 0 },
      centerPosition: { lat: 0, lng: 0 },
      updateCounter: 0,
    };
  },
});
</script>
