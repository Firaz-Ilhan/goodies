<template>
  <ion-page>
    <Header title="Lieferansicht" :hasBackButton="true">
      <ion-segment
        @ionChange="($event: CustomEvent) => {activeSegment = $event.detail.value}"
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
            v-for="order in openOrders"
            :key="order.id"
            :order="order"
            :showDistance="true"
            @click="$router.push('/deliveries/' + order.id)"
          />
          <EmptyState
            v-if="openOrders.length <= 0"
            message="Aktuell keine offenen Bestellungen."
          ></EmptyState>
        </div>

        <div v-if="activeSegment === 'angenommen'">
          <OrderCard
            v-for="order in acceptedOrders"
            :key="order.id"
            :order="order"
            :showDistance="true"
            @click="$router.push('/deliveries/' + order.id)"
          />
          <EmptyState
            v-if="acceptedOrders.length <= 0"
            message="Aktuell keine angenommenen Bestellungen."
          ></EmptyState>
        </div>

        <div v-if="activeSegment === 'abgeschlossen'">
          <OrderCard
            v-for="order in completedOrders"
            :key="order.id"
            :order="order"
            :showDistance="true"
            @click="$router.push('/deliveries/' + order.id)"
          />
          <EmptyState
            v-if="completedOrders.length <= 0"
            message="Aktuell keine erledigten Bestellungen."
          ></EmptyState>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonSegment, IonSegmentButton } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import firebase from 'firebase/app';
import { auth } from '@/main';
import Header from '../components/Header.vue';
import OrderCard from '../components/OrderCard.vue';
import EmptyState from '../components/EmptyState.vue';
import { useOrder } from '../composables/useOrder';
import type { IOrder } from '../interfaces/IOrder';

export default defineComponent({
  name: 'DeliverOverview',
  components: {
    Header,
    OrderCard,
    IonSegment,
    IonSegmentButton,
    EmptyState,
  },

  data() {
    return {
      user: {} as firebase.User,
      orders: new Array<IOrder>(),
      activeSegment: 'offen' as Omit<IOrder['orderState'], 'in Lieferung'>,
      useOrder,
    };
  },

  created() {
    this.user = auth.currentUser!;
    useOrder().populateOrders(this.orders, false);
  },

  computed: {
    // get all open orders
    openOrders(): IOrder[] {
      return this.orders.filter(
        (order: IOrder) => order.orderState === 'offen',
      );
    },
    // get all currently active orders where the user is the supplier
    acceptedOrders(): IOrder[] {
      return this.orders.filter(
        (order: IOrder) =>
          ['angenommen', 'in Lieferung'].includes(order.orderState) &&
          order.supplier === this.user.uid,
      );
    },
    // get all completed orders where the user was the supplier
    completedOrders(): IOrder[] {
      return this.orders.filter(
        (order: IOrder) =>
          order.orderState === 'abgeschlossen' &&
          order.supplier === this.user.uid,
      );
    },
  },
});
</script>

<style scoped>
ion-segment-button {
  height: 40px;
}

.ios ion-segment-button {
  color: var(--ion-color-dark);
  height: 28px;
}
</style>
