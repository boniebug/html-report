'use strict';
const renderPokemon = async(url) => {
  const response = await fetch(url);
  const pokemonData = await response.json();
  return pokemonData;
};

const appendDetails = (details) => {
  const imageContainer = document.createElement('img');
  const nameContainer = document.createElement('p');
  const nameId = document.createElement('p');
  const nametype = document.createElement('p');
  imageContainer.src = details.imageUrl;
  nameContainer.innerText = details.name;
  nameId.innerText = details.pokenonId;
  nametype.innerText = details.pokemonType;
  nameContainer.setAttribute('class', 'name');
  nametype.setAttribute('class', 'type');
  nameId.setAttribute('class', 'id');
  const element = {image: imageContainer, name: nameContainer, id: nameId, type: nametype};
  return element;
};

const createPokemon = async (pokemon, index) => {
  const pokemonName = pokemon.name;
  const pokemonContainer = document.createElement('div');
  const url = 'https://pokeapi.co/api/v2/pokemon/'+ pokemonName;
  const pokemonData = await renderPokemon(url);
  const details = {name: pokemonName, imageUrl: pokemonData.sprites.front_default, pokenonId: pokemonData.id, pokemonType: pokemonData.types[0].type.name}
  const element = appendDetails(details);
  pokemonContainer.append(element.image,element.name, element.id, element.type);
  pokemonContainer.setAttribute('class', 'pokemon');
  pokemonContainer.setAttribute('id', index);
  return pokemonContainer;
};

const appendPokemon = async (pokemons) => {
  const loading = document.querySelector('.pokemonContainer');
  const container = document.createElement('div');
  container.classList.add('pokemonContainer');
  let pokemon;
  for (let index = 0; index < pokemons.length; index++) {
    pokemon= await createPokemon(pokemons[index], index)
    container.appendChild(pokemon);
  }
  document.body.removeChild(loading);
  document.body.appendChild(container);
 };

const fetchPokemons = async() => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  const response = await fetch(url);
  const pokemonsData = await response.json();
  const pokemons = pokemonsData.results;
  try {
    appendPokemon(pokemons);
  }
  catch (error) {
    console.log(error);
  }
};

const checker = (name, id, type, pokemon) => {
  const inputValue = document.querySelector('.search');
  const searchCritera = inputValue.value.toLowerCase()
  if(!(name.includes(searchCritera) || id.includes(searchCritera) || type.includes(searchCritera))) {
    pokemon.style.display = 'none';
  } else{
    pokemon.style.display = 'flex';
  }
};

const search = () => {
  const pokemons = document.querySelectorAll('.pokemon');
   for(let index = 0; index < pokemons.length; index++) {
    const pokemon = document.getElementById(index);
    const details = pokemon.querySelectorAll('p');
    const pokemonName = details[0].innerText.toLowerCase();
    const pokemonid = details[1].innerText.toLowerCase();
    const pokemonType = details[2].innerText.toLowerCase();
    checker(pokemonName, pokemonid, pokemonType, pokemon)
  }
};

window.onload = () => {
  const inputValue = document.querySelector('.search');
  inputValue.addEventListener('input', search);
  fetchPokemons();
};