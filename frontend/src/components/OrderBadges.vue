<template>
  <div class="badge-wrapper">
    <ion-badge
      class="ion-margin-start"
      :color="getOrderStateColor(order.orderState)"
    >
      {{ order.orderState }}</ion-badge
    >
    <ion-badge v-if="order.list" color="medium">
      {{ calculateTotalArticleAmount(order.list) }}
      Artikel
    </ion-badge>
    <ion-badge v-if="distance > 0" color="medium" class="ion-margin-start">
      {{ formatDistance(distance) }}
    </ion-badge>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';
import { IonBadge } from '@ionic/vue';
import { useOrder } from '../composables/useOrder';
import type { IOrder } from '../interfaces/IOrder';

const { getOrderStateColor, calculateTotalArticleAmount, formatDistance } =
  useOrder();

interface Props {
  order: IOrder;
  distance: number;
}

withDefaults(defineProps<Props>(), {
  distance: 0,
});
</script>

<style scoped lang="scss">
.badge-wrapper {
  ion-badge {
    margin-left: 8px;
    &:first-of-type {
      margin-left: 0;
    }
  }
}
</style>
