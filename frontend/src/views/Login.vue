<template>
  <div>
    <AuthenticationForm :mode="'login'"></AuthenticationForm>
  </div>
</template>

<script lang="ts">
import AuthenticationForm from '../components/AuthenticationForm.vue';

export default {
  components: { AuthenticationForm },
};
</script>

<style scoped></style>
