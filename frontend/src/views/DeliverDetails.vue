<template>
  <ion-page>
    <Header title="Liefer Details" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <h1>{{ deliverDetails.name }}</h1>
        <div v-if="deliverDetails.orderState !== 'offen' && creator.street">
          <p>
            Erstellt von <strong>{{ getCreatorName }}</strong>
          </p>
          <p>
            Adresse:
            <br />
            {{
              creator.street + ', ' + creator.city + ' ' + creator.postalcode
            }}
          </p>
          <p>
            Mobilnummer:
            <a :href="'tel:' + creator.telephone">{{ creator.telephone }}</a>
          </p>
        </div>

        <ion-badge v-if="deliverDetails.list" color="dark">
          {{ useOrder().calculateTotalArticleAmount(deliverDetails.list) }}
          Artikel
        </ion-badge>
        <ion-badge
          class="ion-margin-start"
          :color="useOrder().getOrderStateColor(deliverDetails.orderState)"
        >
          {{ deliverDetails.orderState }}</ion-badge
        >

        <ShoppingListDetails
          :list="deliverDetails.list"
          :isCheckable="
            deliverDetails.orderState === 'abgeschlossen' ? false : true
          "
        ></ShoppingListDetails>

        <div v-if="creator.geocoords">
          <h2>Standort</h2>
          <a
            :href="`https://www.google.com/maps/place/${creator.street},+${creator.city}+${creator.postalcode}/@${creator.geocoords.lat},${creator.geocoords.lng}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ion-icon :icon="locationOutline"></ion-icon>
            In Google Maps öffnen</a
          >
          <Map
            :markerPosition="getCreatorLocation"
            :centerPosition="getCreatorLocation"
          ></Map>
        </div>

        <h2>Rewards</h2>
        <p v-if="deliverDetails.list">
          Anzahl der Artikel*Distanz = <strong> {{ getRewardsValue }}</strong>
        </p>

        <ion-button
          v-if="deliverDetails.orderState == 'offen'"
          class="btn-center"
          @click="useOrder().setOrderState($route.params.id as string ,'angenommen'); useOrder().setSupplier($route.params.id as string)"
        >
          ANNEHMEN</ion-button
        >
        <ion-button
          v-if="deliverDetails.orderState == 'angenommen'"
          class="btn-center"
          @click="useOrder().setOrderState($route.params.id as string ,'in Lieferung')"
        >
          HAB ALLES BIN LOS</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonBadge, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import firebase from 'firebase';
import Header from '../components/Header.vue';
import Map from '../components/Map.vue';
import ShoppingListDetails from '../components/ShoppingListDetails.vue';
import { db } from '../main';
import { useGeolocation } from '../composables/useGeolocation';
import { ILocation } from '../interfaces/ILocation';
import { IOrder } from '../interfaces/IOrder';
import { useOrder } from '../composables/useOrder';
import { IProfile } from '../interfaces/IProfile';
import { locationOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'DeliverDetails',
  components: {
    Header,
    IonPage,
    IonContent,
    IonBadge,
    Map,
    IonButton,
    ShoppingListDetails,
    IonIcon,
  },
  methods: {
    getOrderInDetail() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection('orders')
            .doc(this.$route.params.id as string)
            .onSnapshot((doc: firebase.firestore.DocumentData) => {
              this.deliverDetails = {
                ...(doc.data() as IOrder),
                id: doc.id,
              };
              console.log(this.deliverDetails);
            });
        }
      });
    },

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
    const deliverDetails = {} as IOrder;
    this.getOrderInDetail();

    return {
      deliverDetails,
      creator: {} as IProfile,
      markerPosition: {} as ILocation,
      centerPosition: {} as ILocation,
      updateCounter: 0,
      useGeolocation,
      useOrder,
      locationOutline,
    };
  },

  created() {
    // get mocked location data
    useGeolocation().getMockedLocation(this.setMapPosition);

    // fetch and populate order details and supplier data
    useOrder().getOrderDetails(
      this.$route.params.id as string,
      (deliverDetails: IOrder) => (this.deliverDetails = deliverDetails),
      (profileDetails: IProfile) => (this.creator = profileDetails),
    );
  },

  computed: {
    getCreatorName(): string {
      const { firstname, lastname } = this.creator;
      return firstname + ' ' + lastname;
    },
    getCreatorLocation(): ILocation {
      const { lat, lng } = this.creator.geocoords;
      return { lat, lng };
    },
    getRewardsValue(): number {
      const articleAmount = useOrder().calculateTotalArticleAmount(
        this.deliverDetails.list,
      );
      const ditanceInKm = 1;
      return (articleAmount * ditanceInKm) / 10;
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

a {
  display: flex;
  align-content: center;
  margin-bottom: 30px;
  ion-icon {
    margin-right: 8px;
  }
}
</style>
