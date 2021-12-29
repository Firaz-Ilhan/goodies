<template>
  <h2 class="list-heading" @click="toggleList" ref="listHeading">
    Einkaufsliste
    <ion-icon class="ion-margin-start" :icon="chevronUpOutline"></ion-icon>
  </h2>
  <ion-list v-if="listOpen">
    <ion-row class="list-header">
      <ion-col size="7"> Artikel inkl. Menge </ion-col>
      <ion-col size="3"> Anzahl </ion-col>
      <ion-col size="2"> Status </ion-col>
    </ion-row>

    <ion-row
      v-for="(detail, index) in list"
      :key="index"
      @click="isCheckable && checkItem(index)"
      button
    >
      <ion-col size="7"> {{ detail.article }} </ion-col>
      <ion-col size="3">
        {{ detail.amount }}
      </ion-col>
      <ion-col size="2">
        <ion-checkbox
          :checked="detail.isChecked"
          :disabled="!isCheckable"
        ></ion-checkbox>
      </ion-col> </ion-row
  ></ion-list>
</template>

<script lang="ts">
import type { IListEntry } from '../interfaces/IListEntry';
import { IonList, IonCol, IonRow, IonIcon, IonCheckbox } from '@ionic/vue';
import { chevronUpOutline } from 'ionicons/icons';
import { defineComponent, PropType } from 'vue';
import { db } from '@/main';

export default defineComponent({
  name: 'ShoppingListDetails',
  props: {
    list: { type: Array as PropType<IListEntry[]>, default: () => [] },
    isCheckable: { type: Boolean, default: false },
  },
  methods: {
    // toggles list dropdown
    toggleList() {
      this.listOpen = !this.listOpen;
      (this.$refs.listHeading as HTMLElement).classList.toggle('open');
    },

    // update list when item is un/checked
    checkItem(index: number) {
      const updatedList = this.$props.list.slice();
      updatedList[index].isChecked = !updatedList[index].isChecked;
      db.collection('orders')
        .doc(this.$route.params.id as string)
        .update({ list: updatedList });

      // .update({ [`list.${id}.isChecked`]: !isChecked });

      // // Atomically add a new region to the "regions" array field.
      // itemRef.update({
      //   list: firebase.firestore.FieldValue.arrayUnion({
      //     ...item,
      //     isChecked: !isChecked,
      //   }),
      // });

      // // Atomically remove a region from the "regions" array field.
      // itemRef.update({
      //   list: firebase.firestore.FieldValue.arrayRemove(item),
      // });
    },
  },
  components: {
    IonList,
    IonRow,
    IonCol,
    IonIcon,
    IonCheckbox,
  },

  data() {
    return {
      listOpen: true,
      chevronUpOutline,
    };
  },
});
</script>

<style scoped lang="scss">
.list-heading {
  display: flex;
  align-items: center;
  margin: 30px 0 0;
  cursor: pointer;
}

.list-header {
  margin-top: 16px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  font-size: 14px;
  border-bottom: 1px solid #c8c8c8;
  color: var(--ion-color-medium);
}
.open {
  ion-icon {
    transform: rotate(180deg);
  }
}

ion-icon {
  transition: transform 0.3s ease;
}

ion-checkbox {
  margin-left: 10px;
}
</style>
