<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ isLogin ? 'Anmelden' : 'Registrierung' }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <form @submit.prevent="handleSubmit">
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              {{ isLogin ? 'Login' : 'Registrierung' }}
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <p v-if="!isLogin" style="text-align: start; margin-top: 0">
              Damit unsere App wie erwartet funktioniert brauchen wir zuerst ein
              paar persönliche Angaben von dir.
            </p>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input
                v-model="email"
                type="email"
                autocomplete="email"
                required
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input
                v-model="password"
                :autocomplete="isLogin ? 'current-password' : 'new-password'"
                type="password"
                required
              ></ion-input>
            </ion-item>
            <ion-item v-if="!isLogin" lines="none">
              <ion-label class="legals"
                >Ich akzeptiere die <a href="/">AGB</a> und die
                <a href="/">Datenschutzerklräung</a>.</ion-label
              >
              <ion-checkbox
                button
                slot="start"
                :modelValue="legalAccepted"
              ></ion-checkbox>
            </ion-item>
            <ion-button
              v-if="isLogin"
              class="ion-margin-top btn-center"
              type="submit"
              :disabled="email.length === 0 || password.length === 0"
            >
              Login
            </ion-button>
          </ion-card-content>

          <ion-card-content v-if="errorMsg" class="error-message">
            {{ errorMsg }}
          </ion-card-content>
        </ion-card>

        <div v-if="!isLogin">
          <ProfileForm
            @updateProfile="(dataChange) => (profileData = dataChange)"
          ></ProfileForm>
          <ion-button
            class="ion-margin-top btn-center"
            type="submit"
            :disabled="email.length === 0 || password.length === 0"
          >
            Registrieren
          </ion-button>
        </div>
      </form>

      <p v-if="isLogin">
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
import { IProfile } from '@/interfaces/IProfile';
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
import { defineComponent, reactive, toRefs } from 'vue';
import { useAuth } from '../composables/useAuth';
import ProfileForm from '../components/ProfileForm.vue';

export default defineComponent({
  name: 'AuthenticationForm',
  props: { mode: { type: String } },
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
    ProfileForm,
  },
  setup(props) {
    const isLogin = props.mode === 'login';
    const { login, register } = useAuth();

    const state = reactive({
      email: '',
      password: '',
      errorMsg: '',
      profileData: {} as IProfile,
      legalAccepted: false,
    });

    const handleSubmit = () => {
      const { email, password, profileData } = state;
      if (isLogin) {
        login(email, password, (error: Error) => {
          state.errorMsg = error.message;
        });
      } else {
        register(email, password, profileData, (error: Error) => {
          state.errorMsg = error.message;
        });
      }
    };

    return {
      ...toRefs(state),
      isLogin,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
ion-card-title {
  margin-top: 8px;
  font-size: 24px;
}

form {
  max-width: 500px;
  margin: 3rem auto 0;
}

ion-checkbox {
  margin-right: 16px;
}
.legals {
  font-size: 14px;
}

p {
  margin-top: 2rem;
}
</style>
