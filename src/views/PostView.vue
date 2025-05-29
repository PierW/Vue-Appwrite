<script setup>
import BackButton from '@/components/BackButton.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const postId = route.params.id;
const post = ref({});


onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8000/posts/${postId}`);
    const json = await response.json();
    post.value = json;
  } catch (error) {
    console.log(error);
  }
});

const deletePost = async () => {
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
}

const updatePost = () => {
    router.push({ name: 'edit-post', params: { id: postId } });
}


</script>


<template>
    <main class="container">
        <BackButton />
        <div v-if="post.id">
            <div>
                <strong>Id:</strong>
                {{ post.id }}
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