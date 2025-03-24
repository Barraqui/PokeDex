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
      <div class="golpes">
        <span>{{ habilidade }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.golpes-pokemon-container {
  height: 20vh;
  overflow-y: auto;
  padding: 10px;
  padding-right: 250px;
  margin-top: 10px;
  color: var(--Color);
}
.golpes-pokemon-container::-webkit-scrollbar {
  width: 8px;
}

.golpes-pokemon-container::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
}
.golpes-pokemon {
  padding: 4px;
}
.golpes {
  width: 100%;
}
</style>
