<template>
  <ion-page>
    <Header title="Home"></Header>

    <ion-content>
      <div class="wrapper">
        <h1>Wie möchtest du goodies nutzen?</h1>
        <p>Möchtest du<br /><strong>Deine Nachbarn unterstützen?</strong></p>

        <button
          class="ion-activatable ripple-parent"
          @click="$router.push('/deliveries')"
        >
          <img
            src="../assets/images/illustration_shopping.svg"
            alt="Frau mit Einkaufstüte"
          />
          <p>Einkaufen &amp; Liefern</p>
          <ion-ripple-effect></ion-ripple-effect>
        </button>

        <p>Oder möchtest du<br /><strong> dir etwas liefern lassen?</strong></p>

        <button
          class="ion-activatable ripple-parent green-shadow"
          @click="$router.push('/orders')"
        >
          <img
            src="../assets/images/illustration_package_delivery.svg"
            alt="Lieferantin übergibt Paket an Kunden"
          />
          <p>Bestellen</p>
          <ion-ripple-effect></ion-ripple-effect>
        </button>

        <p>
          Oder zurück zum
          <router-link to="/onboarding"> Onboarding </router-link>
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonRippleEffect } from '@ionic/vue';
import Header from '../components/Header.vue';
</script>

<style scoped lang="scss">
.wrapper {
  text-align: center;
  margin-bottom: 40px;
}

.ripple-parent {
  position: relative;
  overflow: hidden;
  width: 200px;
  margin: 4px 0 20px;
  border-radius: 100px;
  background-color: #fff;
  box-shadow: 0px 4px 4px;
  color: #ff9e16;
  transition: 0.3s ease;
  &:hover {
    transform: scale(0.96);
    box-shadow: 0px 3px 3px;
  }
  p {
    color: var(--ion-color-light-contrast);
    font-size: 16px;
    font-weight: 700;
    max-width: 100px;
    height: 32px;
    margin: 8px auto;
  }
  img {
    height: 120px;
    padding: 4px 8px;
  }
}

body[color-theme='dark'] .ripple-parent {
  background-color: var(--ion-color-light);
}

.green-shadow {
  color: #60d58e;
}
</style>
