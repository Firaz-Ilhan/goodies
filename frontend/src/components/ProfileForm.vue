<template>
  <ion-card>
    <ion-card-content @input="emit('update:profile', profileRef)">
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
          v-model="profileRef.postalcode"
          autocomplete="postal-code"
          required
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Telefon</ion-label>
        <ion-input
          type="text"
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
          @click="radioTouched"
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
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';
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

const props = defineProps<{
  profile: IProfile;
  // needed workaround to detect a a change in the radioform
  radioTouched?: () => void;
}>();

const emit = defineEmits(['update:profile']);
const profileRef = ref(props.profile);
</script>

<style scoped lang="scss"></style>
