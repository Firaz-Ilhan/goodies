<template>
  <ion-page>
    <ion-content>
      <swiper :pagination="{ clickable: true }">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script>
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
.swiper-container {
  height: 100%;
}
</style>
