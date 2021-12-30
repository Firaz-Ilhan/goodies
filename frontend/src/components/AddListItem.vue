<template>
  <div class="container">
    <h1 class="caption">Artikel hinzufügen</h1>
    <ion-row class="ion-align-items-end">
      <ion-col size="6">
        <ion-item>
          <ion-label position="floating">Artikel</ion-label>
          <ion-input v-model="article" autofocus></ion-input>
        </ion-item>
      </ion-col>
      <ion-col size="3">
        <ion-item>
          <ion-label position="floating">Anzahl</ion-label>
          <ion-input type="number" v-model="amount" required></ion-input>
        </ion-item>
      </ion-col>
      <ion-col size="1">
        <ion-button
          @click="addEntryToList"
          fill="clear"
          shape="round"
          :disabled="article.length <= 0"
        >
          <ion-icon slot="icon-only" :icon="addCircleOutline"></ion-icon>
        </ion-button>
      </ion-col>
    </ion-row>
  </div>
</template>

<script lang="ts">
import {
  IonButton,
  IonLabel,
  IonInput,
  IonItem,
  IonCol,
  IonRow,
  IonIcon,
} from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { IListEntry } from '../interfaces/IListEntry';

export default defineComponent({
  name: 'AddListItem',
  props: ['setList'],
  methods: {
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
        this.setList(this.list);
      } else {
        console.log('invalid input');
      }
    },
  },
  components: {
    IonButton,
    IonLabel,
    IonInput,
    IonItem,
    IonCol,
    IonRow,
    IonIcon,
  },
  data() {
    return {
      name: '',
      article: '',
      amount: 1,
      list: new Array<IListEntry>(),
      addCircleOutline,
    };
  },
});
</script>

<style scoped>
.caption {
  margin-top: 30px;
}
</style>
