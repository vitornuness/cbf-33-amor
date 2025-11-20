<script setup lang="ts">
import { onMounted } from 'vue';
import Hero from './components/Hero.vue';
import { usePalestrasStore } from './pinia/palestras';

const palestrasStore = usePalestrasStore();

onMounted( () => palestrasStore.carregarPalestras() );
</script>

<template>
  <main class="container" style="max-width: 600px;">
    <Hero />
  </main>
</template>

<style scoped></style>
