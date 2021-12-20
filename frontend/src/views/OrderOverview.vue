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
        <OrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
          @click="$router.push('/orders/' + order.id)"
        />
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
import { IonFab, IonFabButton, modalController, IonIcon } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { add } from 'ionicons/icons';
import firebase from 'firebase';
import { db } from '../main';

import type { IOrder } from '../interfaces/IOrder';
import { useOrder } from '../composables/useOrder';
import Header from '../components/Header.vue';
import CreateOrderModal from '../components/CreateOrderModal.vue';
import OrderCard from '../components/OrderCard.vue';

export default defineComponent({
  name: 'OrderOverview',
  components: {
    Header,
    IonFab,
    IonFabButton,
    IonIcon,
    OrderCard,
  },

  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: CreateOrderModal,
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
            } else if (change.type === 'modified') {
              const index = this.orders.findIndex(
                (order: IOrder) => order.id === change.doc.id,
              );
              this.orders[index] = {
                ...(change.doc.data() as IOrder),
                id: change.doc.id,
              };
            } else {
              // remove deleted document from orders
              this.orders = this.orders.filter(
                (order: IOrder) => order.id !== change.doc.id,
              );
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
.wrapper {
  margin: 30px 0;
}
</style>
