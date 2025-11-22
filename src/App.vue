<script setup lang="ts">
import { onMounted } from 'vue';
import { usePalestrasStore } from './pinia/palestras';

const palestrasStore = usePalestrasStore();

onMounted( () => palestrasStore.carregarPalestras() );
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
