<template>
  <div ref="mapDiv">
  </div>
</template>

<script lang="ts">
import {
} from '@ionic/vue';

import { defineComponent, onMounted, ref } from 'vue';
import { Loader } from '@googlemaps/js-api-loader'

/* ToDo: 
- Längen und Breitengrad: Firebase Datenbank-Abfrage
- Dummie-Set erstellen? (öffentliches Fahrzeug?)
*/

const API_KEY = "AIzaSyAeTmR_WD4BemHmW2vKV-V6Kc1_TbGs6QA"

export default defineComponent({
name: "Map",

setup() {
  // const {coords} = useGeolocation()
  const fixedPosition = { lat: 48.742857061431366, lng: 9.101005423756947 }
  const loader = new Loader({apiKey: API_KEY})
  const mapDiv = ref(null)


  onMounted(async() => {
    await loader.load().then((google) => {
      new google.maps.Map(mapDiv.value, {
          center: fixedPosition,
          zoom: 7
        })
    })
  })

  return{ mapDiv }
}

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
