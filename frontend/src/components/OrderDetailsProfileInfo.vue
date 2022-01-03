<template>
  <div>
    <p>
      {{ profileRole === 'creator' ? 'Erstellt von' : 'Angenommen von' }}
      <strong>{{ profile.firstname + ' ' + profile.lastname }}</strong>
    </p>
    <p v-if="profileRole === 'creator'">
      {{ profile.street + ', ' + profile.city + ' ' + profile.postalcode }}
    </p>
    <a :href="'tel:' + profile.telephone">
      <ion-icon :icon="callOutline"></ion-icon>{{ profile.telephone }}</a
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { IonIcon } from '@ionic/vue';
import { callOutline } from 'ionicons/icons';

import type { IProfile } from '@/interfaces/IProfile';

interface Props {
  profile: IProfile;
  profileRole: 'creator' | 'supplier';
}

withDefaults(defineProps<Props>(), {
  profileRole: 'supplier',
});
</script>

<style scoped lang="scss">
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
