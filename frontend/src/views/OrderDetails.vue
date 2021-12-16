<template>
  <ion-page>
    <Header title="Meine Bestellungen" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <h1>{{ orderDetails.name }}</h1>
        <p v-if="orderDetails.orderState !== 'offen'">
          Übernommen durch: {{ orderDetails.supplier }}
        </p>

        <ion-badge v-if="orderDetails.list" color="dark">
          {{ useOrder().calculateTotalArticleAmount(orderDetails.list) }}
          Artikel
        </ion-badge>
        <ion-badge
          class="ion-margin-start"
          :color="useOrder().getOrderStateColor(orderDetails.orderState)"
        >
          {{ orderDetails.orderState }}</ion-badge
        >

        <!-- TODO outsource component -->
        <h2 class="list-heading" @click="toggleList" ref="listHeading">
          Einkaufsliste
          <ion-icon
            class="ion-margin-start"
            :icon="chevronUpOutline"
          ></ion-icon>
        </h2>
        <ion-grid v-if="listOpen">
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
          @click="useOrder().setOrderState($route.params.id as string ,'abgeschlossen')"
          v-if="orderDetails.orderState === 'in Lieferung'"
        >
          Waren erhalten
        </ion-button>
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
  IonIcon,
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
import { chevronUpOutline } from 'ionicons/icons';

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
    IonIcon,
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

    setMapPosition(position: ILocation) {
      this.markerPosition = position;
      // synchronize center and marker position after 10 updates
      if (this.updateCounter % 10 === 0) {
        this.centerPosition = this.markerPosition;
      }
      this.updateCounter++;
    },

    toggleList() {
      this.listOpen = !this.listOpen;
      (this.$refs.listHeading as HTMLElement).classList.toggle('open');
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
      chevronUpOutline,
      listOpen: true,
    };
  },
});
</script>

<style scoped lang="scss">
.btn-center {
  margin: 30px auto;
}

.list-heading {
  display: flex;
  align-items: center;
  margin: 30px 0 0;
}

.open {
  ion-icon {
    transform: rotate(180deg);
  }
}

ion-icon {
  transition: transform 0.3s ease;
}

.table-header {
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 14px;
}

p {
  margin: 16px 0;
  text-align: start;
}
</style>
