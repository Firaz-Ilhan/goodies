<template>
  <ion-page>
    <Header title="Meine Bestellungen" :hasBackButton="true" />
    <div class="wrapper">
      <p>{{ ordersDetails.name }}</p>
    </div>
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import firebase from 'firebase';
import Header from '../components/Header.vue';
import { db } from '../main';

export default defineComponent({
  name: 'OrderDetails',
  components: {
    Header,
    IonPage,
  },

  methods: {
    getOrderDetail() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection('test')
            .where('createdBy', '==', user.uid)
            .onSnapshot((docData: firebase.firestore.DocumentData) => {
              const changes = docData.docChanges();
              changes.forEach((change: firebase.firestore.DocumentChange) => {
                if (
                  change.type === 'added' &&
                  change.doc.id == this.$route.params.id
                ) {
                  this.ordersDetails = change.doc.data();
                  console.log(this.ordersDetails);
                }
              });
            });
        }
      });
    },
  },

  data() {
    const ordersDetails = {};
    this.getOrderDetail();
    return {
      ordersDetails,
    };
  },
});
</script>

<style></style>
