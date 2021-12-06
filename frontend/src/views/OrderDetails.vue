<template>
  <ion-page>
    <ion-content>
      <Header title="Meine Bestellungen" :hasBackButton="true" />
      <h2>{{ ordersDetails.name }}</h2>
      <p>Status: {{ ordersDetails.orderState }}</p>
      <p>Übernommen durch:</p>
      <ion-list>
        <ion-item v-for="detail in ordersDetails.list" :key="detail.article">
          <ion-icon v-if="detail.isChecked" :icon="checkmarkCircle"></ion-icon>
          <ion-icon v-else :icon="bicycle"></ion-icon>
          <ion-label>{{ detail.article }} {{ detail.amount }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import firebase from 'firebase';
import { checkmarkCircle, bicycle } from 'ionicons/icons';
import Header from '../components/Header.vue';
import { db } from '../main';

export default defineComponent({
  name: 'OrderDetails',
  components: {
    Header,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
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
      checkmarkCircle,
      bicycle,
    };
  },
});
</script>

<style></style>
