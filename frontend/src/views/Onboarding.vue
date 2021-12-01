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
              <img src="../assets/orderPic.png" />
              <h1>Kreiere deine Einkaufsliste</h1>
              <p>
                Mit Goodies kannst du dir Lebensmittel von zuhause aus bestellen
                und liefern lassen. Über den Bestellen Button gibst du hierfür
                deine Einkaufsliste an und beschreibst deine Artikel möglichst
                genau.
              </p>
            </ion-card-content>
          </ion-card>
        </swiper-slide>
        <swiper-slide>
          <ion-card>
            <img src="../assets/deliveryPic.png" />
            <ion-card-title>Tu etwas Gutes</ion-card-title>
            <ion-card-content>
              <p>
                Als Lieferant suchst du dir eine passende Bestellung in deiner
                Nähe, stellst sie zusammen und lieferst sie gegen eine Belohnung
                aus. Denke daran den Kassenzettel mitzunehmen.
              </p>
            </ion-card-content>
          </ion-card>
        </swiper-slide>
        <swiper-slide>
          <ion-card>
            <ion-card-content>
              <ion-card-title>Tu etwas Gutes</ion-card-title>
              <p>
                Auf der Karte siehst du als Besteller immer wo sich deine
                Lieferung befindet.
              </p>
              <p>
                Ist deine Bestellung da, überprüfe den Kassenzettel und bezahle
                deinen Lieferanten - fertig!
              </p>
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
import { IonContent, IonPage, IonicSwiper } from '@ionic/vue';
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
  },
});
</script>

<style scoped>
ion-card {
  margin-bottom: 60px;
}
</style>
