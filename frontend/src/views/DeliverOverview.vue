<template>
  <ion-page>
    <Header title="Lieferansicht" :hasBackButton="true"/>
    <ion-content>
      <div class="wrapper">
        <ion-toolbar>
          <ion-segment value="all">
            <ion-segment-button value="offen">Offen</ion-segment-button>
            <ion-segment-button value="angenommen">Angenommen</ion-segment-button>
            <ion-segment-button value="erledigt">Erledgit</ion-segment-button>
          </ion-segment>
        </ion-toolbar>
        <h1>Listen</h1>
          <ion-card 
            v-for="order in orders"
            :key="order.id">
            <ion-card-content>
              <div>{{ order.name }}</div>
              <div> 
                <ion-badge color="dark">
                {{
                  useOrder().calculateTotalArticleAmount(order.list)
                }}
                Artikel</ion-badge>
                </div>
              <div>Timestamp: {{ order.createdAt }}</div>
            </ion-card-content>
          </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonToolbar,
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
  components: {
    Header,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonBadge,
    IonCard,
    IonCardContent,
    
  },
  methods: {
    getAllOrders() {
      db.collection('orders')
        .onSnapshot((docData: firebase.firestore.DocumentData) => {
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
        });
    },
  },

  data() {
    const orders = new Array<IOrder>();
    this.getAllOrders();

    return {
      orders,
      useOrder
    };
  },
});


</script>

<style scoped>

</style>