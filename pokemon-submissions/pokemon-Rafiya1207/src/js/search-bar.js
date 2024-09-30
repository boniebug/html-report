const searchPokemons = (pokemons, value) => {
  const searchedPokemons = [];
  for (const pokemon of pokemons) {
    for (const key in pokemon) {
      if (String(pokemon[key]).includes(value.toLowerCase())) {
        searchedPokemons.push(pokemon);
        break;
      }
    }
  }
  return searchedPokemons;
};

const handleSearchOperation = (pokemons) => {
  const userInput = document.querySelector('.search-bar').value;
  if (userInput === '') {
    renderPokemons(pokemons);
    return;
  }
  const matchedPokemons = searchPokemons(pokemons, userInput);
  if (matchedPokemons.length === 0) {
    loader('no results');
    return;
  }
  renderPokemons(matchedPokemons);
};