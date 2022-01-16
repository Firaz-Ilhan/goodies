<template>
  <ion-page>
    <AuthenticationForm :mode="'login'" />
  </ion-page>
</template>

<script setup lang="ts">
import AuthenticationForm from '../components/AuthenticationForm.vue';
</script>
