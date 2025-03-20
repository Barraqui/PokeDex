<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getSearchPokemon } from '../services/api.ts';
import type { TiposDados } from '../services/types.ts';
import Informacoes from './informacoes.vue';
import Golpes from './golpes.vue';

const input = ref();
const activeComponent = ref('');

const data = reactive<TiposDados>({
  nome: '',
  numero: '',
  elemento: '',
  pokemonImg: '',
  especie: '',
  peso: undefined,
  vida: undefined,
  ataque: undefined,
  defesa: undefined,
  ataqueSpecial: undefined,
  defesaSpecial: undefined,
  velocida: undefined,
  habilidade: [],
});

const showSearchPokemon = async (pokemon: string) => {
  console.log(pokemon);
  const pokeInfo = await getSearchPokemon(pokemon);
  console.log(pokeInfo);

  data.nome = pokeInfo.name;
  data.numero = pokeInfo.id;
  data.pokemonImg = pokeInfo.sprites.front_default;
  data.especie = pokeInfo.species.name;
  data.peso = pokeInfo.weight / 10;
  data.vida = pokeInfo.stats[0].base_stat;
  data.ataque = pokeInfo.stats[1].base_stat;
  data.defesa = pokeInfo.stats[2].base_stat;
  data.ataqueSpecial = pokeInfo.stats[3].base_stat;
  data.defesaSpecial = pokeInfo.stats[4].base_stat;
  data.velocida = pokeInfo.stats[5].base_stat;
  data.habilidade = pokeInfo.moves.map((move: any) => move.move.name);

  if (pokeInfo.types.length > 1) {
    data.elemento = pokeInfo.types[0].type.name + ' ' + pokeInfo.types[1].type.name;
  } else {
    data.elemento = pokeInfo.types[0].type.name;
  }
};

function searchBtn() {
  const pokemonName = input.value.trim();
  showSearchPokemon(pokemonName);
}

function setActiveComponent(component: string) {
  activeComponent.value = component;
}
</script>

<template>
  <div class="main-container">
    <div class="pokedex-main-container">
      <div class="pokedex-container">
        <div class="screen-pokedex">
          <div class="info-name-number">
            <div class="name-pokedex">{{ data.nome }}</div>
            <div class="number-pokedex">{{ data.numero }}</div>
          </div>
          <div class="element-pokedex">{{ data.elemento }}</div>
          <div class="pokedex-imagen">
            <img
              class="img-pokemon"
              v-if="data.pokemonImg"
              :src="data.pokemonImg"
              :alt="data.pokemonImg"
            />
          </div>
        </div>
        <div class="pokedex-infos">
          <a href="" @click.prevent="setActiveComponent('info')">Informações</a>
          <a href="" @click.prevent="setActiveComponent('habilidade')">Habilidades</a>
        </div>
        <div v-if="activeComponent === 'info'">
          <Informacoes :data="data" />
        </div>
        <div v-if="activeComponent === 'habilidade'">
          <Golpes :data="data" />
        </div>
      </div>
      <div class="search-pokedex">
        <input type="text" placeholder="Buscar Pokemon" v-model="input" />
        <button @click="searchBtn">testando</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(54, 54, 54);
}
.pokedex-main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 700px;
  border: 1px solid black;
}

.pokedex-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 95%;
  height: 95%;
  border: 1px solid black;
}
.search-pokedex {
  display: flex;
  align-items: flex-end;
  width: 50%;
  height: 95%;
  border: 1px solid black;
}
.screen-pokedex {
  margin: 2%;
  height: 40%;
  width: 100%;
  border: 1px solid black;
}
.pokedex-infos {
  display: flex;
  justify-content: space-between;
}
.pokedex-infos a {
  text-decoration: none;
  color: black;
}
</style>
