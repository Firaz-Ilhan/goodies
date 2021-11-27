<template>
  <ion-header class="ion-margin-bottom">
    <ion-toolbar>
      <ion-buttons slot="start" v-if="hasBackButton">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <!-- Todo add vuex and v-if user to use the header everywhere -->
      <ion-buttons slot="end">
        <ion-menu-button menu="app-menu"></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToolbarWith',
  components: {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonBackButton,
  },
  props: { title: String, hasBackButton: Boolean },
});
</script>
