<template>
  <p>Position: {{ mapPosition }}</p>
  <ion-card>
    <GMapMap
      :center="mapPosition"
      :zoom="10"
      :options="{ disableDefaultUI: true }"
    >
      <GMapMarker
        title="Position deines Lieferanten"
        :animation="2"
        :position="mapPosition"
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
  props: ['mapPosition'],
});
</script>

<style scoped>
.vue-map-container {
  height: 400px;
}
</style>
