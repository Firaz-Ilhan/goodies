<template>
  <ion-page>
    <Header title="Lieferansicht" :hasBackButton="true">
      <ion-segment>
        <ion-segment-button
          @click="
            isOpen = true;
            isAccepted = false;
            isCompleted = false;
          "
          value="offen"
          >Offen</ion-segment-button
        >
        <ion-segment-button
          @click="
            isOpen = false;
            isAccepted = true;
            isCompleted = false;
          "
          value="angenommen"
          >Angenommen</ion-segment-button
        >
        <ion-segment-button
          @click="
            isOpen = false;
            isAccepted = false;
            isCompleted = true;
          "
          value="erledigt"
          >Erledgit</ion-segment-button
        >
      </ion-segment>
    </Header>
    <ion-content>
      <div class="wrapper">
        <h1>Listen</h1>
        <div v-if="isOpen == true">
          <ion-card v-for="order in orders" :key="order.id">
            <ion-card-content>
              <div>{{ order.name }}</div>
              <div>
                <ion-badge color="dark">
                  {{ useOrder().calculateTotalArticleAmount(order.list) }}
                  Artikel</ion-badge
                >
              </div>
              <div>Timestamp: {{ order.createdAt }}</div>
            </ion-card-content>
          </ion-card>
        </div>
        <div v-if="isAccepted == true">
          <p>"nur angenommene"</p>
        </div>
        <div v-if="isCompleted == true">
          <p>"nur erledigte"</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonSegment,
  IonSegmentButton,
  IonBadge,
  IonCard,
  IonCardContent,
} from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import Header from '../components/Header.vue';
import firebase from 'firebase';
import { db } from '../main';
import { IOrder } from '../interfaces/IOrder';
import { useOrder } from '@/composables/useOrder';

export default defineComponent({
  name: 'DeliverOverview',
  props: {
    open: {
      default: false,
      type: Boolean,
    },
    accepted: {
      default: false,
      type: Boolean,
    },
    completed: {
      default: false,
      type: Boolean,
    },
  },

  components: {
    Header,
    IonSegment,
    IonSegmentButton,
    IonBadge,
    IonCard,
    IonCardContent,
  },
  methods: {
    getAllOrders() {
      db.collection('orders').onSnapshot(
        (docData: firebase.firestore.DocumentData) => {
          const changes = docData.docChanges();
          changes.forEach((change: firebase.firestore.DocumentChange) => {
            if (change.type === 'added') {
              this.orders.push({
                ...(change.doc.data() as IOrder),
                id: change.doc.id,
              });
              // sort by latest
              this.orders.sort((a: IOrder, b: IOrder) => {
                return b.createdAt - a.createdAt;
              });
            }
          });
        },
      );
    },
  },

  data() {
    const orders = new Array<IOrder>();
    this.getAllOrders();

    return {
      orders,
      useOrder,
      isOpen: this.open,
      isAccepted: this.accepted,
      isCompleted: this.isCompleted,
    };
  },
});
</script>

<style scoped></style>
