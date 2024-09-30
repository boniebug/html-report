'use strict';

const searchPokemon = async (searchedItem) => {
  const searchedPokemons = allPokemonsData.filter(pokemon => {
    const nameMatches = pokemon.name.toLowerCase().includes(searchedItem);
    const idMatches = pokemon.id.toString().includes(searchedItem);
    let typeMatches = false;
    for (const typeInfo of pokemon.types) {
      if (typeInfo.type.name.includes(searchedItem)) {
        typeMatches = true;
        break;
      }
    }
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
