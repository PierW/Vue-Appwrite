<script setup>
import { ref, onMounted} from 'vue'
import { RouterLink } from 'vue-router';


const posts = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/posts');
    const json = await response.json();
    posts.value = json;
  } catch (error) {
    console.log(error);
  }
});

</script>

<template>
  <main class="container"> 
    <div v-for="(post, index) in posts" :key="index">
      <article>
        <RouterLink :to="`/posts/${post.id}`" :post>
          {{ post.title }}
        </RouterLink>
      </article>
    </div>
  </main>
</template>
