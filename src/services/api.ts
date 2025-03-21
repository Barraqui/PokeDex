export async function getSearchPokemon(pokemon: string) {
  const apiPokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  return (await fetch(apiPokemonURL)).json();
}

export async function getAllPokemon() {
  const apiAllPokemonsURL = `https://pokeapi.co/api/v2/`;

  return (await fetch(apiAllPokemonsURL)).json();
}
