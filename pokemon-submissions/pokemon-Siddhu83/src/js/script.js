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

const main = async () => {
  displayLoader();
  addDefaultListeners();
  const pokemonData = await createPokemon();
  displayPokemons(pokemonData);
  makeMainEventListeners();
};

window.onload = main;
