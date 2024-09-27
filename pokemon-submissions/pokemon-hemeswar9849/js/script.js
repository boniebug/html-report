'use strict';

const getTheData = () => {
  return new Promise(async (resolve) => {
    try {
      const fetchedData = await fetch('https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=1025');
      const resultData = await fetchedData.json();
      resolve(resultData);
    } catch (error) {
      console.log(error);
    }
  });
};

const getTheDetails = (pokemonDetailsLink) => {
  return new Promise(async (resolve) => {
    try {
      const fetchedData = await fetch(pokemonDetailsLink);
      const pokemonDetails = await fetchedData.json();
      resolve(pokemonDetails);
    } catch (error) {
      console.log(error);
    }
  });
};

const captilisingTheFirstLetter = (string) => {
  const firstletter = string.charAt(0).toUpperCase();
  return string.replace(string[0], firstletter);
};

const createAPokemonContainer = () => {
  const pokemonContainer = document.createElement('div');
  pokemonContainer.classList.add('aPokemon');
  return pokemonContainer;
};

const appendPokemonID = (pokemonContainer, pokemonDetails) => {
  const IDh3 = document.createElement('h3');
  IDh3.innerText = pokemonDetails.id;
  IDh3.classList.add('pokemonid');
  pokemonContainer.appendChild(IDh3);
};

const appendPokemonImage = (pokemonContainer, pokemonDetails) => {
  const pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemonImage');
  pokemonImage.src = pokemonDetails.sprites.front_default;
  pokemonContainer.appendChild(pokemonImage);
};

const appendPokemonName = (pokemonContainer, pokemonDetails) => {
  const pokemonNameh3 = document.createElement('h3');
  pokemonNameh3.classList.add('pokemonName');
  const pokemonName = captilisingTheFirstLetter(pokemonDetails.name);
  pokemonNameh3.innerText = pokemonName;
  pokemonContainer.appendChild(pokemonNameh3);
};

const appendPokemonType = (pokemonContainer, pokemonDetails) => {
  const pokemonTypesh3 = document.createElement('h3');
  pokemonTypesh3.classList.add('pokemonTypes');
  pokemonDetails.types.forEach(type => {
    pokemonTypesh3.innerText = pokemonTypesh3.innerText + `  ${type.type.name}`;
  });
  pokemonContainer.appendChild(pokemonTypesh3);
};

const appendDetailsToPokemonConatier = (pokemon, callback) => {
  const containers = document.querySelector('#containers');
  const pokemonContainer = callback();
  appendPokemonID(pokemonContainer, pokemon);
  appendPokemonName(pokemonContainer, pokemon);
  appendPokemonImage(pokemonContainer, pokemon);
  appendPokemonType(pokemonContainer, pokemon);
  containers.appendChild(pokemonContainer);
};

const createAndAppendLoader = () => {
  const body = document.querySelector('body');
  const divTag = document.createElement('div');
  divTag.classList.add('loading');
  body.appendChild(divTag);
};

const appendAllPokemonDetails = async () => {
  createAndAppendLoader();
  const loader = document.querySelector('.loading');
  const pokemons = await getTheData();
  pokemons.results.forEach(async (pokemon) => {
    const pokemonDetails = await getTheDetails(pokemon.url);
    appendDetailsToPokemonConatier(pokemonDetails, createAPokemonContainer);
    loader.remove();
  });
};

const searchBarFunctionality = (event) => {
  const allPokemons = document.querySelectorAll('.aPokemon');
  allPokemons.forEach((pokemon) => {
    if (!pokemon.innerText.includes(event.target.value)) {
      pokemon.classList.add('hide');
    } else {
      pokemon.classList.remove('hide');
    }
  });
};

const appendSearchBar = (header) => {
  const searchBar = document.createElement('input');
  searchBar.placeholder = 'Search Here';
  searchBar.setAttribute('id', 'searchBar');
  searchBar.setAttribute('oninput', 'searchBarFunctionality(event)');
  header.appendChild(searchBar);
};

const appendMainHeading = (header) => {
  const mainHeading = document.createElement('h1');
  mainHeading.innerText = 'Pokédex';
  mainHeading.setAttribute('id', 'mainHeading');
  header.appendChild(mainHeading);
};

const appendToHeaders = () => {
  const header = document.querySelector('header');
  appendMainHeading(header);
  appendSearchBar(header);
};

const main = () => {
  appendToHeaders();
  appendAllPokemonDetails();
};

window.onload = main;
