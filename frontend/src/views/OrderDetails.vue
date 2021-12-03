<template>
  <ion-page>
    <Header title="Meine Bestellungen" :hasBackButton="true" />
  </ion-page>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import Header from '../components/Header.vue';

export default defineComponent({
  name: 'OrderDetails',
  components: {
    Header,
  },
});
</script>

<style></style>
