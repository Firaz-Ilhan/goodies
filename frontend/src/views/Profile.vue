<template>
  <ion-page>
    <Header title="Profil" :hasBackButton="true"></Header>
    <ion-content>
      <form @submit.prevent="handleSave" @input="isTouched = true">
        <ProfileForm @radioTouched="() => (isTouched = true)"></ProfileForm>

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
