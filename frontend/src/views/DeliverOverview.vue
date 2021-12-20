<template>
  <ion-page>
    <Header title="Lieferansicht" :hasBackButton="true">
      <ion-segment
        @ionChange="handleSegmentChange($event)"
        :value="activeSegment"
      >
        <ion-segment-button value="offen">Offen</ion-segment-button>
        <ion-segment-button value="angenommen">Angenommen</ion-segment-button>
        <ion-segment-button value="abgeschlossen">Erledigt</ion-segment-button>
      </ion-segment>
    </Header>
    <ion-content>
      <div class="wrapper">
        <h1>Listen</h1>

        <div v-if="activeSegment === 'offen'">
          <OrderCard
            v-for="order in orders.filter(
              (order) => order.orderState === 'offen',
            )"
            :key="order.id"
            :order="order"
            @click="$router.push('/deliver/' + order.id)"
          />
          <p
            v-if="
              orders.filter((order) => order.orderState === 'offen').length <= 0
            "
          >
            Aktuell keine offenen Bestellungen.
          </p>
        </div>

        <div v-if="activeSegment === 'angenommen'">
          <OrderCard
            v-for="order in orders.filter(
              (order) =>
                (order.orderState === 'angenommen' ||
                  order.orderState === 'in Lieferung') &&
                order.supplier === user.uid,
            )"
            :key="order.id"
            :order="order"
            @click="$router.push('/deliver/' + order.id)"
          />
          <p
            v-if="
              orders.filter((order) => order.orderState === 'angenommen')
                .length <= 0
            "
          >
            Aktuell keine angenommenen Bestellungen.
          </p>
        </div>

        <div v-if="activeSegment === 'abgeschlossen'">
          <OrderCard
            v-for="order in orders.filter(
              (order) =>
                order.orderState === 'abgeschlossen' &&
                order.supplier === user.uid,
            )"
            :key="order.id"
            :order="order"
            @click="$router.push('/deliver/' + order.id)"
          />
          <p
            v-if="
              orders.filter((order) => order.orderState === 'abgeschlossen')
                .length <= 0
            "
          >
            Aktuell keine erledigten Bestellungen.
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonSegment, IonSegmentButton } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import Header from '../components/Header.vue';
import OrderCard from '../components/OrderCard.vue';
import firebase from 'firebase';
import { db } from '../main';
import { IOrder } from '../interfaces/IOrder';
import { useOrder } from '../composables/useOrder';
import { useAuth } from '../composables/useAuth';
import { onMounted } from 'vue';
import { useGeolocation } from '../composables/useGeolocation';

export default defineComponent({
  name: 'DeliverOverview',

  components: {
    Header,
    OrderCard,
    IonSegment,
    IonSegmentButton,
  },
  methods: {
    getAllOrders() {
      const user = firebase.auth().currentUser!;
      db.collection('orders')
        .where('createdBy', '!=', user.uid)
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
    handleSegmentChange(event: CustomEvent) {
      this.activeSegment = event.detail.value;
      console.log(event.detail.value);
    },
  },
  async onMounted() {
    const user = await useAuth().getCurrentUser();
    console.log('userMounted', user);
    return { user };
  },

  data() {
    const orders = new Array<IOrder>();
    const activeSegment = 'offen';
    this.getAllOrders();

    return {
      user: null as firebase.User | null,
      orders,
      useOrder,
      activeSegment,
    };
  },
  async created() {
    this.user = await firebase.auth().currentUser!;
  },
});
</script>

<style scoped></style>
