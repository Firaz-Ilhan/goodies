<template>
  <ion-page>
    <Header title="Meine Bestellungen" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <h1>{{ orderDetails.name }}</h1>
        <div v-if="orderDetails.orderState !== 'offen'">
          <p>
            Angenommen von <strong>{{ getSupplierName }}</strong>
          </p>
          <p>
            Mobilnummer:
            <a :href="'tel:' + supplier.telephone">{{ supplier.telephone }}</a>
          </p>
        </div>

        <ion-badge v-if="orderDetails.list" color="dark">
          {{ useOrder().calculateTotalArticleAmount(orderDetails.list) }}
          Artikel
        </ion-badge>
        <ion-badge
          class="ion-margin-start"
          :color="useOrder().getOrderStateColor(orderDetails.orderState)"
        >
          {{ orderDetails.orderState }}</ion-badge
        >

        <ShoppingListDetails :list="orderDetails.list"></ShoppingListDetails>

        <div v-if="orderDetails.orderState === 'in Lieferung'">
          <h2>Standort deines Lieferanten</h2>
          <Map
            :markerPosition="markerPosition"
            :centerPosition="centerPosition"
          ></Map>
        </div>

        <ion-button
          class="btn-center"
          @click="useOrder().setOrderState($route.params.id as string ,'abgeschlossen')"
          v-if="orderDetails.orderState === 'in Lieferung'"
        >
          Waren erhalten
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonBadge, IonButton } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import Header from '../components/Header.vue';
import Map from '../components/Map.vue';
import ShoppingListDetails from '../components/ShoppingListDetails.vue';
import { useOrder } from '../composables/useOrder';
import { useGeolocation } from '../composables/useGeolocation';
import type { ILocation } from '../interfaces/ILocation';
import type { IOrder } from '../interfaces/IOrder';
import type { IProfile } from '../interfaces/IProfile';

export default defineComponent({
  name: 'OrderDetails',
  components: {
    Header,
    IonContent,
    IonBadge,
    Map,
    IonButton,
    ShoppingListDetails,
  },

  methods: {
    // setter for map marker and center
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
    const orderDetails = {} as IOrder;

    return {
      orderDetails,
      supplier: {} as IProfile,
      markerPosition: {} as ILocation,
      centerPosition: {} as ILocation,
      updateCounter: 0,
      useGeolocation,
      useOrder,
    };
  },

  created() {
    // get mocked location data
    useGeolocation().getMockedLocation(this.setMapPosition);

    // fetch and populate order details and supplier data
    useOrder().getOrderDetails(
      this.$route.params.id as string,
      (orderDetails: IOrder) => (this.orderDetails = orderDetails),
      (profileDetails: IProfile) => (this.supplier = profileDetails),
    );
  },

  computed: {
    getSupplierName(): string {
      const { firstname, lastname } = this.supplier;
      return firstname + ' ' + lastname;
    },
  },
});
</script>

<style scoped lang="scss">
.btn-center {
  margin: 30px auto;
}

p {
  margin: 16px 0;
  text-align: start;
}
</style>
