<template>
  <ion-list>
    <ion-item class="list-header ion-no-padding" detail="false">
      <ion-col size="9">Artikel</ion-col>
      <ion-col size="3">Anzahl</ion-col>
    </ion-item>
    <ion-item-sliding v-for="(entry, index) in list" :key="index">
      <ion-item-options side="end">
        <ion-item-option @click="removeFromList(index)" color="danger">
          <ion-icon :icon="trashOutline"></ion-icon>
        </ion-item-option>
      </ion-item-options>
      <ion-item class="ion-no-padding" lines="none">
        <ion-col size="9">{{ entry.article }}</ion-col>
        <ion-col size="3">{{ entry.amount }}</ion-col>
      </ion-item>
    </ion-item-sliding>
  </ion-list>
</template>

<script lang="ts">
import type { IListEntry } from '../interfaces/IListEntry';
import {
  IonItem,
  IonList,
  IonCol,
  IonIcon,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
} from '@ionic/vue';
import { trashOutline } from 'ionicons/icons';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ShoppingListCreate',
  props: { list: { type: Array as PropType<IListEntry[]>, default: () => [] } },
  methods: {
    removeFromList(index: number) {
      this.$props.list.splice(index, 1);

      // close other item sliders
      document.querySelectorAll('ion-item-sliding').forEach((el) => {
        el.close();
      });
    },
  },
  components: {
    IonItem,
    IonList,
    IonCol,
    IonIcon,
    IonItemOptions,
    IonItemOption,
    IonItemSliding,
  },
  data() {
    return {
      trashOutline,
    };
  },
});
</script>

<style scoped lang="scss">
.list-header {
  font-size: 14px;
  color: var(--ion-color-medium);
  margin-top: 8px;
}
</style>
