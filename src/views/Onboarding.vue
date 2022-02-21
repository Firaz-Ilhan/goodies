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
      <div class="wrapper">
        <swiper :pagination="{ clickable: true }">
          <swiper-slide>
            <img
              src="../assets/images/mapAndPerson.svg"
              alt="woman looking at a map on a phone"
            />

            <h1>Kreiere deine Einkaufsliste</h1>
            <p>
              Mit Goodies kannst du dir Lebensmittel von zuhause aus bestellen
              und liefern lassen. Über den Bestellen Button gibst du hierfür
              deine Einkaufsliste an und beschreibst deine Artikel möglichst
              genau. Auf der Karte siehst du immer wo sich deine Bestellung
              befindet.
            </p>
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/images/shopping.svg" alt="woman shopping" />
            <h1>Deine Hilfe ist gefragt</h1>
            <p>
              Als Lieferant suchst du dir eine passende Bestellung in deiner
              Nähe, stellst sie zusammen und lieferst sie gegen eine Belohnung
              aus. Denke daran den Kassenzettel mitzunehmen.
            </p>
          </swiper-slide>
          <swiper-slide>
            <img
              src="../assets/images/FinishedDelivery.svg"
              alt="happy customers"
            />

            <h1>Jeden Tag eine gute Tat</h1>
            <p>
              Ist deine Bestellung da, überprüfe den Kassenzettel und bezahle
              deinen Lieferanten - fertig!
            </p>
            <p>Viel Spaß mit Goodies!</p>
            <ion-button class="ion-margin" @click="() => $router.push('/home')">
              Jetzt Starten
            </ion-button>
          </swiper-slide>
        </swiper>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonicSwiper,
  IonTitle,
  IonButton,
  IonToolbar,
  IonHeader,
  IonButtons,
} from '@ionic/vue';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper-bundle.min.css';
import '@ionic/vue/css/ionic-swiper.css';

SwiperCore.use([IonicSwiper, Pagination]);
</script>

<style scoped>
.swiper-slide {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding-bottom: 2.5rem;
}

img {
  margin-bottom: 30px;
  width: 60vw;
  max-width: 400px;
}

h1,
p {
  max-width: 500px;
}
</style>
