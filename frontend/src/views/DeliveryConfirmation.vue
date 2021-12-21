<template>
  <ion-page>
    <Header title="Lieferungsbestätigung" :hasBackButton="true" />
    <ion-content>
      <div class="ion-margin-top ion-text-start">
        <p>
          Prima, <br />
          du hast deine erste Lieferung erhalten.
        </p>

        <p>
          Wir hoffen, dass alles wie erwartet war und wünschen dir viel Spaß mit
          den Artikeln
        </p>
        <p>~Goodies</p>
      </div>
      <div class="abc">
        <ion-button routerLink="/orders">Zur Übersicht</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import { IonPage, IonContent, IonButton } from '@ionic/vue';

export default defineComponent({
  name: 'DeliveryConfirmation',
  components: {
    IonPage,
    Header,
    IonContent,
    IonButton,
  },
});
</script>

<style>
</style>
