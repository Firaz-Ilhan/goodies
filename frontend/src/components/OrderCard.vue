<template>
  <ion-card button>
    <ion-card-content>
      <h2>{{ order.name }}</h2>
      <p class="date">
        Erstellt am: {{ new Date(order.createdAt).toLocaleDateString('de-EU') }}
      </p>
      <OrderBadges :order="order" :distance="distance"></OrderBadges>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { PropType, ref, defineComponent } from 'vue';
import { IonCard, IonCardContent } from '@ionic/vue';
import { useOrder } from '../composables/useOrder';
import OrderBadges from '../components/OrderBadges.vue';
import type { IOrder } from '../interfaces/IOrder';

export default defineComponent({
  name: 'OrderCard',
  components: {
    IonCard,
    IonCardContent,
    OrderBadges,
  },

  props: {
    order: { type: Object as PropType<IOrder>, default: {} as IOrder },
    showDistance: { type: Boolean, default: false },
  },

  setup(props) {
    const distance = ref(0);

    if (props.showDistance) {
      useOrder()
        .getOrderDistance(props.order)
        .then((distanceInKm) => {
          distance.value = distanceInKm;
        });
    }

    return {
      distance,
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
  text-align: start;
}
</style>
