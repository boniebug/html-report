'use strict';
const getPokemonAndRender = function (
  inputValue,
  pokemonGallery,
  allPokemonData
) {
  for (const eachPokemon of allPokemonData) {
    if (
      eachPokemon.name.includes(inputValue)
      || eachPokemon.type.includes(inputValue)
      || eachPokemon.id.toString().includes(inputValue)
    ) {
      pokemonGallery.appendChild(eachPokemon.element);
    }
  }
};

const searchPokemon = function (allPokemonData) {
  const searchInput = document.querySelector('.search-pokemon-input');
  const pokemonGallery = document.querySelector('.pokemon-gallery');
  searchInput.addEventListener('input', () => {
    pokemonGallery.innerHTML = '';
    const inputValue = searchInput.value.toLowerCase().trim();
    getPokemonAndRender(inputValue, pokemonGallery, allPokemonData);
  });
};

const createParaTag = function (text, value) {
  const paraTag = document.createElement('p');
  const spanTag = document.createElement('span');
  spanTag.innerText = value;
  paraTag.append(text, spanTag);
  return paraTag;
};

const renderEachPokemon = function (eachPokemon) {
  const pokemonGallery = document.querySelector('.pokemon-gallery');
  const divTag = document.createElement('div');
  divTag.classList.add('pokemon');
  const image = document.createElement('img');
  image.src = eachPokemon.imageUrl;
  divTag.append(
    image,
    createParaTag('Id : ', eachPokemon.id),
    createParaTag('Name : ', eachPokemon.name),
    createParaTag('Type : ', eachPokemon.type)
  );
  pokemonGallery.appendChild(divTag);
  return divTag;
};

const renderDataInGallery = async function (allPokemonData) {
  for (const eachPokemon of allPokemonData) {
    eachPokemon.element = renderEachPokemon(eachPokemon);
  }
  document.querySelector('.loading-container').remove();
};

const getSpecificData = async function (eachData) {
  const eachPokemon = {};
  const response = await fetch(eachData.url);
  const responseData = await response.json();
  eachPokemon.name = responseData.name;
  eachPokemon.id = responseData.id;
  eachPokemon.imageUrl = responseData.sprites.back_default;
  eachPokemon.type = responseData.types[0].type.name;
  return eachPokemon;
};

const getPokemonData = async function () {
  const allPokemonData = [];
  const pokemonCount = 200;
  const url = `https://pokeapi.co/api/v2/pokemon-form/?limit=${pokemonCount}`;
  const response = await fetch(url);
  const responseData = await response.json();
  const requiredData = responseData.results;
  for (const eachData of requiredData) {
    allPokemonData.push(await getSpecificData(eachData));
  }
  await renderDataInGallery(allPokemonData);
  return allPokemonData;
};

const main = async function () {
  const allPokemonData = await getPokemonData();
  searchPokemon(allPokemonData);
};

window.onload = main;
