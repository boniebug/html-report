'use strict';

const createPokemonDetails = function (label, value, id) {
  const div = document.createElement('div');
  const labelSpan = document.createElement('span');
  labelSpan.innerText = `${label} `;
  labelSpan.className = `pokemonLabel-${label}`;
  div.className = `detailsDiv${label}`;
  div.appendChild(labelSpan);
  const valueSpan = document.createElement('span');
  valueSpan.innerText = ` ${value}`.toUpperCase();
  valueSpan.className = `${id}`
  div.appendChild(valueSpan);
  return div;
};

const createDetailsContainer = function (detailsContainer, id, name, types) {
  detailsContainer.append(
    createPokemonDetails('ID', `#${id}`, 'id'),
    createPokemonDetails('', name),
    createPokemonDetails('Type', types)
  );
};

const createPokemonContainer = function (id, name, image, types) {
  const mainSection = document.getElementById('pokemonSection');
  const pokemonContainer = document.createElement('div');
  pokemonContainer.className = 'pokemon';
  const pokeCard = document.createElement('div');
  pokeCard.className = 'pokeCard';
  const imageElement = document.createElement('img');
  imageElement.src = image;
  imageElement.className = 'imageContainer';
  pokeCard.append(imageElement);
  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'pokemonDetails';
  createDetailsContainer(detailsContainer, id, name, types);
  pokemonContainer.append(pokeCard, detailsContainer);
  mainSection.append(pokemonContainer);
};

const showLoadPopup = function () {
  const load = document.createElement('div');
  load.innerText = 'Loading...';
  document.body.append(load);
  load.id = 'showLoading';
  const main = document.getElementById('pokemonSection');
  main.style.display = 'none';
};

const hideLoadPopup = function () {
  const main = document.getElementById('pokemonSection');
  const load = document.getElementById('showLoading');
  if (load) {
    document.body.removeChild(load);
  }
  main.style.display = 'flex';
};

const getPokemonTypes = function (data) {
  let types = '';
  for (let index = 0; index < data.types.length; index++) {
    types += data.types[index].type.name;
    if (index < data.types.length - 1) {
      types += ', ';
    }
  }
  return types;
};

const getPokemonDetails = async (pokemon, index) => {
  try {
    const pokeResponse = await fetch(pokemon.url);
    const pokeData = await pokeResponse.json();
    const id = pokeData.id;
    const name = pokeData.name;
    const image = pokeData.sprites.other['official-artwork'].front_default;
    const types = getPokemonTypes(pokeData);
    createPokemonContainer(id, name, image, types);
  } catch (error) {}
};

const fetchAllPokemonData = async function () {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const data = await response.json();
    const totalPokemon = data.count;
    const pokemons = [];
    for (let index = 0; index < totalPokemon; index++) {
      const pokemon = data.results[index];
      pokemons.push(getPokemonDetails(pokemon, index));
    }
    await Promise.all(pokemons);
  } catch (error) {
    console.error('Error fetching total Pokémon data:', error);
  }
};

const searchPokemon = function () {
  const searchBar = document.getElementById('searchBox').value.toLowerCase().trim();
  const pokemonContainers = document.getElementsByClassName('pokemon');
  for (let index = 0; index < pokemonContainers.length; index++) {
    const pokemonData = pokemonContainers[index].textContent.toLowerCase();
    if (searchBar === '' || pokemonData.includes(searchBar)) {
      pokemonContainers[index].style.display =  '';
    } else {
      pokemonContainers[index].style.display = 'none';
    }
  }
};

const pokeDetails = function () {
  createPokeInfoButton();
}

window.onload = async () => {
  const searchBar = document.getElementById('searchBox');
  searchBar.addEventListener('input', searchPokemon);
  showLoadPopup();
  await fetchAllPokemonData();
  pokeDetails();
  hideLoadPopup();
};
