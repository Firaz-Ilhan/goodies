<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Schließen</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="createOrder">
        <h1 class="ion-margin-start">
          Wie möchtest du deine Bestellung nennen?
        </h1>

        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name" required />
        </ion-item>

        <ion-list v-if="list.length > 0">
          <ion-item class="list-header">
            <ion-col size="9">Artikel</ion-col>
            <ion-col size="3">Menge</ion-col>
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

        <ion-list>
          <span class="ion-margin-start">Artikel hinzufügen</span>
          <ion-row class="ion-align-items-end">
            <ion-col size="6">
              <ion-item>
                <ion-label position="floating">Artikel</ion-label>
                <ion-input v-model="article" autofocus></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="3">
              <ion-item>
                <ion-label position="floating">Menge</ion-label>
                <ion-input v-model="amount" required></ion-input>
              </ion-item>
            </ion-col>
            <ion-col size="1">
              <ion-button @click="addEntryToList" fill="clear" shape="round">
                <ion-icon slot="icon-only" :icon="addCircleOutline"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-list>

        <div class="wrapper">
          <ion-button type="submit" :disabled="list.length <= 0">
            Erstellen
          </ion-button>
        </div>
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
  IonRow,
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
import { IOrder } from '@/interfaces/IOrder';

export default defineComponent({
  name: 'CreateOrderModal',
  props: {
    title: String,
  },
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

    addEntryToList() {
      const listEntry: Omit<IListEntry, 'id'> = {
        article: this.article,
        amount: this.amount,
        isChecked: false,
      };

      if (this.article && this.amount > 0) {
        this.list.push(listEntry);
        this.article = '';
        this.amount = 1;
      } else {
        console.log('invalid input');
      }
    },

    removeFromList(index: number) {
      this.list.splice(index, 1);

      // close other item sliders
      document.querySelectorAll('ion-item-sliding').forEach((el) => {
        el.close();
      });
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
    IonRow,
    IonIcon,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
  },
  data() {
    return {
      name: '',
      article: '',
      amount: 1,
      list: new Array<IListEntry>(),
      addCircleOutline,
      trashOutline,
    };
  },
});
</script>

<style scoped lang="scss">
h1 {
  margin-top: 30px;
  margin-bottom: 0;
  font-size: 24px;
}
.list-header {
  font-family: Rubik;
  font-size: 16px;
  ion-col {
    padding: 0;
  }
}

.wrapper {
  text-align: center;
}

ion-list {
  margin: 40px 0;
}

span {
  font-family: Rubik;
  font-weight: 500;
}
</style>
