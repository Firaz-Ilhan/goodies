<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>So funktioniert Goodies</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <swiper :pagination="{ clickable: true }">
        <swiper-slide>
          <ion-card>
            <img src="../assets/orderPic.png" />
            <ion-card-title>Kreiere deine Einkaufsliste</ion-card-title>
            <ion-card-content>
              Mit Goodies kannst du dir Lebensmittel von zuhause aus bestellen und liefern lassen. 
              Über den Bestellen Button gibst du hierfür deine Einkaufsliste an und beschreibst deine Artikel möglichst genau.  
            </ion-card-content>
          </ion-card>
        </swiper-slide>
        <swiper-slide>
          <ion-card>
            <img src="../assets/deliveryPic.png" />
            <ion-card-title>Tu etwas Gutes</ion-card-title>
            <ion-card-content>
              Als Lieferant suchst du dir eine passende Bestellung in deiner Nähe, stellst sie zusammen 
              und lieferst sie gegen eine Belohnung aus. Denke daran den Kassenzettel mitzunehmen.  
            </ion-card-content>
          </ion-card>
        </swiper-slide>
        <swiper-slide>
          <ion-card>
            <ion-card-title>Tu etwas Gutes</ion-card-title>
            <ion-card-content>
              Auf der Karte siehst du als Besteller immer wo sich deine Lieferung befindet. 
            </ion-card-content>
            <ion-card-content>
            Ist deine Bestellung da, überprüfe den Kassenzettel und bezahle deinen Lieferanten - fertig!
            </ion-card-content>
            <ion-button @click="() => router.push('/home')"> Return
            </ion-button>
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
import { useRouter } from 'vue-router';

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
  setup() {
    return {
      router: useRouter(),
    };
  },
});
</script>

<style scoped>
ion-card{
  display: flex;
  flex-direction: column;
  width: 60% !important;
  width: 60% !important;
  margin: 200 !important;
}

img {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>
