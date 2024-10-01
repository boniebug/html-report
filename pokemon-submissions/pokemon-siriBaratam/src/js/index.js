'use strict';
const createPokemonObject = (pokemonData) => {
  const object = {
    name: pokemonData.name,
    id: pokemonData.id,
    weight: pokemonData.weight,
    height: pokemonData.height,
    types: pokemonData.types,
    type: pokemonData.types[0].type.name,
    imageUrl: pokemonData.sprites.other.home.front_default || './src/images/noImage.png',
    imageOnHover: pokemonData.sprites.other.home.front_shiny || './src/images/noImage.png',
    abilities: pokemonData.abilities,
    statistics: pokemonData.stats,
    weakness: pokemonData.types,
    moves: pokemonData.moves
  }
  return object;
};

const fetchEachPokemon = async (pokemons) => {
  const array = [];
  const count = document.getElementById('count');
  for (const pokemon of pokemons) {
    count.innerText = parseInt(count.innerText) + 1;
    try {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      const object = createPokemonObject(pokemonData);
      array.push(object);
    }
    catch (err) { console.log(`error:${err}`) }
  }
  return array;
};

const fetchPokemons = async () => {
  try {
    const pokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const pokemonsData = await pokemonsResponse.json();
    const pokemons = pokemonsData.results;
    const array = fetchEachPokemon(pokemons);
    return new Promise((resolve, reject) => {
      resolve(array);
    });
  }
  catch (err) { console.log(`error:${err}`) }
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
  displayPokemons(newArray, value);
};

const addSearchAction = (array) => {
  const search = document.getElementById('search');
  search.removeAttribute('readonly');
  search.addEventListener('input', () => { filterPokemons(search, array) });
};

const removeLoader = () => {
  const loader = document.getElementById('loading-section');
  loader.style.display = 'none';
};

const designPokemonPopup = (popup, pokemon) => {
  showPopupContainer(popup);
  const movesBtn = document.getElementById(`${pokemon.name}-moves-btn`);
  const weaknessBtn = document.getElementById(`${pokemon.name}-weakness-btn`);
  movesBtn.addEventListener('click', () => { displayMoves(pokemon.moves, 'move', 'name', movesBtn, weaknessBtn) });
  weaknessBtn.addEventListener('click', () => { fetchWeakness(pokemon.weakness, weaknessBtn, movesBtn) });
};

const displayPokemons = (array, value) => {
  array.forEach(pokemon => {
    createPokemonContainer(pokemon, value);
    const popup = createPopupContainer(pokemon);
    const pokemonContainer = document.getElementById(pokemon.name);
    pokemonContainer.addEventListener('click', () => {designPokemonPopup(popup, pokemon)});
    const image = document.getElementById(`${pokemon.name}-image`);
    image.addEventListener('mouseover', () => { displayImageOnHover(pokemon, image) });
    image.addEventListener('mouseleave', () => { displayImageOnLeave(pokemon, image) });
  });
};

const start = async () => {
  const popup = createPopup();
  popupAction(popup);
  const array = await fetchPokemons();
  displayPokemons(array);
  removeLoader();
  removeWaitPopup(popup);
  addSearchAction(array);
};

window.onload = start;
