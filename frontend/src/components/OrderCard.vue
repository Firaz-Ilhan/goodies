<template>
  <ion-card button>
    <ion-card-content>
      <h2>{{ order.name }}</h2>
      <div class="date">
        Erstellt am: {{ new Date(order.createdAt).toLocaleDateString('de-EU') }}
      </div>
      <ion-badge color="medium">
        {{ useOrder().calculateTotalArticleAmount(order.list) }}
        Artikel</ion-badge
      >
      <ion-badge
        class="ion-margin-start"
        :color="useOrder().getOrderStateColor(order.orderState)"
      >
        {{ order.orderState }}</ion-badge
      >
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { useOrder } from '@/composables/useOrder';
import { IonCard, IonCardContent, IonBadge } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { PropType } from 'vue';
import type { IOrder } from '../interfaces/IOrder';

export default defineComponent({
  name: 'OrderCard',
  components: {
    IonCard,
    IonCardContent,
    IonBadge,
  },
  props: { order: { type: Object as PropType<IOrder>, default: {} as IOrder } },

  setup() {
    return {
      useOrder,
    };
  },
});
</script>

<style scoped lang="scss">
h2 {
  color: var(--ion-color-dark);
}

h2,
.date {
  margin-bottom: 4px;
}
</style>
