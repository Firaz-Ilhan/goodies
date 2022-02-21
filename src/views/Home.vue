<template>
  <ion-page>
    <Header title="Home"></Header>

    <ion-content>
      <div class="wrapper">
        <h1>Herzlich Willkommen bei goodies!</h1>
        <p>Hier helfen Nachbarn Nachbarn.</p>
        <br/>
        <p><strong>Triff deine Auswahl:</strong></p>
        <p>Möchtest du<br /><strong>Deinen Nachbarn unterstützen?</strong></p>

    
        <router-link to="/deliveries">
          <div class="ion-activatable ripple-parent">
          <img class="deliver_img" src="../assets/images/deliver.png"  alt="Einkaufen und Liefern">
            <p class="delvier_txt"> Einkaufen & <br/> Liefern</p>
            <ion-ripple-effect></ion-ripple-effect>
          </div>        
        </router-link>    
        <br/>
        <br/>
        <p>Oder möchtest du<br /><strong> dir etwas liefern lassen?</strong></p>
      
        <router-link to="/orders">
          <div class="ion-activatable ripple-parent2">
           <img class="order_img" src="../assets/images/order.png"  alt="Einkaufen und Liefern">
           <p class="order_txt">Bestellen</p>
            <ion-ripple-effect></ion-ripple-effect>
          </div>        
        </router-link>
        <br/>
        <br/>
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
import { IonContent, IonRippleEffect } from '@ionic/vue';
import Header from '../components/Header.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Header, IonContent, IonRippleEffect

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
    background-color: none;
    width: 200px;
    height: 170px;
    border-width: 3px; 
    border-color: #FF9E16; 
    border-radius: 100px 100px 100px 100px; 
      box-shadow: 0px 3px 3px 3px #FF9E16;
    color: black;
    text-align: center;
    display: inline-block;
    font-size: 16px;
  }

  .ripple-parent2 {
    position: relative;
    overflow: hidden;
    background-color: none;
    width: 200px;
    height: 170px;
    border-width: 3px; 
    border-color: #60D58E; 
    border-radius: 100px 100px 100px 100px; 
     box-shadow: 0px 3px 3px 3px #60D58E;
    color: black;
    text-align: center;
    display: inline-block;
    font-size: 16px;
  }
.deliver_img{
  width:70%;
}
.delvier_txt{
 position: absolute;
 bottom: 0px;
 left: 50%;
 transform: translate(-50%);
}
.order_img{
  width: 80%;
 }
.order_txt{
 position: absolute;
 bottom: 0px;
 left: 50%;
 transform: translate(-50%);
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
