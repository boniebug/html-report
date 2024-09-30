'use strict';
let loadingState = true;
const createLoadMessageElement = () =>{
  const loadMessage = document.createElement('p');
  loadMessage.setAttribute('id', 'loading');
  loadMessage.innerText = 'Loading Pokémon...';
  document.body.appendChild(loadMessage);
};

const fetchAllPokemons = async () => {
  createLoadMessageElement();
  loadingState = true;
  const loadingElement = document.querySelector('#loading');
  loadingElement.style.display = 'block';
  const allPokemons = await fetchPokemonList();
  if (allPokemons) {
    const pokemonData = await fetchDetailedPokemons(allPokemons);
    renderPokemons(pokemonData);
  }
  loadingElement.style.display = 'none';
  loadingState = false;
};

const fetchConvertData = async (url) => {
  try {
    const response = await fetch(url);
    const pokemonData = await response.json();
    return pokemonData;
  } catch (error) {
    return null;
  }
};

const fetchPokemonList = async () => {
  const data = await fetchConvertData('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0');
  if (data) {
    return data.results;
  } else {
    return null;
  }
};

const fetchDetailedPokemons = async (allPokemons) => {
  const pokemonDataArray = [];
  for (let index = 0; index < allPokemons.length; index++) {
    const pokemonData = await fetchConvertData(allPokemons[index].url);
    if (pokemonData) {
      pokemonDataArray.push(pokemonData);
    }
  }
  return pokemonDataArray;
};

const showPopup = (message) => {
  createPopupDiv();
  const popup = document.getElementById('popup');
  popup.innerText = message;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 2000);
};

const createPopupDiv = () => {
  const popupDiv = document.createElement('div');
  popupDiv.className = 'popup';
  popupDiv.setAttribute('id', 'popup');
  document.body.appendChild(popupDiv);
};

const createHeaderDiv = () => {
  const headerDiv = document.createElement('div');
  headerDiv.className = 'header';
  const h1Tag = document.createElement('h1');
  h1Tag.textContent = 'Pokémon World';
  headerDiv.appendChild(h1Tag);
  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.placeholder = 'Search by Pokemon Name, Type, Id....'
  searchBar.className = 'searchBox';
  headerDiv.appendChild(searchBar);
  document.body.appendChild(headerDiv);
};

window.onload = () => {
  createHeaderDiv();
  fetchAllPokemons();
  document.querySelector('.searchBox').addEventListener('input', searchFunction);
};