'use strict';

async function fetchPokemonDataAndDetails () {
  const pokemonListElement = document.getElementById('pokemon-list');
  pokemonListElement.innerHTML = '';
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'block';
  }
  const data = await fetchPokemonData();
  const pokemonPromises = [];
  data.results.forEach((pokemon) => {
    pokemonPromises.push(fetchPokemonDetails(pokemon.url));
  });
  const pokemonDataArray = await Promise.all(pokemonPromises);
  return pokemonDataArray;
};

async function filterPokemons(pokemonDataArray, query) {
  const filteredPokemons = [];
  for (let i = 0; i < pokemonDataArray.length; i++) {
    const pokemon = pokemonDataArray[i];
    if (pokemon !== null) {
      if (pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
        pokemon.id.toString().includes(query) ||
        pokemon.types.some(type => type.type.name.toLowerCase().includes(query.toLowerCase()))) {
        filteredPokemons.push(pokemon);
      }
    }
  }
  return filteredPokemons;
};

async function displayPokemons(query) {
  const pokemonDataArray = await fetchPokemonDataAndDetails();
  const filteredPokemons = await filterPokemons(pokemonDataArray, query);
  const pokemonListElement = document.getElementById('pokemon-list');
  pokemonListElement.innerHTML = '';
  filteredPokemons.forEach(pokemon => {
    addPokemonDetails(pokemon, pokemonListElement);
  });
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
};

window.onload = function () {
  document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value;
    displayPokemons(query);
  });
};
