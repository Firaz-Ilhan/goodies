<template>
  <ion-page>
    <Header title="Bestellen" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <p>
          Um Artikel zu bestellen, benötigen die Einkäufer/innen Deine
          Einkausliste.
        </p>
        <p>
          Du kannst eine gespeicherte Einkaufsliste wieder verwenden, oder eine
          neue anlegen:
        </p>

        <h1>Deine Bestellungen</h1>
        <p v-if="!orders.length">
          Zur Zeit hast du keine aktiven Bestellungen.
        </p>
        <!-- TODO outsource list item component -->
        <ion-card
          v-for="order in orders"
          :key="order.id"
          @click="$router.push('/orders/' + order.id)"
          button
        >
          <ion-card-content>
            <div>{{ order.name }}</div>
            <div>Creator: {{ order.createdBy }}</div>
            <div>Timestamp: {{ order.createdAt }}</div>
            <ion-badge color="dark">
              {{
                useOrder().calculateTotalArticleAmount(order.list)
              }}
              Artikel</ion-badge
            >
            <ion-badge class="ion-margin-start" color="success">
              {{ order.orderState }}</ion-badge
            >
          </ion-card-content>
        </ion-card>
      </div>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonFab,
  IonFabButton,
  modalController,
  IonIcon,
  IonCard,
  IonCardContent,
  IonBadge,
} from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import Header from '../components/Header.vue';
import CreateOrderModal from '../components/CreateOrderModal.vue';
import { add } from 'ionicons/icons';
import firebase from 'firebase';
import { db } from '../main';
import { IOrder } from '../interfaces/IOrder';
import { useOrder } from '@/composables/useOrder';

export default defineComponent({
  name: 'OrderOverview',
  components: {
    Header,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonBadge,
  },

  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: CreateOrderModal,
        componentProps: {
          title: 'Liste anlegen',
        },
      });
      return modal.present();
    },

    populateOrders() {
      const user = firebase.auth().currentUser!;
      db.collection('orders')
        .where('createdBy', '==', user.uid)
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
    this.populateOrders();

    return {
      add,
      orders,
      useOrder,
    };
  },
});
</script>

<style scoped>
.order-container {
  margin: 30px;
}
</style>
