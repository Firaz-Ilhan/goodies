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

        <OrderBadges :order="orderDetails" :distance="distance"></OrderBadges>

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
            {{
              !isDevEnv && !supplier.lastPosition
                ? '*Dein Lieferant hat dem Live Tracking nicht zugestimmt. Du siehst dessen statische Addresse.'
                : ''
            }}
          </p>
        </div>

        <OrderDetailsRewards
          v-if="orderDetails.list && distance > 0"
          :order="orderDetails"
          :distance="distance"
        ></OrderDetailsRewards>

        <ion-toast
          :is-open="isToastActive"
          message="Bestellung wurde gelöscht."
          color="dark"
          position="top"
          :duration="2000"
          @didDismiss="() => (isToastActive = false)"
        >
        </ion-toast>

        <ion-button
          v-if="orderDetails.orderState === 'offen'"
          class="btn-center"
          color="danger"
          fill="outline"
          @click="deleteAlert"
        >
          Bestellung löschen
        </ion-button>

        <ion-button
          v-if="orderDetails.orderState === 'in Lieferung'"
          class="btn-center"
          @click="
            useOrder().setOrderState(orderId, 'abgeschlossen');
            $router.push(`/orders/${orderId}/confirmation`);
          "
        >
          Waren erhalten
        </ion-button>

        <ion-button
          v-if="orderDetails.orderState === 'abgeschlossen'"
          class="btn-center"
          @click="openModal"
        >
          Neue Bestellung aus Vorlage
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import {
  IonContent,
  IonButton,
  modalController,
  alertController,
  IonToast,
  toastController,
} from '@ionic/vue';
import Header from '../components/Header.vue';
import OrderBadges from '../components/OrderBadges.vue';
import ShoppingListDetails from '../components/ShoppingListDetails.vue';
import OrderDetailsProfileInfo from '@/components/OrderDetailsProfileInfo.vue';
import Map from '../components/Map.vue';
import CreateOrderModal from '../components/CreateOrderModal.vue';
import OrderDetailsRewards from '../components/OrderDetailsRewards.vue';
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
    IonToast,
    Header,
    OrderBadges,
    OrderDetailsProfileInfo,
    OrderDetailsRewards,
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

    async openModal() {
      const modal = await modalController.create({
        component: CreateOrderModal,
        componentProps: { order: { ...this.orderDetails } },
      });
      return modal.present();
    },

    // shows an toast when an order was deleted
    async showToast() {
      const toast = await toastController.create({
        message: 'Bestellung gelöscht',
        duration: 2000,
        color: 'success',
        position: 'top',
      });
      return await toast.present();
    },

    async deleteAlert() {
      const alert = await alertController.create({
        header: 'Möchtest du diese Bestellung wirklich löschen?',
        buttons: [
          {
            text: 'Abbrechen',
            role: 'cancel',
          },
          {
            text: 'Löschen',
            handler: () => {
              useOrder()
                .deleteOrder(this.orderId)
                .then(() => this.$router.push('/orders'));
              this.isToastActive = true;
            },
          },
        ],
      });
      return alert.present();
    },
  },

  data() {
    return {
      isDevEnv: ['localhost', '127.0.0.1', ''].includes(
        window.location.hostname,
      ),
      orderId: this.$route.params.id as string,
      orderDetails: {} as IOrder,
      supplier: {} as IProfile,
      distance: 0,
      markerPosition: {} as ILocation,
      centerPosition: {} as ILocation,
      updateCounter: 0,
      isToastActive: false,
      useGeolocation,
      useOrder,
    };
  },

  created() {
    // fetch and populate order details and supplier data
    useOrder().getOrderDetails(
      this.orderId,
      (orderDetails: IOrder) => {
        this.orderDetails = orderDetails;

        // get distance between creator and supplier
        if (['angenommen', 'in Lieferung'].includes(orderDetails.orderState)) {
          useOrder()
            .getOrderDistance(orderDetails)
            .then((distanceInKm) => {
              this.distance = distanceInKm;
            });
        }

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
      let position: ILocation;
      if (this.supplier.lastPosition) {
        position = this.supplier.lastPosition;
      } else {
        position = this.supplier.geocoords;
      }
      const { lat, lng } = position;
      return { lat, lng };
    },
  },
});
</script>

<style scoped>
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
