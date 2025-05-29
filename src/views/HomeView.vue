<script setup>
import { ref, onMounted} from 'vue'
import { RouterLink } from 'vue-router';
import { databases } from '@/lib/appwrite.js';


const posts = ref([]);

// FETCH CON LIVE-SERVER
/* onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/posts');
    const json = await response.json();
    posts.value = json;
  } catch (error) {
    console.log(error);
  }
}); */

// FETCH CON APPWRITE
onMounted(async () => {
  try {
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID
    );
    posts.value = response.documents;
  } catch (error) {
    console.log(error);
  }
});

</script>

<template>
  <main class="container"> 
    <div v-for="post in posts" :key="post.$id">
      <article>
        <RouterLink :to="`/posts/${post.$id}`" :post>
          {{ post.title }}
        </RouterLink>
      </article>
    </div>
  </main>
</template>
