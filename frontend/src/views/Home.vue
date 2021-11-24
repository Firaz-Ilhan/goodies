<template>
  <ion-page>
    <Header></Header>

    <ion-content>
      <div id="ModusselectionBox">
        <br>
          <h4>Herzlich Willkommen bei goodies!</h4><!--set to H1 and change size of h1-->
          <p>Hier helfen Nachbarn Nachbarn.</p>
          
          <p><strong>Triff deine Auswahl:</strong></p>
          <p>Möchtst du<br><strong>Deinen Nachbarn unterstützen?</strong></p>
          <router-link to="/liefern">
            <img class="selectionbuttons" src="../assets/home/liefern.png">
          </router-link>
        <br>

          <p>Oder möchtst du<br><strong>Du dir etwas liefern lassen?</strong></p>
          <router-link to="/liefern">
            <img class="selectionbuttons" src="../assets/home/bestellen.png">
          </router-link>
      </div>>
    <Header title="Home" />
      </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonFab,
  IonFabButton,
  IonNote,
  IonButton,
  IonIcon,
  IonList,
  IonCheckbox,
  IonLabel,
  IonBadge,
  IonItem,
} from '@ionic/vue';
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import { add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import Header from '../components/Header.vue';

export default defineComponent({
  name: 'Home',
  components: {
    IonFab,
    IonFabButton,
    IonNote,
    IonButton,
    IonIcon,
    IonList,
    IonCheckbox,
    IonLabel,
    IonBadge,
    IonItem,
    IonPage,
    Header,
  },
  setup() {
    return {
      router: useRouter(),
      add,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
<<<<<<< HEAD

#ModusselectionBox{
  background-color: white;
  text-align: center;
  color: rgb(44, 44, 44);
}

.selectionbuttons{
  position: relative;
  text-align: center;
  width: 70%;
  max-width: 200px;
}


</style>
=======
</style>
>>>>>>> 9e6a007d2a6901ff69b42041a35a8b935bb06b18
