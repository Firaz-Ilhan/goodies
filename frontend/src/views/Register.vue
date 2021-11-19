<template>
  <div>
    <AuthenticationForm :mode="'register'"></AuthenticationForm>
  </div>
</template>

<script lang="ts">
import AuthenticationForm from '../components/AuthenticationForm.vue';

export default {
  components: { AuthenticationForm },
};
</script>

<style scoped></style>
