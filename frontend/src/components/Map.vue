<template>
  <div ref="mapDiv" style="width: 100%; height: 80vh"></div>
</template>

<script lang="ts">
import {} from '@ionic/vue';

import { defineComponent, onMounted, ref } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

/* ToDo: 
- Längen und Breitengrad: Firebase Datenbank-Abfrage
- Dummie-Set erstellen? (öffentliches Fahrzeug?)
*/

export default defineComponent({
  name: 'Map',

  setup() {
    // const {coords} = useGeolocation()
    const fixedPosition = { lat: 48.742857061431366, lng: 9.101005423756947 };
    const loader = new Loader({
      apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    });
    const mapDiv = ref(null);

    onMounted(async () => {
      await loader.load().then((google) => {
        new google.maps.Map(mapDiv.value, {
          center: fixedPosition,
          zoom: 7,
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
