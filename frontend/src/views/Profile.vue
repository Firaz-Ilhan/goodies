<template>
    <ion-page>
        <Header title="Profil" :hasBackButton="true" ></Header>
        <ion-content>
            <form>
                <div class="wrapper">
                    <ion-card>
                        <ion-card-content>
                            <div>PERSÖNLICHE ANGABEN</div>
                            <ion-item>
                                <ion-label position="floating">Vorname</ion-label>
                                <ion-input required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Nachname</ion-label>
                                <ion-input required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Straße</ion-label>
                                <ion-input required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Ort</ion-label>
                                <ion-input required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Postleitzahl</ion-label>
                                <ion-input required></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Telefon</ion-label>
                                <ion-input required></ion-input>
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
import { defineComponent } from 'vue';
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
  }
});
</script>

<style scoped>
</style>