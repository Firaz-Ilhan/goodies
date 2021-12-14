<template>
  <ion-page>
    <Header title="Lieferansicht" :hasBackButton="true" />
    <ion-content>
     <h1>...</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Header from '../components/Header.vue';


export default defineComponent({
  name: 'DeliverOverview',
  components: {
    Header,
  }
});


</script>

<style scoped>
.order-container {
  margin: 30px;
}
</style>