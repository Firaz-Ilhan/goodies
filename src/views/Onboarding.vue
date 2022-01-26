<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>So funktioniert Goodies</ion-title>
        <ion-buttons slot="end">
          <router-link to="/home">
            <ion-button>Skip</ion-button>
          </router-link>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <swiper :pagination="{ clickable: true }">
        <swiper-slide>
          <ion-card>
            <ion-card-content>
              <img src="../assets/images/peopleOnSofa.svg" />
              <h1>Kreiere deine Einkaufsliste</h1>
              <p>
                Mit Goodies kannst du dir Lebensmittel von zuhause aus bestellen
                und liefern lassen. Über den Bestellen Button gibst du hierfür
                deine Einkaufsliste an und beschreibst deine Artikel möglichst
                genau. Auf der Karte siehst du immer wo sich deine Bestellung befindet.
              </p>
              <br>
              <img src="../assets/images/mapAndPerson.svg" />
            </ion-card-content>
          </ion-card>
        </swiper-slide>
        <swiper-slide>
          <ion-card>
            <img src="../assets/images/shopping.svg" />
            <ion-card-content>
              <h1>Deine Hilfe ist gefragt</h1>
              <p>
                Als Lieferant suchst du dir eine passende Bestellung in deiner
                Nähe, stellst sie zusammen und lieferst sie gegen eine Belohnung
                aus. Denke daran den Kassenzettel mitzunehmen.
              </p>
              <img src="../assets/images/driving.svg" />
            </ion-card-content>
          </ion-card>
        </swiper-slide>
        <swiper-slide>
          <ion-card>
            <ion-card-content>
            <img src="../assets/images/packageDelivery.svg" />
              <h1>Jeden Tag eine gute Tat</h1>
              <p>
                Ist deine Bestellung da, überprüfe den Kassenzettel und bezahle
                deinen Lieferanten - fertig! Viel Spaß mit Goodies!
              </p>
              <img src="../assets/images/FinishedDelivery.svg" />
              <ion-button @click="() => $router.push('/home')">
                Return
              </ion-button>
            </ion-card-content>
          </ion-card>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonicSwiper,
  IonTitle,
  IonButton,
  IonToolbar,
  IonHeader,
  IonCard,
  IonCardContent,
  IonButtons,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper-bundle.min.css';
import '@ionic/vue/css/ionic-swiper.css';

SwiperCore.use([IonicSwiper, Pagination]);

export default defineComponent({
  name: 'Onboarding',
  components: {
    IonContent,
    IonPage,
    Swiper,
    SwiperSlide,
    IonTitle,
    IonButton,
    IonToolbar,
    IonHeader,
    IonCard,
    IonCardContent,
    IonButtons,
  },
});
</script>

<style scoped>
ion-card {
  margin-bottom: 60px;
}
</style>
