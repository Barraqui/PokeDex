<script setup lang="ts">
import type { TiposDados } from '@/services/types';
const props = defineProps<Props>();

type Props = {
  data: TiposDados;
};
</script>

<template>
  <div class="golpes-pokemon-container">
    <div class="golpes-pokemon" v-for="(habilidade, index) in data.habilidade" :key="index">
      <span>{{ habilidade }}</span>
    </div>
  </div>
</template>
<style scoped>
.golpes-pokemon-container {
  background-color: rgb(126, 67, 67);
  max-width: 100px;
  max-height: 220px;
  overflow-y: auto;
  padding: 10px;
  padding-right: 250px;
}
.golpes-pokemon-container::-webkit-scrollbar {
  width: 8px;
}

.golpes-pokemon-container::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
}
.golpes-pokemon {
  background-color: aqua;
  padding: 5px;
}
</style>
