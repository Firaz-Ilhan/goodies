<template>
  <ion-page>
    <Header title="Meine Bestellungen" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <OrderDetailsProfileInfo
          class="ion-margin-top"
          :order="orderDetails"
          :profile="supplier"
          profileRole="supplier"
        ></OrderDetailsProfileInfo>

        <OrderBadges :order="orderDetails"></OrderBadges>

        <ShoppingListDetails :list="orderDetails.list"></ShoppingListDetails>

        <div v-if="orderDetails.orderState === 'in Lieferung'">
          <h2>Standort deines Lieferanten{{ isDevEnv ? '*' : '' }}</h2>
          <Map
            v-if="isDevEnv"
            :markerPosition="markerPosition"
            :centerPosition="centerPosition"
          ></Map>
          <Map
            v-else-if="getSupplierCoordinates"
            :markerPosition="getSupplierCoordinates"
            :centerPosition="getSupplierCoordinates"
          ></Map>
          <p style="font-size: 12px">
            {{ isDevEnv ? '*Simulierte Daten für Development' : '' }}
          </p>
        </div>

        <ion-button
          class="btn-center"
          @click="useOrder().setOrderState($route.params.id as string ,'abgeschlossen')"
          routerLink="/deliveryconfirmation"
          v-if="orderDetails.orderState === 'in Lieferung'"
        >
          Waren erhalten
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { IonContent, IonButton } from '@ionic/vue';
import Header from '../components/Header.vue';
import OrderBadges from '../components/OrderBadges.vue';
import ShoppingListDetails from '../components/ShoppingListDetails.vue';
import OrderDetailsProfileInfo from '@/components/OrderDetailsProfileInfo.vue';
import Map from '../components/Map.vue';
import { useOrder } from '../composables/useOrder';
import { useGeolocation } from '../composables/useGeolocation';
import { useProfile } from '../composables/useProfile';
import type { ILocation } from '../interfaces/ILocation';
import type { IOrder } from '../interfaces/IOrder';
import type { IProfile } from '../interfaces/IProfile';

export default defineComponent({
  name: 'OrderDetails',
  components: {
    IonContent,
    IonButton,
    Header,
    OrderBadges,
    OrderDetailsProfileInfo,
    ShoppingListDetails,
    Map,
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
    return {
      isDevEnv: ['localhost', '127.0.0.1', ''].includes(
        window.location.hostname,
      ),
      orderDetails: {} as IOrder,
      supplier: {} as IProfile,
      markerPosition: {} as ILocation,
      centerPosition: {} as ILocation,
      updateCounter: 0,
      useGeolocation,
      useOrder,
    };
  },

  created() {
    // fetch and populate order details and supplier data
    useOrder().getOrderDetails(
      this.$route.params.id as string,
      (orderDetails: IOrder) => {
        this.orderDetails = orderDetails;

        if (orderDetails.orderState === 'in Lieferung') {
          // in dev get static mocked supplier location
          if (this.isDevEnv) {
            // get mocked location data
            useGeolocation().getMockedLocation(this.setMapPosition);
          } else {
            // in prod set watcher for live last position
            useProfile().watchProfileChanges(
              orderDetails.supplier as string,
              (profileData: IProfile) => (this.supplier = profileData),
            );
          }
        }
      },
      (profileDetails: IProfile) => (this.supplier = profileDetails),
    );
  },

  computed: {
    getSupplierCoordinates(): ILocation | null {
      if (this.supplier.lastPosition) {
        const { lat, lng } = this.supplier.lastPosition;
        return { lat, lng };
      }
      return null;
    },
  },
});
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 12px;
}
.btn-center {
  margin: 30px auto;
}

p {
  margin: 16px 0;
  text-align: start;
}
</style>
