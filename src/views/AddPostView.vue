<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { databases, ID } from '@/lib/appwrite.js';

const router = useRouter();
const toast = useToast();
const form = reactive({
  title: '',
  author: ''
});

// CREATE CON LIVE-SERVER
/* const createPost = async () => {
  try {
    const response = await fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: form.title,
        author: form.author
      })
    });
    if (!response.ok) {
      throw new Error('Errore nella creazione del post');
    }
    toast.success("Post creato con successo!")
    form.title = '';
    form.author = '';
    router.push({ name: 'home' });
  } catch (error) {
    toast.error("Errore nella creazione del post!");
    console.log(error);
  }
} */

// CREATE CON APPWRITE
const createPost = async () => {
  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      ID.unique(),
      { 
        title: form.title,
        author: form.author
      }
    );
    toast.success("Post creato con successo!")
    form.title = '';
    form.author = '';
    router.push({ name: 'home' });
  } catch (error) {
    toast.error("Errore nella creazione del post!");
    console.log(error);
  }
}

</script>

<template>
  <main class="container">
    <h1>Crea Post</h1>

    <form @submit.prevent="createPost">
      <fieldset>
        <label>
          Title
          <input
            v-model="form.title"
            name="title"
            placeholder="Aggiungi Titolo"
            autocomplete="given-name"
          />
        </label>
        <label>
          Autore
          <input
           v-model="form.author"
            name="author"
            placeholder="Nome dell'autore"
            autocomplete="author"
          />
        </label>
      </fieldset>

      <input
        type="submit"
        value="Crea"
      />
    </form>
  </main>
</template>

