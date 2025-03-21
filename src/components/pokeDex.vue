<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { getSearchPokemon, getAllPokemon } from '../services/api.ts';
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
  urlPokemonsLimit: 'https://pokeapi.co/api/v2/pokemon?limit=1025',
  pokemons: [],
  filterInput: [],
  pokemonID: 0,
});

const showSearchPokemon = async (pokemon: string) => {
  const pokeInfo = await getSearchPokemon(pokemon);

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

const fetchPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
  const jsonResponse = await response.json();
  data.pokemons = jsonResponse.results;
  data.filterInput = data.pokemons;

  if (data.pokemons !== undefined) {
    for (const [index, pokemon] of data.pokemons.entries()) {
      const pokeDetalhes = await fetch(pokemon.url);
      const pokeJson = await pokeDetalhes.json();
      pokemon.id = pokeJson.id;
    }
  }
};
fetchPokemons();

const filterPokemon = () => {
  const query = input.value.toLowerCase().trim();

  if (!query) {
    data.filterInput = data.pokemons;
  } else {
    data.filterInput = data.pokemons?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query),
    );
  }
};
watch(input, filterPokemon);

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
          <div class="info-top">
            <div class="info-name-number">
              <div class="name-pokedex">{{ data.nome }}</div>
              <div class="number-pokedex">{{ data.numero }}</div>
            </div>
            <div class="element-pokedex">{{ data.elemento }}</div>
          </div>
          <div class="pokedex-imagem">
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
        <div class="scroll">
          <div
            class="poke-list-container"
            v-for="pokemon in data.filterInput"
            :key="pokemon.name"
            @click="showSearchPokemon(pokemon.name)"
          >
            <p>{{ pokemon.id }}. {{ pokemon.name }}</p>
          </div>
        </div>
        <input type="text" placeholder="Buscar Pokemon" v-model="input" @input="filterPokemon" />
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
  width: 1000px;
  border: 1px solid black;
}

.pokedex-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 95%;
  border: 1px solid black;
}
.search-pokedex {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 95%;
  border: 1px solid black;
}

.screen-pokedex {
  margin: 2%;
  height: 40%;
  width: 100%;
  border: 1px solid black;
  font-size: 16px;
}

.info-top {
  padding: 5px;
  display: flex;
  justify-content: space-between;
}

.info-name-number {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.element-pokedex {
  display: flex;
  align-items: center;
  text-align: center;
  max-width: 140px;
}
.pokedex-imagem {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokedex-imagem img {
  width: 120px;
  height: 120px;
}
.pokedex-infos {
  display: flex;
  justify-content: space-between;
}

.pokedex-infos a {
  text-decoration: none;
  color: black;
}

.scroll {
  overflow-y: auto;
  border: 1px solid black;
  font-size: 15px;
  cursor: pointer;
}

.poke-list-container {
  background-color: rgb(1, 71, 71);
  padding: 3px;
}

.scroll :hover {
  background-color: rgb(255, 0, 0);
}
.scroll::-webkit-scrollbar {
  width: 8px;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
}
</style>
