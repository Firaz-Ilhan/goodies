<template>
  <ion-page>
    <Header title="Profil" :hasBackButton="true"></Header>
    <ion-content>
      <form @submit.prevent="saveProfile()" @input="isTouched = true">
        <div class="wrapper">
          <ion-card>
            <ion-card-content>
              <div>PERSÖNLICHE ANGABEN</div>
              <ion-item>
                <ion-label position="floating">Vorname</ion-label>
                <ion-input
                  type="text"
                  v-model="profile.firstname"
                  autocomplete="given-name"
                  required
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Nachname</ion-label>
                <ion-input
                  type="text"
                  v-model="profile.lastname"
                  toaucomplete="family-name"
                  required
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Straße</ion-label>
                <ion-input
                  type="text"
                  v-model="profile.street"
                  autocomplete="street-address"
                  required
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Ort</ion-label>
                <ion-input
                  type="text"
                  v-model="profile.city"
                  autocomplete="address-level2"
                  required
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Postleitzahl</ion-label>
                <ion-input
                  type="text"
                  v-model="profile.postalcode"
                  autocomplete="postal-code"
                  required
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Telefon</ion-label>
                <ion-input
                  type="text"
                  v-model="profile.telephone"
                  autocomplete="tel"
                  required
                ></ion-input>
              </ion-item>
            </ion-card-content>
          </ion-card>
          <ion-card>
            <ion-card-content>
              <div>ZAHLUNGSART</div>
              <ion-list>
                <ion-radio-group
                  name="payment"
                  v-model="profile.payment"
                  @click="isTouched = true"
                >
                  <ion-item>
                    <ion-label>Barzahlung</ion-label>
                    <ion-radio slot="start" value="barzahlung"></ion-radio>
                  </ion-item>
                  <ion-item>
                    <ion-label>Paypal</ion-label>
                    <ion-radio slot="start" value="paypal"></ion-radio>
                  </ion-item>
                </ion-radio-group>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </div>
        <ion-button class="btn-center" type="submit" :disabled="!isTouched">
          Speichern
        </ion-button>
        <ion-toast
          :is-open="isOpenRef"
          message="Änderungen gespeichert."
          color="success"
          position="top"
          :duration="2000"
          @didDismiss="setOpen(false)"
        >
        </ion-toast>
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
  IonToast,
} from '@ionic/vue';
import { db } from '../main';
import { defineComponent, reactive, toRefs, ref } from 'vue';
import firebase from 'firebase';
import { IProfile } from '../interfaces/IProfile';
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
    IonToast,
  },

  setup() {
    const state = reactive({
      profile: {
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        postalcode: '',
        telephone: '',
        payment: 'barzahlung',
      } as IProfile,
      isTouched: false,
    });

    // show toast state
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => (isOpenRef.value = state);

    // save/update profile
    const saveProfile = () => {
      const currentUser = firebase.auth().currentUser!;
      db.collection('profiles')
        .doc(currentUser.uid)
        .set({ ...state.profile })
        .then(() => {
          setOpen(true);
        });
    };

    // try to fetch profile data of current user
    const getProfileData = () => {
      const currentUser = firebase.auth().currentUser!;
      db.collection('profiles')
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            state.profile = doc.data() as IProfile;
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    };

    getProfileData();

    return {
      ...toRefs(state),
      saveProfile,
      isOpenRef,
      setOpen,
    };
  },
});
</script>
