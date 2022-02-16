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
           <div class="text_bottom_centered"> Einkaufen & <br/> Liefern</div>
            <ion-ripple-effect></ion-ripple-effect>
          </div>        
        </router-link>


       

        <p>Oder möchtest du<br /><strong> dir etwas liefern lassen?</strong></p>
      
        <router-link to="/deliveries">
          <div class="ion-activatable ripple-parent">
           <img src="../assets/images/bestellen_green.png"  alt="Einkaufen und Liefern">
           <div class="text_bottom_centered"> Bestellen</div>
            <ion-ripple-effect></ion-ripple-effect>
          </div>        
        </router-link>

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
import Header from '../components/Header.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Header,
  },
});
</script>

<style scoped lang="scss">
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
.button {
  background-color: none; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.text_bottom_centered{
  position:relative;
  bottom: 60px;
  left: 50%;
  color: black;
  transform: translate(-50%, -50%);
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
