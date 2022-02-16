<template>
  <div>
    <ion-card>
      <ion-card-content @input="emit('updateProfile', profileRef)">
        <h1 class="caption">Persönliche Angaben</h1>
        <ion-item>
          <ion-label position="floating">Vorname</ion-label>
          <ion-input
            type="text"
            v-model="profileRef.firstname"
            autocomplete="given-name"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nachname</ion-label>
          <ion-input
            type="text"
            v-model="profileRef.lastname"
            toaucomplete="family-name"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Straße</ion-label>
          <ion-input
            type="text"
            v-model="profileRef.street"
            autocomplete="street-address"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Ort</ion-label>
          <ion-input
            type="text"
            v-model="profileRef.city"
            autocomplete="address-level2"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Postleitzahl</ion-label>
          <ion-input
            type="text"
            inputmode="numeric"
            v-model="profileRef.postalcode"
            autocomplete="postal-code"
            required
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Telefon</ion-label>
          <ion-input
            type="text"
            inputmode="tel"
            v-model="profileRef.telephone"
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
            v-model="profileRef.payment"
            value="barzahlung"
            @click="
              emit('radioTouched');
              emit('updateProfile', profileRef);
            "
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
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import {
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonInput,
} from '@ionic/vue';
import { IProfile } from '../interfaces/IProfile';
import { useProfile } from '../composables/useProfile';
import { auth } from '@/main';

const emit = defineEmits(['updateProfile', 'radioTouched']);
const profileRef = ref({} as IProfile);

// fetch profile data and update state
const user = auth.currentUser;

if (user) {
  useProfile()
    .resolveProfileId(user.uid)
    .then((profileData) => {
      profileRef.value = { ...profileData };
    });
}
</script>
