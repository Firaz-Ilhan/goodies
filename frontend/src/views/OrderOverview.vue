<template>
  <ion-page>
    <Header title="Bestellen" :hasBackButton="true" />
    <ion-content>
      <div class="wrapper">
        <p>
          Um Artikel zu bestellen, benötigen die Einkäufer/innen Deine
          Einkausliste.
        </p>
        <p>
          Du kannst eine gespeicherte Einkaufsliste wieder verwenden, oder eine
          neue anlegen:
        </p>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button @click="openModal">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonFab, IonFabButton, modalController, IonIcon } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';
import CreateOrderModal from '../components/CreateOrderModal.vue';
import { add } from 'ionicons/icons';

export default defineComponent({
  name: 'OrderOverview',
  components: {
    Header,
    IonFab,
    IonFabButton,
    IonIcon,
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
      add,
    };
  },
});
</script>

<style scoped>
.order-container {
  margin: 30px;
}
</style>
