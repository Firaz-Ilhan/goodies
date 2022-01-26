<template>
  <ion-page>
    <Header title="Profil" :hasBackButton="true"></Header>
    <ion-content>
      <form @submit.prevent="handleSave" @input="isTouched = true">
        <ProfileForm
          @updateProfile="(profileData) => (profile = profileData)"
          @radioTouched="() => (isTouched = true)"
        ></ProfileForm>

        <ion-button
          class="btn-center ion-margin-vertical"
          type="submit"
          :disabled="!isTouched || isLoading"
        >
          Speichern
          <ion-spinner
            v-if="isLoading"
            color="light"
            name="bubbles"
          ></ion-spinner>
        </ion-button>

        <ion-toast
          :is-open="isToastActive"
          message="Änderungen gespeichert."
          color="success"
          position="top"
          :duration="2000"
          @didDismiss="() => (isToastActive = false)"
        >
        </ion-toast>
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonButton, IonToast, IonSpinner } from '@ionic/vue';
import { defineComponent, reactive, toRefs } from 'vue';

import type { IProfile } from '../interfaces/IProfile';
import Header from '../components/Header.vue';
import ProfileForm from '../components/ProfileForm.vue';
import { useProfile } from '../composables/useProfile';

export default defineComponent({
  name: 'Profile',
  components: {
    Header,
    ProfileForm,
    IonContent,
    IonButton,
    IonToast,
    IonSpinner,
  },

  setup() {
    const state = reactive({
      profile: {} as IProfile,
      isTouched: false,
      isLoading: false,
      isToastActive: false,
    });

    // handle saving / updating profile data
    const handleSave = () => {
      state.isLoading = true;
      useProfile()
        .saveProfileWithGeocoding(state.profile)
        .then(() => {
          state.isToastActive = true;
          state.isLoading = false;
          state.isTouched = false;
        });
    };

    return {
      ...toRefs(state),
      handleSave,
    };
  },
});
</script>
