<script setup>
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from "vue-toastification";


const router = useRouter();
const route = useRoute();
const toast = useToast();

const state = reactive({});

const postId = route.params.id;
const form = reactive({
  title: '',
  author: ''
});

onMounted(async () => {
    try {
        const response = await fetch(`http://localhost:8000/posts/${postId}`);
        const json = await response.json();
        state.value = json;

        form.title = state.value.title;
        form.author = state.value.author;
    } catch (error) {
        console.log(error);
    }
});

const updatePost = async () => {
  try {
    const response = await fetch(`http://localhost:8000/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: form.title,
        author: form.author
      })
    });
    if (!response.ok) {
      throw new Error('Errore nella modifica del post');
    }
    toast.success("Post modificato con successo!")
    form.title = '';
    form.author = '';
    router.push({ name: 'home' });
  } catch (error) {
    toast.error("Errore nella modifica del post!");
    console.log(error);
  }
}

</script>

<template>
  <main class="container">
    <BackButton />
    <h1>Modifica Post</h1>

    <form @submit.prevent="updatePost">
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
        value="Modifica"
      />
    </form>
  </main>
</template>

