<template>
  <ion-card>
    <GMapMap
      :center="centerPosition"
      :zoom="10"
      :options="{ disableDefaultUI: true }"
    >
      <GMapMarker
        title="Position deines Lieferanten"
        :animation="2"
        :position="markerPosition"
      />
    </GMapMap>
  </ion-card>
</template>

<script lang="ts">
import { IonCard } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Map',
  components: {
    IonCard,
  },
  props: ['centerPosition', 'markerPosition'],
});
</script>

<style scoped>
.vue-map-container {
  height: 400px;
}
</style>
