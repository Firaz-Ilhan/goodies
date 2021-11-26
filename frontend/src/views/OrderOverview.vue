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

        <h2 v-for="order in orders" :key="order.id">{{ order.name }}</h2>

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
import Header from '../components/Header.vue';
import CreateOrderModal from '../components/CreateOrderModal.vue';
import { add } from 'ionicons/icons';
import { db } from '../main';

export default defineComponent({
  name: 'OrderOverview',
  components: {
    Header,
    IonFab,
    IonFabButton,
    IonIcon,
  },

  data() {
    return {
      orders: new Array<{ id: string; name: string }>(),
    };
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

  // get live orders from firestore
  async created() {
    await db.collection('test').onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((change: any) => {
        if (change.type === 'added') {
          this.orders.push(change.doc.data());
        }
        console.log(change.doc.data());
      });
    });
  },

  setup() {
    return {
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
