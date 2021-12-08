<template>
  <ion-page>
    <Header title="Meine Bestellungen" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <h2 class="ion-text-center">{{ ordersDetails.name }}</h2>
        <div id="status">
          <p>Bestellstatus: {{ ordersDetails.orderState }}</p>
          <p>Übernommen durch:</p>
        </div>
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
import { db } from '../main';

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
  },

  methods: {
    getOrderDetail() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection('test')
            .where('createdBy', '==', user.uid)
            .onSnapshot((docData: firebase.firestore.DocumentData) => {
              const changes = docData.docChanges();
              changes.forEach((change: firebase.firestore.DocumentChange) => {
                if (
                  change.type === 'added' &&
                  change.doc.id == this.$route.params.id
                ) {
                  this.ordersDetails = change.doc.data();
                }
              });
            });
        }
      });
    },
  },

  data() {
    const ordersDetails = {};
    this.getOrderDetail();
    return {
      ordersDetails,
    };
  },
});
</script>

<style>
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
