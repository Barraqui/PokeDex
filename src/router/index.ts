import { createRouter, createWebHistory } from 'vue-router';
import Informacoes from '@/components/informacoes.vue';
import Golpes from '@/components/golpes.vue';
import PokeDexView from '@/views/pokeDexView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokeDexView,
    },
    {
      path: '/info',
      name: 'informaçoes',
      component: Informacoes,
    },
    {
      path: '/habili',
      name: 'habilidades',
      component: Golpes,
    },
  ],
});

export default router;
