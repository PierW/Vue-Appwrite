import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PostView from '@/views/PostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostView,
    },

    {
      path: '/posts/add',
      name: 'add-post',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddPostView.vue'),
    },
    {
      path: '/posts/edit/:id',
      name: 'edit-post',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EditPostView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // route catch-all per 404
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
