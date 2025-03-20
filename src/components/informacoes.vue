<script setup lang="ts">
import type { TiposDados } from '@/services/types';
const props = defineProps<Props>();

type Props = {
  data: TiposDados;
};
</script>

<template>
  <div class="poke-info">
    <p>Espécie: {{ data.especie }}</p>
    <p>Peso: {{ data.peso }}kg</p>
    <p>
      Vida:<progress :value="data.vida" max="1000" class="status-bar"></progress> {{ data.vida }}
    </p>
    <p>
      Ataque:<progress :value="data.ataque" max="500" class="status-bar"></progress>
      {{ data.ataque }}
    </p>
    <p>
      Defesa:<progress :value="data.defesa" max="500" class="status-bar"></progress>
      {{ data.defesa }}
    </p>
    <p>
      Atk.Especial:<progress :value="data.ataqueSpecial" max="500" class="status-bar"></progress>
      {{ data.ataqueSpecial }};
    </p>
    <p>
      Def.Especial:<progress :value="data.defesaSpecial" max="500" class="status-bar"></progress>
      {{ data.defesaSpecial }}
    </p>
    <p>
      Velocida:<progress :value="data.velocida" max="500" class="status-bar"></progress>
      {{ data.velocida }}
    </p>
  </div>
</template>

<style scoped>
.poke-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 450px;
  height: 30vh;
  background-color: rgb(71, 88, 88);
}
</style>
