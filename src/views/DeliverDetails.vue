<template>
  <ion-page>
    <Header title="Liefer Details" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <OrderDetailsProfileInfo
          :profile="creator"
          :order="deliverDetails"
          profileRole="creator"
        ></OrderDetailsProfileInfo>

        <OrderBadges :order="deliverDetails" :distance="distance"></OrderBadges>

        <ShoppingListDetails
          :list="deliverDetails.list"
          :isCheckable="
            deliverDetails.orderState !== 'abgeschlossen' &&
            deliverDetails.orderState !== 'offen'
          "
        ></ShoppingListDetails>

        <div v-if="creator.geocoords" class="ion-margin-bottom">
          <h2>Standort</h2>
          <p>
            Ungefähr
            <strong>{{ useOrder().formatDistance(distance) }}</strong>
            von deinem Wohnort entfernt.
          </p>
          <a
            :href="`https://www.google.com/maps/place/${creator.street},+${creator.city}+${creator.postalcode}/@${creator.geocoords.lat},${creator.geocoords.lng}`"
            target="_blank"
            rel="noopener noreferrer"
            button
          >
            <ion-icon :icon="locationOutline"></ion-icon>
            In Google Maps öffnen</a
          >

          <Map
            :markerPosition="getCreatorLocation"
            :centerPosition="getCreatorLocation"
          ></Map>
        </div>

        <OrderDetailsRewards
          v-if="deliverDetails.list && distance > 0"
          :order="deliverDetails"
          :distance="distance"
        ></OrderDetailsRewards>

        <ion-button
          v-if="deliverDetails.orderState == 'offen'"
          class="btn-center"
          @click="useOrder().setOrderState($route.params.id as string ,'angenommen'); useOrder().setSupplier($route.params.id as string)"
        >
          Annehmen</ion-button
        >

        <ion-button
          v-if="deliverDetails.orderState == 'angenommen'"
          class="btn-center"
          @click="presentAlert()"
        >
          Hab alles bin los
        </ion-button>

        <ion-button
          v-if="deliverDetails.orderState == 'abgeschlossen'"
          class="btn-center"
          @click="stopWatch()"
        >
          Standort Tracking beenden</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { IonContent, IonButton, IonIcon, alertController } from '@ionic/vue';
import { locationOutline } from 'ionicons/icons';
import OrderDetailsProfileInfo from '../components/OrderDetailsProfileInfo.vue';
import Header from '../components/Header.vue';
import OrderBadges from '../components/OrderBadges.vue';
import Map from '../components/Map.vue';
import ShoppingListDetails from '../components/ShoppingListDetails.vue';
import OrderDetailsRewards from '../components/OrderDetailsRewards.vue';
import type { ILocation } from '../interfaces/ILocation';
import type { IOrder } from '../interfaces/IOrder';
import type { IProfile } from '../interfaces/IProfile';
import { useOrder } from '../composables/useOrder';
import { useGeolocation } from '../composables/useGeolocation';

export default defineComponent({
  name: 'DeliverDetails',
  components: {
    Header,
    IonContent,
    IonIcon,
    Map,
    IonButton,
    ShoppingListDetails,
    OrderDetailsRewards,
    OrderBadges,
    OrderDetailsProfileInfo,
  },

  methods: {
    async presentAlert() {
      const alert = await alertController.create({
        header: 'Live Tracking starten?',
        message:
          'Mit deiner Bestätigung wird der Standort deines Gerätes dem Besteller live angezeigt. Sobald diese abgeschlossen ist kannst du das Live Tracking über die Bestelldetails wieder beenden.',
        buttons: [
          {
            text: 'Abbrechen',
            role: 'cancel',
          },
          {
            text: 'Starten',
            handler: () => {
              this.startWatch();
              useOrder().setOrderState(
                this.$route.params.id as string,
                'in Lieferung',
              );
            },
          },
        ],
      });
      return alert.present();
    },
  },

  data() {
    const deliverDetails = {} as IOrder;
    const { startWatch, stopWatch } = useGeolocation();

    return {
      deliverDetails,
      creator: {} as IProfile,
      supplier: {} as IProfile,
      distance: 0,
      markerPosition: {} as ILocation,
      centerPosition: {} as ILocation,
      updateCounter: 0,
      useOrder,
      locationOutline,
      startWatch,
      stopWatch,
    };
  },

  created() {
    // fetch and populate order details and supplier data
    useOrder().getOrderDetails(
      this.$route.params.id as string,
      (deliverDetails: IOrder) => {
        useOrder()
          .getOrderDistance(deliverDetails)
          .then((distanceInKm) => {
            this.distance = distanceInKm;
          });
        this.deliverDetails = deliverDetails;
      },
      (profileDetails: IProfile) => (this.creator = profileDetails),
    );
  },

  computed: {
    getCreatorLocation(): ILocation {
      const { lat, lng } = this.creator.geocoords;
      return { lat, lng };
    },
  },
});
</script>

<style scoped lang="scss">
.btn-center {
  margin: 40px auto;
}

h1 {
  margin-bottom: 12px;
}

h2 {
  margin-top: 30px;
}

p {
  text-align: start;
}

.reward {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #c8c8c8;
  padding: 16px;

  span {
    font-size: 24px;
    margin-left: 50px;
    color: var(--ion-color-primary);
    font-weight: 700;
  }
}

a {
  display: flex;
  align-content: center;
  margin-bottom: 30px;
  ion-icon {
    margin-top: 2px;
    margin-right: 8px;
  }
}
</style>
