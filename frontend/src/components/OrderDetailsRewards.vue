<template>
  <div>
    <h2>{{ headline }}</h2>
    <p>
      Die {{ headline }} ergeben sich aus der Anzahl zu liefernder Artikel und
      der Distanz zwischen deinem Wohnort und dem
      {{ isCreator ? 'Empfänger' : 'Lieferanten' }}.
    </p>
    <p class="reward">
      {{ isCreator ? 'Zu zahlen' : 'Du erhältst' }}
      : <span>{{ getRewardsValue }} €</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useOrder } from '@/composables/useOrder';
import firebase from 'firebase/app';
import 'firebase/auth';
import { computed, defineProps, withDefaults } from 'vue';

import type { IOrder } from '../interfaces/IOrder';

interface Props {
  order: IOrder;
  distance: number;
}

const props = withDefaults(defineProps<Props>(), {
  distance: 0,
});

const isCreator = firebase.auth().currentUser!.uid === props.order.createdBy;
const headline = isCreator ? 'Kosten' : 'Rewards';

const getRewardsValue = computed(() => {
  const articleAmount = useOrder().calculateTotalArticleAmount(
    props.order.list,
  );
  const ditanceInKm = props.distance;

  return ((articleAmount * ditanceInKm) / 10 + 2).toFixed(2);
});
</script>

<style scoped lang="scss">
p {
  text-align: start;
}

.reward {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #c8c8c8;
  padding: 16px;

  span {
    font-size: 24px;
    margin-left: 50px;
    color: var(--ion-color-primary);
    font-weight: 700;
  }
}
</style>
