<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <header class="container">
    <nav>
      <ul>
        <li><strong>Ticket</strong></li>
      </ul>
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/posts/add">Crea Post</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
