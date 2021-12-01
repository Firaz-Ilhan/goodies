<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>

        <ion-title>New Item</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <Map></Map>
      <ion-button @click="scrollToBottom"
        >Scroll to Bottom <ion-icon :icon="heart"></ion-icon
      ></ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { heart } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';
import Map from '../components/Map.vue'

export default defineComponent({
  name: 'Example',
  components: {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    Map,
  },
  setup() {
    const content = ref();

    const scrollToBottom = () => {
      content.value.$el.scrollToBottom(300);
    };
    return { heart, scrollToBottom };
  },
});
</script>
