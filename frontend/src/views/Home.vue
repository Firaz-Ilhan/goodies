<template>
  <ion-page>
    <Header title="Home"></Header>

    <ion-content>
      <div class="wrapper">
        <h1>Herzlich Willkommen bei goodies!</h1>
        <p>Hier helfen Nachbarn Nachbarn.</p>

        <p><strong>Triff deine Auswahl:</strong></p>
        <p>Möchtest du<br /><strong>Deinen Nachbarn unterstützen?</strong></p>

        <router-link to="/deliveries">
          <img src="../assets/images/liefern.png" alt="Einkaufen und Liefern" />
        </router-link>
        <br />

        <p>Oder möchtest du<br /><strong> dir etwas liefern lassen?</strong></p>
        <router-link to="/orders">
          <img src="../assets/images/bestellen.png" alt="Bestellen" />
        </router-link>

        <p>
          Oder zurück zum
          <router-link to="/onboarding"> Onboarding </router-link>
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Header,
  },
});
</script>

<style scoped lang="scss">
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.wrapper {
  text-align: center;
  margin-bottom: 40px;
}

img {
  margin: 20px 0;
  width: 200px;
  transition: 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
}
</style>
