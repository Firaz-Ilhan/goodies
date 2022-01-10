<template>
  <div>
    <h1>{{ order.name }}</h1>
    <p class="date">
      Erstellt am
      {{ new Date(order.createdAt).toLocaleDateString('de-EU') }}
    </p>

    <p v-if="profile.firstname">
      {{ profileRole === 'creator' ? 'Erstellt von' : 'Angenommen von' }}
      <strong>{{ profile.firstname + ' ' + props.profile.lastname }}</strong>
    </p>

    <div v-if="order.orderState !== 'offen' && profile.street">
      <p v-if="profileRole === 'creator'">
        {{ profile.street + ', ' + profile.city + ' ' + profile.postalcode }}
      </p>

      <a :href="'tel:' + profile.telephone">
        <ion-icon :icon="callOutline"></ion-icon>{{ profile.telephone }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { IonIcon } from '@ionic/vue';
import { callOutline } from 'ionicons/icons';

import type { IProfile } from '@/interfaces/IProfile';
import type { IOrder } from '@/interfaces/IOrder';

interface Props {
  profile: IProfile;
  order: IOrder;
  profileRole: 'creator' | 'supplier';
}

const props = withDefaults(defineProps<Props>(), {
  profileRole: 'supplier',
});
</script>

<style scoped lang="scss">
.date {
  color: var(--ion-color-medium);
}

a {
  display: flex;
  align-content: center;
  margin-bottom: 30px;
  ion-icon {
    margin-top: 2px;
    margin-right: 8px;
  }
}

p {
  text-align: start;
}
</style>
