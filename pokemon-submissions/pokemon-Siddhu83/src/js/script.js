'use strict';

const addDefaultListeners = () => {
  const search = document.getElementById('search-bar');
  search.addEventListener('focus', createPopup);
};

const makeMainEventListeners = () => {
  const search = document.getElementById('search-bar');
  search.removeEventListener('focus', createPopup);
  search.value = '';
  search.addEventListener('input', () => performSearch(event));
  return;
};

async function makeResearchOnAPI() {
  const rawData = await makeFetchCall("https://pokeapi.co/api/v2/poemon/1/");
  console.log('stats: ' , rawData);
};

const main = async () => {
  displayLoader();
  addDefaultListeners();
  const pokemonData = await createPokemon();
  displayPokemons(pokemonData);
  makeMainEventListeners();
  // makeResearchOnAPI();
};

window.onload = main;
