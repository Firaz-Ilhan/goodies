<template>
  <ion-page>
    <Header title="Profil" :hasBackButton="true"></Header>
    <ion-content>
      <form @submit.prevent="handleSave" @input="isTouched = true">
        <ProfileForm
          v-if="profile.payment"
          :profile="profile"
          :radioTouched="() => (isTouched = true)"
        ></ProfileForm>

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
import { IonContent, IonButton, IonToast } from '@ionic/vue';
import { defineComponent, reactive, toRefs, ref } from 'vue';
import firebase from 'firebase';

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

    // fetch profile data and update state
    const user = firebase.auth().currentUser!;
    const setProfile = (profileData: IProfile) => {
      state.profile = { ...profileData };
    };
    useProfile().resolveProfileId(user.uid, setProfile);

    // handle saving / updating profile data
    const handleSave = () => {
      useProfile().saveProfileWithGeocoding(state.profile, () =>
        setToastActive(true),
      );
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
