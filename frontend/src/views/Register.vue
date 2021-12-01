<template>
  <ion-page>
    <AuthenticationForm :mode="'register'" />
  </ion-page>
</template>

<script lang="ts">
import AuthenticationForm from '../components/AuthenticationForm.vue';

export default {
  components: { AuthenticationForm },
};
</script>

<style scoped></style>
