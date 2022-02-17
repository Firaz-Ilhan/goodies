<template>
  <ion-page>
    <Header title="Home"></Header>

    <ion-content>
      <div class="wrapper">
        <h1>Herzlich Willkommen bei goodies!</h1>
        <p>Hier helfen Nachbarn Nachbarn.</p>

        <p><strong>Triff deine Auswahl:</strong></p>
        <p>Möchtest du<br /><strong>Deinen Nachbarn unterstützen?</strong></p>

    
        <router-link to="/deliveries">
          <div class="ion-activatable ripple-parent">
          <img src="../assets/images/liefern_orange.png"  alt="Einkaufen und Liefern">
           Einkaufen & <br/> Liefern
            <ion-ripple-effect></ion-ripple-effect>
          </div>        
        </router-link>    

        <br>
        <p>Oder möchtest du<br /><strong> dir etwas liefern lassen?</strong></p>
      
        <router-link to="/orders">
          <div class="ion-activatable ripple-parent2">
           <img src="../assets/images/bestellen_green.png"  alt="Einkaufen und Liefern">
           Bestellen
            <ion-ripple-effect></ion-ripple-effect>
          </div>        
        </router-link>

        <br>
        <p>
          Oder zurück zum
          <router-link to="/onboarding"> Onboarding </router-link>
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonApp, IonContent, IonRippleEffect } from '@ionic/vue';
import Header from '../components/Header.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Header, IonApp, IonContent, IonRippleEffect

  },
});
</script>

<style scoped lang="scss">
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
.ripple-parent {
    position: relative;
    overflow: hidden;
    background-color: white;
    width: 200px;
    height: 170px;
    border-width: 1px; 
    border-color: none; 
    border-radius: 100px 100px 100px 100px; 
      box-shadow: 0px 3px 3px 1px #FF9E16;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }

  .ripple-parent2 {
    position: relative;
    overflow: hidden;
    background-color: white;
    width: 200px;
    height: 170px;
    border-width: 1px; 
    border-color: none; 
    border-radius: 100px 100px 100px 100px; 
      box-shadow: 0px 3px 3px 1px #60D58E;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }


.wrapper {
  text-align: center;
  margin-bottom: 40px;
}

img {
  margin: 20px 0;
  width: 200px;
  transition: 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }


}
</style>
