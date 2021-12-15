<template>
  <ion-page>
    <Header title="Meine Bestellungen" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <h1>{{ orderDetails.name }}</h1>
        <ion-badge v-if="orderDetails.list" color="dark">
          {{ useOrder().calculateTotalArticleAmount(orderDetails.list) }}
          Artikel
        </ion-badge>
        <ion-badge class="ion-margin-start" color="success">
          {{ orderDetails.orderState }}</ion-badge
        >

        <p v-if="orderDetails.orderState === 'angenommen'">
          Übernommen durch: {{ orderDetails.supplier }}
        </p>

        <ion-grid>
          <ion-row class="table-header">
            <ion-col size="7">
              <ion-label>Artikel inkl. Menge</ion-label>
            </ion-col>

            <ion-col size="3">
              <ion-label>Anzahl</ion-label>
            </ion-col>

            <ion-col size="2">
              <ion-label>Status</ion-label>
            </ion-col>
          </ion-row>

          <ion-row v-for="detail in orderDetails.list" :key="detail.article">
            <ion-col size="7">
              <ion-label> {{ detail.article }} </ion-label>
            </ion-col>

            <ion-col size="3">
              <ion-label> {{ detail.amount }} </ion-label>
            </ion-col>

            <ion-col size="2">
              <ion-checkbox
                v-if="detail.isChecked"
                checked="true"
                disabled="true"
              ></ion-checkbox>
              <ion-checkbox
                v-else
                checked="false"
                disabled="true"
              ></ion-checkbox>
            </ion-col>
          </ion-row>
        </ion-grid>

        <div v-if="orderDetails.orderState === 'in Lieferung'">
          <h2>Standort deines Lieferanten</h2>
          <Map
            :markerPosition="markerPosition"
            :centerPosition="centerPosition"
          ></Map>
        </div>
        <ion-button
          class="btn-center"
          @click="setOrderState('abgeschlossen')"
          v-if="orderDetails.orderState === 'in Lieferung'"
        >
          Waren erhalten</ion-button
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
  IonCheckbox,
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
  name: 'OrderDetails',
  components: {
    Header,
    IonPage,
    IonContent,
    IonLabel,
    IonCol,
    IonRow,
    IonGrid,
    IonCheckbox,
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
              this.orderDetails = {
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
    const orderDetails = {} as IOrder;
    this.getOrderDetail();

    return {
      orderDetails,
      useGeolocation,
      useOrder,
      markerPosition: {} as ILocation,
      centerPosition: {} as ILocation,
      updateCounter: 0,
    };
  },
});
</script>

<style scoped lang="scss">
h2 {
  font-size: 18px;
}
.table-header {
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 14px;
}
</style>
