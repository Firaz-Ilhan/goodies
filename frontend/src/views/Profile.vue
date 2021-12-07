<template>
    <ion-page>
        <Header title="Profil" :hasBackButton="true" ></Header>
        <ion-content>
            <form @submit.prevent="saveProfile">
                <div class="wrapper">
                    <ion-card>
                        <ion-card-content>
                            <div>PERSÖNLICHE ANGABEN</div>
                            <ion-item>
                                <ion-label position="floating">Vorname</ion-label>
                                <ion-input type="text" v-model="profile.firstname" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Nachname</ion-label>
                                <ion-input type="text" v-model="profile.lastname" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Straße</ion-label>
                                <ion-input type="text" v-model="profile.street" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Ort</ion-label>
                                <ion-input type="text" v-model="profile.location" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Postleitzahl</ion-label>
                                <ion-input type="text" v-model="profile.postalcode" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Telefon</ion-label>
                                <ion-input type="text" v-model="profile.telephone" required></ion-input>
                            </ion-item>
                        </ion-card-content>
                    </ion-card>
                    <ion-card>
                        <ion-card-content>
                        <div>ZAHLUNGSART</div>
                            <ion-list>
                                <ion-radio-group>
                                    <ion-item>
                                        <ion-label>Barzahlung</ion-label>
                                        <ion-radio v-model="profile.cash" slot="start" value="barzahlung"></ion-radio>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Paypal</ion-label>
                                        <ion-radio v-model="profile.paypal" slot="start" value="paypal"></ion-radio>
                                    </ion-item>
                                </ion-radio-group>
                            </ion-list>
                        </ion-card-content>
                    </ion-card>
                </div>
                <ion-button type="submit"> Speichern </ion-button>
            </form>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonContent,
    IonCard,
    IonLabel,
    IonInput,
    IonItem,
    IonCardContent,
    IonRadioGroup,
    IonRadio,
    IonList,
    IonButton,
} from '@ionic/vue';
import { db } from '../main';
import { defineComponent } from 'vue';
import firebase from 'firebase';
import Header from '../components/Header.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    Header,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
    IonCard,
    IonCardContent,
    IonRadioGroup,
    IonRadio,
    IonList,
    IonButton,
  },
  
  data() {
    return {
      profile: {
        firstname: '',
        lastname: '',
        street: '',
        location: '',
        postalcode: '',
        telephone: '',
        cash: false,
        paypal: true,
      },
    };
  },
  methods: {
    saveProfile() {
        console.log(`saved, ${this.profile.firstname}`)
        
  }
  }
});
</script>

<style scoped>
</style>