export async function getSearchPokemon(pokemon: string) {
  const apiPokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

  return (await fetch(apiPokemonURL)).json()
}
