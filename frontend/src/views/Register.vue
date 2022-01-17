<template>
  <ion-page>
    <AuthenticationForm :mode="'register'" />
  </ion-page>
</template>

<script setup lang="ts">
import AuthenticationForm from '../components/AuthenticationForm.vue';
</script>
