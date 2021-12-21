<template>
  <ion-page>
    <Header title="Profil" :hasBackButton="true"></Header>
    <ion-content>
      <form @submit.prevent="handleSave" @input="isTouched = true">
        <div>
          <ion-card>
            <ion-card-content>
              <h1 class="caption">Persönliche Angaben</h1>
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
              <h1 class="caption">Zahlungsart</h1>
              <ion-list>
                <ion-radio-group
                  name="payment"
                  v-model="profile.payment"
                  value="barzahlung"
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
        <ion-button
          class="btn-center ion-margin-vertical"
          type="submit"
          :disabled="!isTouched"
        >
          Speichern
        </ion-button>
        <ion-toast
          :is-open="toastActive"
          message="Änderungen gespeichert."
          color="medium"
          position="top"
          :duration="2000"
          @didDismiss="setToastActive(false)"
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
import { defineComponent, reactive, toRefs, ref } from 'vue';
import firebase from 'firebase';
import type { IProfile } from '../interfaces/IProfile';
import Header from '../components/Header.vue';
import { useProfile } from '../composables/useProfile';
import { useGeolocation } from '../composables/useGeolocation';

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
      profile: {} as IProfile,
      isTouched: false,
    });

    // show toast state
    const toastActive = ref(false);
    const setToastActive = (state: boolean) => {
      toastActive.value = state;
    };

    // get profile data
    const user = firebase.auth().currentUser!;
    const setProfile = (profileData: IProfile) => {
      state.profile = { ...profileData };
    };
    useProfile().resolveProfileId(user.uid, setProfile);

    // handle saving / updating profile data
    const handleSave = () => {
      const { street, city, postalcode } = state.profile;
      const formatedAddress = `${street}, ${city}, ${postalcode}`;
      state.isTouched = false;

      // sets translated address as geocordinates
      useGeolocation().geoCodeAdress(formatedAddress, state.profile.geocoords);
      // save profile data to firebase and show toast
      useProfile().saveProfile(state.profile, () => setToastActive(true));
    };

    return {
      ...toRefs(state),
      toastActive,
      setToastActive,
      handleSave,
    };
  },
});
</script>
