<script setup>
import BackButton from '@/components/BackButton.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { databases } from '@/lib/appwrite.js';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const postId = route.params.id;
const post = ref({});


// FETCH JSON-SERVER SINGOLO TASK
/* onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8000/posts/${postId}`);
    const json = await response.json();
    post.value = json;
  } catch (error) {
    console.log(error);
  }
}); */

// FETCH SDK APPWRITE SINGOLO TASK
onMounted(async () => {
  try {
    const response = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      postId                  // ID del documento
    );
    post.value = response;
  } catch (error) {
    console.log(error);
  }
});


// FETCH DELETE CON JSON-SERVER
/* const deletePost = async () => {
    if (!confirm("Sei sicuro di voler eliminare questo post?")) {
        return;
    }
    try {
        const response = await fetch(`http://localhost:8000/posts/${postId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error("Errore nell'eliminazione del post!");
        toast.success("Post eliminato!");
        router.push({ name: 'home' });
    } catch (error) {
        toast.error("Errore nell'eliminazione del post!");
        console.log(error);
    }
} */

// FETCH DELETE CON SDK APPWRITE
const deletePost = async () => {
    if (!confirm("Sei sicuro di voler eliminare questo post?")) {
        return;
    }
    try {
        await databases.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            postId                  // ID del documento
        );
        toast.success("Post eliminato!");
        router.push({ name: 'home' });
    } catch (error) {
        toast.error("Errore nell'eliminazione del post!");
        console.log(error);
    }
}

const updatePost = () => {
    router.push({ name: 'edit-post', params: { id: postId } });
}


</script>


<template>
    <main class="container">
        <BackButton />
        <div v-if="post.$id">
            <div>
                <strong>Id:</strong>
                {{ post.$id }}
            </div>
            <div>
                <strong>Titolo:</strong>
                {{ post.title }}
            </div>
            <div>
                <strong>Autore:</strong>
                {{ post.author }}
            </div>
        </div>
        <div class="grid">
            <button class="secondary" @click="deletePost">Elimina Post</button>
            <button class="contrast" @click="updatePost">Modifica Post</button>
        </div>
    </main>
</template>