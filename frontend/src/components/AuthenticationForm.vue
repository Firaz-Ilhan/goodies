<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{
          mode === 'login' ? 'Anmelden' : 'Registrierung'
        }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            {{ mode === 'login' ? 'Login' : 'Registrierung' }}</ion-card-title
          >
        </ion-card-header>

        <ion-card-content>
          <form
            @submit.prevent="
              mode === 'login'
                ? login(email, password)
                : register(email, password)
            "
          >
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email" type="email" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input
                v-model="password"
                type="password"
                required
              ></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{ mode === 'login' ? 'Login' : 'Registrieren' }}
            </ion-button>
          </form>
        </ion-card-content>

        <ion-card-content v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </ion-card-content>
      </ion-card>

      <p v-if="mode === 'login'">
        Keinen Account?
        <router-link to="/register">Hier registrieren.</router-link>
      </p>
      <p v-else>
        Bereits registriert?
        <router-link to="/login">Zum Login.</router-link>
      </p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
} from '@ionic/vue';
import { reactive, toRefs } from 'vue';
import firebase from 'firebase';

export default {
  name: 'AuthenticationForm',
  props: ['mode'],
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
  },
  setup() {
    const state = reactive({
      email: '',
      password: '',
      errorMsg: '',
    });

    const login = (email: string, password: string) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          state.errorMsg = error.message;
        });
    };

    const register = (email: string, password: string) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          state.errorMsg = error.message;
        });
    };

    return {
      ...toRefs(state),
      register,
      login,
    };
  },
};
</script>

<style scoped>
.center {
  display: flex;
  height: 90vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.error-message {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  text-align: center;
}
</style>
