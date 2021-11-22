<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Schließen</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <form @submit.prevent="">
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input :name="name" required></ion-input>
        </ion-item>

        <ion-grid>
          <ion-row class="grid-header">
            <ion-col size="10">Artikel</ion-col>
            <ion-col size="2">Anzahl</ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="10">Karotten</ion-col>
            <ion-col size="2">5 Stk</ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="10">Joghurt, 500g</ion-col>
            <ion-col size="2">2 Stk</ion-col>
          </ion-row>
        </ion-grid>

        <ion-list-header>
          <ion-col size="10">Artikel</ion-col>
          <ion-col size="2">Anzahl</ion-col>
        </ion-list-header>
        <ion-list>
          <ion-item>
            <ion-col size="10">Tomaten</ion-col>
            <ion-col size="2">500g</ion-col>
          </ion-item>
          <ion-item>
            <ion-label>Artikel</ion-label>
            <ion-input></ion-input>
          </ion-item>
        </ion-list>
      </form>
    </ion-content>
  </div>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonLabel,
  IonInput,
  IonItem,
  IonList,
  modalController,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateOrderModal',
  props: {
    title: String,
  },
  methods: {
    async closeModal() {
      await modalController.dismiss();
    },
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonLabel,
    IonInput,
    IonItem,
    IonList,
  },
  data() {
    return {
      name: '',
    };
  },
});
</script>

<style scoped>
.grid-header {
  color: teal;
}
</style>
