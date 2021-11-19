<template>
  <ion-page>
    <Header title="Home" />
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import { add } from "ionicons/icons";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";

export default defineComponent({
  name: "Home",
  components: {
    IonPage,
    Header,
  },
  setup() {
    return {
      router: useRouter(),
      add,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>