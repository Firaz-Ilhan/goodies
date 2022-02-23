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
        @submit.prevent="
          createOrder(name, list).then(() => {
            closeModal();
            $router.push('/orders');
          })
        "
        class="wrapper"
      >
        <h1>Deine Bestellung</h1>

        <ion-item class="ion-no-padding">
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name" required />
        </ion-item>

        <AddListItem :setList="addEntryToList" />

        <div v-if="list.length > 0">
          <h1 class="caption">Einkaufsliste</h1>

          <ShoppingListCreate :list="list"></ShoppingListCreate>
        </div>

        <ion-button
          class="btn-center"
          type="submit"
          :disabled="list.length <= 0"
        >
          Erstellen
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
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
import { withDefaults, ref } from 'vue';
import { IListEntry } from '../interfaces/IListEntry';
import { IOrder } from '../interfaces/IOrder';
import AddListItem from './AddListItem.vue';
import ShoppingListCreate from './ShoppingListCreate.vue';
import { useOrder } from '../composables/useOrder';

interface Props {
  order?: IOrder;
}

const props = withDefaults(defineProps<Props>(), {
  order: () => ({} as IOrder),
});

const order = { ...props.order };
const name = ref(order.name || '');
const list = ref(order.list || []);

const { createOrder } = useOrder();

const closeModal = async () => {
  await modalController.dismiss();
};

const addEntryToList = (entry: IListEntry) => {
  list.value.push(entry);
};
</script>

<style scoped>
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
