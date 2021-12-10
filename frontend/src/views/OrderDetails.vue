<template>
  <ion-page>
    <Header title="Meine Bestellungen" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <div class="title-container">
          <h1 class="ion-text-center">{{ ordersDetails.name }}</h1>
          <ion-badge color="success"> {{ ordersDetails.orderState }}</ion-badge>
        </div>
        <p v-if="ordersDetails.orderState === 'angenommen'">
          Übernommen durch: {{ ordersDetails.supplier }}
        </p>

        <ion-grid class="ion-text-center">
          <ion-row class="table-header">
            <ion-col size="5">
              <ion-label>Artikel inkl. Menge</ion-label>
            </ion-col>

            <ion-col size="3">
              <ion-label>Anzahl</ion-label>
            </ion-col>

            <ion-col size="3">
              <ion-label>Status</ion-label>
            </ion-col>
          </ion-row>

          <ion-row v-for="detail in ordersDetails.list" :key="detail.article">
            <ion-col size="5">
              <ion-label> {{ detail.article }} </ion-label>
            </ion-col>

            <ion-col size="3">
              <ion-label> {{ detail.amount }} </ion-label>
            </ion-col>

            <ion-col size="3">
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

        <div v-if="ordersDetails.orderState === 'in Lieferung'">
          <h2>Derzeitge Position deines Lieferanten</h2>
          <Map
            :markerPosition="markerPosition"
            :centerPosition="centerPosition"
          ></Map>
        </div>
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
} from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import firebase from 'firebase';
import Header from '../components/Header.vue';
import Map from '../components/Map.vue';
import { db } from '../main';
import { useGeolocation } from '../composables/useGeolocation';
import { ILocation } from '../interfaces/ILocation';
import { IOrder } from '@/interfaces/IOrder';

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
    Map,
  },

  async created() {
    useGeolocation().getMockedLocation(this.setMapPosition);
  },

  methods: {
    getOrderDetail() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection('orders')
            .where('createdBy', '==', user.uid)
            .onSnapshot((docData: firebase.firestore.DocumentData) => {
              const changes = docData.docChanges();
              changes.forEach((change: firebase.firestore.DocumentChange) => {
                if (
                  change.type === 'added' &&
                  change.doc.id === this.$route.params.id
                ) {
                  this.ordersDetails = {
                    ...(change.doc.data() as IOrder),
                    id: change.doc.id,
                  };
                }
              });
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
  },

  data() {
    const ordersDetails: IOrder = {
      id: '',
      name: '',
      list: [],
      orderState: 'offen',
      createdBy: '',
      createdAt: new Date().getTime(),
    };

    this.getOrderDetail();

    return {
      ordersDetails,
      useGeolocation,
      markerPosition: { lat: 0, lng: 0 },
      centerPosition: { lat: 0, lng: 0 },
      updateCounter: 0,
    };
  },
});
</script>

<style scoped lang="scss">
#status {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#status p {
  padding: 0.25rem;
}

@media (max-width: 800px) {
  #status {
    flex-direction: column;
  }
}

.table-header {
  font-size: 18px;
  padding-bottom: 8px;
}
</style>
