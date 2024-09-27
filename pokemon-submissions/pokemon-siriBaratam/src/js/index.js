'use strict';
const createPokemonObject = (pokemonData) => {
  const object = {
    name: pokemonData.name,
    id: pokemonData.id,
    type: pokemonData.types[0].type.name,
    imageUrl: pokemonData.sprites.front_default
  }
  return object;
};

const fetchPokemons = async () => {
  const pokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
  const pokemonsData = await pokemonsResponse.json();
  const pokemons = pokemonsData.results;
  const array = [];
  for (const pokemon of pokemons) {
    const pokemonResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonResponse.json();
    const object = createPokemonObject(pokemonData);
    array.push(object);
  };
  return new Promise((resolve, reject) => {
    resolve(array)
  });
};

const generateNewArray = (searchValue, array) => {
  const newArray = [];
  array.forEach((pokemon) => {
    const name = pokemon.name;
    const id = pokemon.id.toString();
    const type = pokemon.type;
    if (name.includes(searchValue) || type.includes(searchValue) || id.includes(searchValue)) {
      newArray.push(pokemon);
    }
  });
  return newArray;
};

const filterPokemons = (search, array) => {
  const outerContainer = document.querySelector('#outer-container');
  outerContainer.innerText = '';
  const value = search.value.toLowerCase();
  const newArray = generateNewArray(value, array);
  newArray.forEach(pokemon => {
    createPokemonContainer(pokemon, value);
  });
};

const addSearchAction = (array) => {
  const search = document.getElementById('search');
  search.addEventListener('input', () => { filterPokemons(search, array) });
};

const displayPokemons = (array) => {
  array.forEach(pokemon => {
    createPokemonContainer(pokemon);
  });
};

const afterFetchActions = () => {
  const main = document.getElementById('main');
  main.removeAttribute('class', 'main');
  const outerContainer = document.getElementById('outer-container');
  outerContainer.innerText = '';
  const header = document.getElementById('header');
  header.style.display = 'block';
};

const start = async () => {
  const array = await fetchPokemons();
  afterFetchActions();
  displayPokemons(array);
  addSearchAction(array);
};

window.onload = start;
