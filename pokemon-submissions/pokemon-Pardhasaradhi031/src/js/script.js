'use strict';

const createPokemonContainer = function (id, name, image, type) {
  const mainSection = document.getElementById('pokemonSection');
  const pokemonContainer = document.createElement('div');
  pokemonContainer.className = 'pokemon';
  const imageContainer = document.createElement('div');
  imageContainer.className = 'imageContainer';
  const imageElement = document.createElement('img');
  imageElement.src = image;
  imageContainer.append(imageElement);
  const detailsContainer = document.createElement('div');
  detailsContainer.id = 'pokemonDetails';
  detailsContainer.innerText = `Id: ${id}\nName: ${name}\nType: ${type}`;
  pokemonContainer.append(imageContainer, detailsContainer);
  mainSection.append(pokemonContainer);
};

const fetchTotalPokemonCount = async function () {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=0');
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error fetching Pokémon count:', error);
    return 0;
  }
};

const showLoadPopup = function () {
  const load = document.createElement('div');
  const main = document.getElementById('pokemonSection');
  load.innerText = 'Loading...';
  document.body.append(load);
  load.id = 'showLoading';
  main.style.display = 'none';
};

const hideLoadPopup = function () {
  const load = document.getElementById('showLoading');
  if (load) {
    load.style.display = 'none';
  }
  const main = document.getElementById('pokemonSection');
  main.style.display = 'flex';
};

const getPokemonTypes = function (data) {
  let types = '';
  for (let index = 0; index < data.types.length; index++) {
    types = types + data.types[index].type.name;
    if (index < data.types.length - 1) {
      types = types +  ', ';
    }
  }
  return types;
};

const fetchAllPokemonData = async function () {
  const totalPokemon = await fetchTotalPokemonCount();
  for (let index = 1; index <= totalPokemon; index++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const pokemonId = data.id;
      const pokemonName = data.name;
      const pokemonImage = data.sprites.front_default;
      const pokemonTypes = getPokemonTypes(data);
      createPokemonContainer(pokemonId, pokemonName, pokemonImage, pokemonTypes);
    } catch (error) {
      console.error(`Error fetching Pokémon number ${index}:`, error);
    }
  }
};

const searchPokemon = function () {
  const searchBar = document.getElementById('searchBox').value.toLowerCase();
  const pokemonContainers = document.getElementsByClassName('pokemon');
  for (let index = 0; index < pokemonContainers.length; index++) {
    const pokemonData = pokemonContainers[index].textContent.toLowerCase();
    if (pokemonData.includes(searchBar)) {
      pokemonContainers[index].style.display = '';
    } else {
      pokemonContainers[index].style.display = 'none';
    }
  }
};

window.onload = async () => {
  const searchBar = document.getElementById('searchBox');
  searchBar.addEventListener('input', searchPokemon);
  showLoadPopup();
  await fetchAllPokemonData();
  hideLoadPopup();
};
