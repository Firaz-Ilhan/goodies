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
      <form @submit.prevent="createOrder" class="wrapper">
        <h1 class="caption">Deine Bestellung</h1>

        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name" required />
        </ion-item>

        <AddListItem :setList="setList" />

        <ion-list v-if="list.length > 0">
          <h1 class="caption">Einkaufsliste</h1>
          <ion-item class="list-header">
            <ion-col size="9">Artikel</ion-col>
            <ion-col size="3">Anzahl</ion-col>
          </ion-item>
          <ion-item-sliding v-for="(entry, index) in list" :key="index">
            <ion-item-options side="end">
              <ion-item-option @click="removeFromList(index)" color="danger">
                <ion-icon :icon="trashOutline"></ion-icon>
              </ion-item-option>
            </ion-item-options>
            <ion-item>
              <ion-col size="9">{{ entry.article }}</ion-col>
              <ion-col size="3">{{ entry.amount }}</ion-col>
            </ion-item>
          </ion-item-sliding>
        </ion-list>

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
import { db } from '../main';
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
  IonList,
  IonCol,
  IonIcon,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  modalController,
} from '@ionic/vue';
import { addCircleOutline, trashOutline } from 'ionicons/icons';
import firebase from 'firebase';
import { defineComponent } from 'vue';
import { IListEntry } from '../interfaces/IListEntry';
import { IOrder } from '../interfaces/IOrder';
import AddListItem from './AddListItem.vue';

export default defineComponent({
  name: 'CreateOrderModal',
  methods: {
    async closeModal() {
      await modalController.dismiss();
    },

    createOrder() {
      if (this.list.length > 0) {
        const order: Omit<IOrder, 'id'> = {
          name: this.name,
          list: this.list,
          orderState: 'offen',
          createdBy: firebase.auth().currentUser!.uid,
          createdAt: new Date().getTime(),
          supplier: null,
        };

        // create document in fb collection
        db.collection('orders')
          .add(order)
          .then((res) => {
            if (res.id) {
              this.closeModal();
              console.log(`Order with id: ${res.id} was created`);
            }
          });
      }
    },
    removeFromList(index: number) {
      this.list.splice(index, 1);

      // close other item sliders
      document.querySelectorAll('ion-item-sliding').forEach((el) => {
        el.close();
      });
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
    IonList,
    IonCol,
    IonIcon,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
    AddListItem,
  },
  data() {
    return {
      name: '',
      list: new Array<IListEntry>(),
      addCircleOutline,
      trashOutline,
      AddListItem,
    };
  },
});
</script>

<style scoped lang="scss">
.list-header {
  font-size: 14px;
  // color: var(--ion-color-medium);
  margin-top: 30px;
  ion-col {
    padding: 0;
  }
}

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
