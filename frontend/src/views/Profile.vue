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
                                <ion-input type="text" v-model="profile.firstname" autocomplete="given-name" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Nachname</ion-label>
                                <ion-input type="text" v-model="profile.lastname" toaucomplete="family-name" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Straße</ion-label>
                                <ion-input type="text" v-model="profile.street" autocomplete="street-address" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Ort</ion-label>
                                <ion-input type="text" v-model="profile.location" autocomplete="street-address" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Postleitzahl</ion-label>
                                <ion-input type="text" v-model="profile.postalcode" autocomplete="postal-code" required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Telefon</ion-label>
                                <ion-input type="text" v-model="profile.telephone" autocomplete="tel" required></ion-input>
                            </ion-item>
                        </ion-card-content>
                    </ion-card>
                    <ion-card>
                        <ion-card-content>
                        <div>ZAHLUNGSART</div>
                            <ion-list>
                                <ion-radio-group name="payment" v-model="profile.payment">
                                    <ion-item>
                                        <ion-label>Barzahlung</ion-label>
                                        <ion-radio  slot="start" value="barzahlung"></ion-radio>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Paypal</ion-label>
                                        <ion-radio  slot="start" value="paypal"></ion-radio>
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
import { defineComponent, reactive, toRefs } from 'vue';
import firebase from 'firebase';
import {IProfile} from '../interfaces/IProfile';
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
  
  setup() {

      const state = reactive({ 
          profile: {
            firstname: '',
            lastname: '',
            street: '',
            location: '',
            postalcode: '',
            telephone: '', 
            payment: 'barzahlung',
          }
        });

      const saveProfile = () => {
        const currentUser =  firebase.auth().currentUser!;
        console.log("Profile",state.profile)
        db.collection('profiles').doc(currentUser.uid).set({...state.profile});
      };

     const getProfileData = () => {
        const currentUser =  firebase.auth().currentUser!;
        console.log("Profile", state.profile)
        db.collection('profiles').doc(currentUser.uid).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                state.profile = doc.data() as IProfile
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      };

      getProfileData()

    return {
      ...toRefs(state),
      saveProfile,
    };
    
},
});
</script>

<style scoped>
</style>