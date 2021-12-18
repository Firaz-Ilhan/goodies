<template>
  <ion-page>
    <Header title="Liefer Details" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <h1>{{ deliverDetails.name }}</h1>

        <ion-badge class="ion-margin-start" color="dark">
          {{ deliverDetails.orderState }}</ion-badge
        >

        <ion-grid>
          <ion-row class="table-header">
            <ion-col size="7">
              <ion-label>Artikel inkl. Menge</ion-label>
            </ion-col>

            <ion-col size="3">
              <ion-label>Anzahl</ion-label>
            </ion-col>
          </ion-row>

          <ion-row v-for="detail in deliverDetails.list" :key="detail.article">
            <ion-col size="7">
              <ion-label> {{ detail.article }} </ion-label>
            </ion-col>

            <ion-col size="3">
              <ion-label> {{ detail.amount }} </ion-label>
            </ion-col>
          </ion-row>
        </ion-grid>

        <div>
          <h2>Standort</h2>
          <Map
            :markerPosition="markerPosition"
            :centerPosition="centerPosition"
          ></Map>
        </div>
        <ion-button class="btn-center" @click="setOrderState('angenommen')">
          Annehmen</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonLabel,
  IonPage,
  IonRow,
  IonCol,
  IonGrid,
  IonBadge,
  IonButton,
} from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import firebase from 'firebase';
import Header from '../components/Header.vue';
import Map from '../components/Map.vue';
import { db } from '../main';
import { useGeolocation } from '../composables/useGeolocation';
import { ILocation } from '../interfaces/ILocation';
import { IOrder } from '../interfaces/IOrder';
import { useOrder } from '../composables/useOrder';

export default defineComponent({
  name: 'DeliverDetails',
  components: {
    Header,
    IonPage,
    IonContent,
    IonLabel,
    IonCol,
    IonRow,
    IonGrid,
    IonBadge,
    Map,
    IonButton,
  },
  async created() {
    useGeolocation().getMockedLocation(this.setMapPosition);
  },

  methods: {
    getOrderDetail() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection('orders')
            .doc(this.$route.params.id as string)
            .onSnapshot((doc: firebase.firestore.DocumentData) => {
              this.deliverDetails = {
                ...(doc.data() as IOrder),
                id: doc.id,
              };
            });
        }
      });
    },

    setOrderState(state: string) {
      firebase.auth().onAuthStateChanged((user) => {
        db.collection('orders')
          .doc(this.$route.params.id as string)
          .set({ orderState: state });
      });
    },

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
    const deliverDetails = {} as IOrder;
    this.getOrderDetail();

    return {
      deliverDetails,
      useGeolocation,
      useOrder,
      markerPosition: {} as ILocation,
      centerPosition: {} as ILocation,
      updateCounter: 0,
    };
  },
});
</script>

<style scoped lang="scss"></style>
