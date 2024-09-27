'use strict'

const appendPokemanImage = (data) => {
  const pokemonImg = document.createElement('img');
  pokemonImg.setAttribute('src', data.sprites.front_default);
  return pokemonImg;
};

const appendPokemanId = (data) => {
  const pokemonId = document.createElement('p');
  pokemonId.classList.add('pokemonId');
  pokemonId.innerHTML = "ID: " + data.id;
  return pokemonId;
};

const appendPokemonName = (data) => {
  const pokemonName = document.createElement('p');
  pokemonName.classList.add('pokemonName');
  pokemonName.innerHTML = "Name: " + data.name;
  return pokemonName;
};

const appendPokemanType = (data) => {
  const pokemonTypes = document.createElement('p');
  pokemonTypes.classList.add('pokemonTypes');
  pokemonTypes.innerHTML = "Types: " + data.types.map(type => type.type.name).join(', ');
  return pokemonTypes;
};

const displayPokemon = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const pokemonData = document.createElement('section');
  pokemonData.appendChild(appendPokemanImage(data));
  pokemonData.appendChild(appendPokemanId(data));
  pokemonData.appendChild(appendPokemonName(data));
  pokemonData.appendChild(appendPokemanType(data));
  document.getElementById('pokemonContainer').appendChild(pokemonData);
};

async function fetchPokemons() {
  const loadingMessage = document.getElementById('loadingMessage');
  loadingMessage.style.display = 'block';
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=1000');
  const data = await response.json();
  await  data.results.forEach((pokemon) => {
    displayPokemon(pokemon.url);
  });
  loadingMessage.style.display = 'none';
};

window.onload = fetchPokemons;
