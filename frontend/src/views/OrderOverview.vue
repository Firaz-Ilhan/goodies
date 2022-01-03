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
        <OrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
          :showDistance="order.orderState === 'in Lieferung'"
          @click="$router.push('/orders/' + order.id)"
        />

        <EmptyState
          v-if="!orders.length"
          message="Derzeit hast du keine aktiven Bestellungen."
        ></EmptyState>
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
import { reactive, toRefs } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import { add } from 'ionicons/icons';

import type { IOrder } from '../interfaces/IOrder';
import { useOrder } from '../composables/useOrder';
import Header from '../components/Header.vue';
import CreateOrderModal from '../components/CreateOrderModal.vue';
import OrderCard from '../components/OrderCard.vue';
import EmptyState from '../components/EmptyState.vue';

export default defineComponent({
  name: 'OrderOverview',
  components: {
    Header,
    IonFab,
    IonFabButton,
    IonIcon,
    OrderCard,
    EmptyState,
  },

  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: CreateOrderModal,
      });
      return modal.present();
    },
  },

  setup() {
    const state = reactive({
      orders: new Array<IOrder>(),
    });
    useOrder().populateOrders(state.orders);

    return {
      ...toRefs(state),
      add,
    };
  },
});
</script>

<style scoped>
.wrapper {
  margin: 30px 0;
}
</style>
