<template>
  <ion-page>
    <Header title="Bestätigung" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <img
          class="order-img"
          src="@/assets/images/order-confirmation.svg"
          alt="Familie empfängt Lebensmitteltüte"
        />
        <h1>Prima, du hast deine Lieferung erhalten.</h1>

        <p>
          Wir hoffen, dass alles wie erwartet war und wünschen dir viel Spaß mit
          den Artikeln.
          <br />
          -Goodies
        </p>

        <ion-button class="btn-center" routerLink="/orders"
          >Zurück zur Übersicht</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton } from '@ionic/vue';
import Header from '../components/Header.vue';

export default defineComponent({
  name: 'OrderConfirmation',
  components: {
    Header,
    IonButton,
  },
});
</script>

<style scoped>
h1 {
  text-align: center;
}
.order-img {
  display: block;
  margin: 0px auto;
  width: 90vw;
  max-width: 600px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
}
</style>
