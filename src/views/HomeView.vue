<script setup>
import { reactive, onMounted} from 'vue'
import { RouterLink } from 'vue-router';
import { databases } from '@/lib/appwrite.js';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';


//const posts = ref([]);

const state = reactive({
  posts: [],
  isLoading: true
});

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
    state.posts = response.documents;
  } catch (error) {
    console.log(error);
  } finally {
    state.isLoading = false;
  }
});

</script>

<template>
  <main class="container">
    <div v-if="state.isLoading" class="text-center">
      <PulseLoader color="gray"/>
    </div>
    <div v-for="post in state.posts" :key="post.$id">
      <article>
        <RouterLink :to="`/posts/${post.$id}`" :post>
          {{ post.title }}
        </RouterLink>
      </article>
    </div>
  </main>
</template>
