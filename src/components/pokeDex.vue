<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getSearchPokemon } from '../services/api.ts'
import type { TiposDados } from '../services/types.ts'
import Informacoes from './informacoes.vue'
import Golpes from './golpes.vue'

const input = ref()
const activeComponent = ref('')

const data = reactive<TiposDados>({
  nome: '',
  numero: '',
  elemento: '',
  pokemonImg: '',
})

const showSearchPokemon = async (pokemon: string) => {
  console.log(pokemon)
  const pokeInfo = await getSearchPokemon(pokemon)
  console.log(pokeInfo)

  data.nome = pokeInfo.name
  data.numero = pokeInfo.id
  data.pokemonImg = pokeInfo.sprites.front_default
  if (pokeInfo.types.length > 1) {
    data.elemento = pokeInfo.types[0].type.name + ' ' + pokeInfo.types[1].type.name
  } else {
    data.elemento = pokeInfo.types[0].type.name
  }
}

function searchBtn() {
  const pokemonName = input.value.trim()
  showSearchPokemon(pokemonName)
}

function setActiveComponent(component: string) {
  activeComponent.value = component
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
          <RouterLink to="/habili">Habilidade</RouterLink>
          <RouterLink to="/habili">Status</RouterLink>
          <RouterLink to="/habili">Efetividade</RouterLink>
        </div>
        <div v-if="activeComponent === 'info'">
          <Informacoes />
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
  gap: 50px;
}
.pokedex-infos a {
  text-decoration: none;
  color: black;
}
</style>
