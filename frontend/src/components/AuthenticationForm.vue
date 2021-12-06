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
                ? useAuth().login(email, password, (message: string) => {
                    errorMsg = message;
                  })
                : useAuth().register(email, password, (message: string) => {
                    errorMsg = message;
                  })
            "
          >
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input
                v-model="email"
                type="email"
                autocomplete="email"
                autofocus
                required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input
                v-model="password"
                :autocomplete="
                  mode === 'login' ? 'current-password' : 'new-password'
                "
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
import { useAuth } from '../composables/useAuth';

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

    return {
      ...toRefs(state),
      useAuth,
    };
  },
};
</script>

<style scoped lang="scss">
.center {
  display: flex;
  height: 90vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.error-message {
  display: inline-block;
  color: var(--ion-color-danger);
  padding: 4px 16px;
  margin: 16px;
  border-radius: 8px;
  background-color: rgba(#eb445a, 0.1);
}

p {
  margin-top: 2rem;
  text-align: center;
}
</style>
