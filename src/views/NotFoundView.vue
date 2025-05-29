<script setup>
import { ref } from 'vue';

const bool = ref(true);

</script>

<template>
  <main class="container">
    <h1 v-if="bool">Pagina 404</h1>
  </main>
</template>

<style>

</style>
