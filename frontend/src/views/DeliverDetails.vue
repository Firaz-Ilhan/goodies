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

            <ion-col size="2" v-if="deliverDetails.orderState == 'angenommen'">
              <ion-label>Status</ion-label>
            </ion-col>
          </ion-row>

          <ion-row v-for="detail in deliverDetails.list" :key="detail.article">
            <ion-col size="7">
              <ion-label> {{ detail.article }} </ion-label>
            </ion-col>

            <ion-col size="3">
              <ion-label> {{ detail.amount }} </ion-label>
            </ion-col>

            <ion-col size="2" v-if="deliverDetails.orderState == 'angenommen'">
              <ion-checkbox> </ion-checkbox>
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
        <ion-button
          v-if="deliverDetails.orderState == 'offen'"
          class="btn-center"
          @click="useOrder().setOrderState($route.params.id as string ,'angenommen'); useOrder().setSupplier($route.params.id as string)"
        >
          ANNEHMEN</ion-button
        >
        <ion-button
          v-if="deliverDetails.orderState == 'angenommen'"
          class="btn-center"
          @click="useOrder().setOrderState($route.params.id as string ,'in Lieferung')"
        >
          HAB ALLES BIN LOS</ion-button
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
  IonCheckbox,
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
    IonCheckbox,
  },
  async created() {
    useGeolocation().getMockedLocation(this.setMapPosition);
  },

  methods: {
    getOrderInDetail() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection('orders')
            .doc(this.$route.params.id as string)
            .onSnapshot((doc: firebase.firestore.DocumentData) => {
              this.deliverDetails = {
                ...(doc.data() as IOrder),
                id: doc.id,
              };
              console.log(this.deliverDetails);
            });
        }
      });
    },

    /*deleteorder() {
      db.collection('orders')
        .doc('Mm1wSrlGN7DdKTqMlUKD')
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        });
    },*/

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
    this.getOrderInDetail();
    //this.deleteorder();

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
