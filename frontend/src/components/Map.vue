<template>
  <ion-card>
    <div ref="mapDiv" style="width: 100%; height: 400px"></div>
  </ion-card>
</template>

<script lang="ts">
import { IonCard } from '@ionic/vue';

import { defineComponent, onMounted, ref } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { useGeolocation } from '../services/useGeolocation';

/* ToDo:
- Längen und Breitengrad: Firebase Datenbank-Abfrage
- Dummie-Set erstellen? (öffentliches Fahrzeug?)
*/

export default defineComponent({
  name: 'Map',
  components: {
    IonCard,
  },
  setup() {
    // const fixedPosition = { lat: 48.742857061431366, lng: 9.101005423756947 };
    const loader = new Loader({
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    });
    const mapDiv = ref(null);

    onMounted(async () => {
      const currentPosition = await useGeolocation().getCurrentPosition();
      const currentCoordinates = {
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude,
      };
      await loader.load().then((google) => {
        const map = new google.maps.Map(mapDiv.value, {
          center: currentCoordinates,
          zoom: 10,
          disableDefaultUI: true,
        });
        new google.maps.Marker({
          position: currentCoordinates,
          map: map,
          title: 'Position deines Lieferanten',
          animation: google.maps.Animation.DROP,
        });
      });
    });

    return { mapDiv };
  },
});
</script>

<style scoped>
a {
  text-decoration: none;
}

.router-link-active * {
  color: #3880ff;
}
</style>
