<script setup lang="ts">
import type { TiposDados } from '@/services/types';
const props = defineProps<Props>();

type Props = {
  data: TiposDados;
};
</script>
<!-- puxar os pokes com nome e id, fazer um sistema de busca quando coloca 1 letra e aparece por filtro, select do valor clickado -->
<template>
  <div class="poke-info">
    <p class="poke-info-menu">Espécie: {{ data.especie }}</p>
    <p class="poke-info-menu">Peso: {{ data.peso }}kg</p>
    <div class="bar-container">
      <div class="bar">
        <p class="status-name">Vida:</p>
        <progress :value="data.vida" max="1000" class="status-bar"></progress>
        <p class="status-numero">
          {{ data.vida }}
        </p>
      </div>
      <div class="bar">
        <p class="status-name">Ataque:</p>
        <progress :value="data.ataque" max="500" class="status-bar"></progress>
        <p class="status-numero">{{ data.ataque }}</p>
      </div>
      <div class="bar">
        <p class="status-name">Defesa:</p>
        <progress :value="data.defesa" max="500" class="status-bar"></progress>
        <p class="status-numero">
          {{ data.defesa }}
        </p>
      </div>
      <div class="bar">
        <p class="status-name">Atk.Esp:</p>
        <progress :value="data.ataqueSpecial" max="500" class="status-bar"></progress>
        <p class="status-numero">
          {{ data.ataqueSpecial }}
        </p>
      </div>
      <div class="bar">
        <p class="status-name">Def.Esp:</p>
        <progress :value="data.defesaSpecial" max="500" class="status-bar"></progress>
        <p class="status-numero">
          {{ data.defesaSpecial }}
        </p>
      </div>
      <div class="bar">
        <p class="status-name">Velocida:</p>
        <progress :value="data.velocida" max="500" class="status-bar"></progress>
        <p class="status-numero">
          {{ data.velocida }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.poke-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  gap: 10px;
  width: 450px;
  height: 30vh;
  /* background-color: rgb(71, 88, 88); */
}
.poke-info-menu {
  font-size: 14px;
}
.bar-container {
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  gap: 10px;
  font-size: 13px;
}

.bar {
  display: flex;
}

.status-name {
  min-width: 120px;
}

.status-numero {
  margin-left: 10px;
}
.status-bar {
  width: 200px;
}
</style>
