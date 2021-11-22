<template>
  <ion-page>
    <Header title="Bestellen" :hasBackButton="true" />
    <ion-content>
      <p>
        Um Artikel zu bestellen, benötigen die Einkäufer/innen Deine
        Einkausliste.
      </p>
      <p>
        Du kannst eine gespeicherte Einkaufsliste wieder verwenden, oder eine
        neue anlegen:
      </p>

      <ion-button @click="openModal">Neue Liste anlegen</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, modalController } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import CreateOrderModal from '../components/CreateOrderModal.vue';

export default defineComponent({
  name: 'OrderOverview',
  components: {
    Header,
    IonButton,
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: CreateOrderModal,
        componentProps: {
          title: 'Liste anlegen',
        },
      });
      return modal.present();
    },
  },
  setup() {
    return {
      router: useRouter(),
      data: { content: 'New Content' },
    };
  },
});
</script>

<style scoped></style>
