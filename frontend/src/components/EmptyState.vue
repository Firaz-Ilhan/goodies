<template>
  <img
    src="@/assets/images/illustration_empty_state_orders.svg"
    alt="Leeres Paket"
  />
  <p>{{ message }}</p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  message: string;
}>();
</script>

<style scoped>
img {
  display: block;
  margin: 0 auto;
}
</style>
