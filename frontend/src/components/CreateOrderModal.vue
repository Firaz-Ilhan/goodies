<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bestellung anlegen</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Schließen</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form
        @submit.prevent="useOrder().createOrder(name, list, closeModal)"
        class="wrapper"
      >
        <h1 class="caption">Deine Bestellung</h1>

        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name" required />
        </ion-item>

        <AddListItem :setList="setList" />

        <div v-if="list.length > 0">
          <h1 class="caption">Einkaufsliste</h1>

          <ShoppingListCreate :list="list"></ShoppingListCreate>
        </div>

        <ion-button
          class="btn-center create-btn"
          type="submit"
          :disabled="list.length <= 0"
        >
          Erstellen
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
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
  modalController,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { IListEntry } from '../interfaces/IListEntry';
import AddListItem from './AddListItem.vue';
import ShoppingListCreate from './ShoppingListCreate.vue';
import { useOrder } from '../composables/useOrder';

export default defineComponent({
  name: 'CreateOrderModal',
  methods: {
    async closeModal() {
      await modalController.dismiss();
    },

    setList(list: IListEntry[]) {
      this.list = list;
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
    AddListItem,
    ShoppingListCreate,
  },
  data() {
    return {
      name: '',
      list: new Array<IListEntry>(),
      useOrder,
      AddListItem,
    };
  },
});
</script>

<style scoped lang="scss">
form {
  margin: 20px 0;
}

.btn-center {
  margin-top: 30px;
}
.caption {
  margin-top: 30px;
}
</style>
