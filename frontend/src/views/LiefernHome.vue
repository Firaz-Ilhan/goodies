<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>

        <ion-title>Liefern</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="scrollToBottom"
        >Scroll to Bottom <ion-icon :icon="heart"></ion-icon
      ></ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
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

export default defineComponent({
  name: 'LiefernHome',
  components: {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const content = ref();
    const scrollToBottom = () => {
      content.value.$el.scrollToBottom(300);
    };
    return { heart };
  },
});
</script>
