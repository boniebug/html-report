'use strict';
const searchPokemon = (value) => {
  const search = document.getElementById('search');
  const dataOfPokemons = document.getElementsByClassName('pokemonClass');
  for (let index = 0; index < dataOfPokemons.length; index++) {
    const data = dataOfPokemons[index];
    if (data.innerText.toLowerCase().includes(value)) {
      data.style.display = 'block';
    } else {
      data.style.display = 'none';
    }
  }
};

const searching = () => {
  const createSearchBar = document.createElement('input');
  createSearchBar.id = 'search';
  createSearchBar.className = 'searchClass';
  const main = document.getElementById('main');
  main.appendChild(createSearchBar);
  createSearchBar.addEventListener('input', () => {
    searchPokemon(createSearchBar.value);
  });
};

const appending = (
  pokemonContainer, pokemonName, pokemonId, pokemonImage, pokemonType
) => {
  const moreDetails = document.createElement('p');
  button.innerText = 'more details'
  pokemonContainer.appendChild(pokemonName);
  pokemonContainer.appendChild(pokemonId);
  pokemonContainer.appendChild(pokemonImage);
  pokemonContainer.appendChild(pokemonType);
  pokemonContainer.appendChild(button);
  document.getElementById('pokemonsContainer').appendChild(pokemonContainer);
};

const generateDefaultData = async (pokemonContainer, result, index) => {
const pokemonName = document.createElement('p');
  pokemonName.innerText = result['name'];
  const pokemonId = document.createElement('h5');
  pokemonId.innerText = index + 1;
  const pokemonType = document.createElement('p');
  pokemonType.innerText = 'types undefined'
  const pokemonImage = document.createElement('img');
  pokemonImage.src = './src/images/default.png';
  appending(pokemonContainer, pokemonName, pokemonId, pokemonImage, pokemonType);
};

const generatePokemonData = (pokemonContainer, result, index, url) => {
  const pokemonName = document.createElement('p');
  pokemonName.innerText = result['name'];
  const pokemonId = document.createElement('h5');
  pokemonId.innerText = url.id;
  const pokemonType = document.createElement('p');
  const typesContainer = [];
  url.types.forEach((type) => typesContainer.push(type.type.name));
  pokemonType.innerText = `type: ${typesContainer.join(', ')}`;
  const pokemonImage = document.createElement('img');
  pokemonImage.src = url.sprites.other['official-artwork']['front_default'];
  appending(pokemonContainer, pokemonName, pokemonId, pokemonImage, pokemonType);
};

const getResponse = async (result) => {
  try {
    const url = await fetch(result['url']);
    const responseUrl = await url.json();
    return responseUrl;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const renderingPokemons = async (result, index) => {
  const url = await getResponse(result);
  const pokemonContainer = document.createElement('div');
  pokemonContainer.id = 'pokemonContainer';
  pokemonContainer.className = 'pokemonClass';
  if (url === false) {
    generateDefaultData(pokemonContainer, result, index);
  } else {
    generatePokemonData(pokemonContainer, result, index, url);
  }
};

const generateAllPokemonData = async (results) => {
  for (let index = 0; index < results.length; index++) {
    const pokemonData = await renderingPokemons(results[index], index);
  }
  searching();
  const removeLoader = await removeLoading();
};

const fetchingPokemon = async () => {
  const pokemonApi = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  );
  const pokemonApiResponse = await pokemonApi.json();
  generateAllPokemonData(pokemonApiResponse['results']);
};

const removeLoading = async () => {
  const allPokemons = document.getElementById('allPokemons');
  const body = document.getElementById('body');
  const loading = document.getElementById('loadingData')
  body.removeChild(loading);
  const pokemonClass = document.getElementsByClassName('pokemonClass');
  pokemonClass.style.display = 'block';
};

const loadingPage = async (loading, body) => {
  loading.className = 'loading';
  loading.id = 'loadingData'
  loading.innerText = 'Loading...';
  const allPokemons = document.getElementById('allPokemons');
  const pokemonClass = document.getElementsByClassName('pokemonClass');
  body.appendChild(loading);
  fetchingPokemon();
};

window.onload = function () {
  const body = document.getElementById('body');
  const apiOfPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0';
  const loading = document.createElement('h1');
  loadingPage(loading, body);
};
