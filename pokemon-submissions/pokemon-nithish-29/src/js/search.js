'use strict';

const searchPokemon = async (searchedItem) => {
  onloadPokemons('flex');
  const allPokemonsData = await fetchpokemonData(); 
  onloadPokemons('none');
  const searchedPokemons = allPokemonsData.filter(pokemon => {
    const nameMatches = pokemon.name.toLowerCase().includes(searchedItem);
    const idMatches = pokemon.id.toString().includes(searchedItem);
    const typeMatches = pokemon.types.some(typeInfo => 
      typeInfo.type.name.toLowerCase().includes(searchedItem)
    );
    return nameMatches || idMatches || typeMatches;
  });
  searchedPokemons.forEach(pokemon => createPokemonDiv(pokemon));
};

const setupSearch = () => {
  const search = document.getElementById('search');
  const searchedItem = search.value.toLowerCase();
  const container = document.getElementById('allpokemons');
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }
  searchPokemon(searchedItem);
};
