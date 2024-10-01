'use strict';

async function fetchPokemonData() {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};
  
async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
  
async function displayPokemonList(pokemonList) {
  const pokemonListElement = document.getElementById('pokemon-list');
  pokemonListElement.textContent = '';
  const promises = [];
  pokemonList.forEach((pokemon) => {
    promises.push(fetchPokemonDetails(pokemon.url)
    .then((pokemonData) => {
      if (pokemonData) {
        addPokemonDetails(pokemonData, pokemonListElement);
      }
    }));
  });
  await Promise.all(promises);
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
};
  
function createPokemonElement(pokemon) {
  const pokemonElement = document.createElement('div');
  pokemonElement.className = 'pokemon';
  const pokemonNameElement = document.createElement('h5');
  pokemonNameElement.className = 'pokemon-heading';
  pokemonNameElement.textContent = pokemon.name;
  pokemonElement.appendChild(pokemonNameElement);
  const pokemonIdElement = document.createElement('p');
  pokemonIdElement.className = 'pokemon-id';
  pokemonIdElement.textContent = `ID: ${pokemon.id}`;
  pokemonElement.appendChild(pokemonIdElement);
  return pokemonElement;
};
  
function addPokemonDetails(pokemon, parentElement) {
  const pokemonElement = createPokemonElement(pokemon);
  const pokemonImageElement = document.createElement('img');
  if (pokemon.sprites.other.home.front_default) {
    pokemonImageElement.src = pokemon.sprites.other.home.front_default;
  } else {
    pokemonImageElement.src = 'src/images/image.jpeg';
  }
  pokemonImageElement.alt = pokemon.name;
  pokemonImageElement.className = 'pokemon-image';
  pokemonElement.appendChild(pokemonImageElement);
  const pokemonTypeElement = document.createElement('p');
  let typesString = 'Type: ';
  pokemon.types.forEach((type) => {
    typesString += type.type.name + ', ';
  });
  typesString = typesString.slice(0, -2);
  pokemonTypeElement.textContent = typesString;
  pokemonElement.appendChild(pokemonTypeElement);
  pokemonElement.addEventListener('click', async () => {
    try {
      displayPokemonPopup(pokemon);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  });
  parentElement.appendChild(pokemonElement);
};
  
async function main() {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'block'; 
  }
  const data = await fetchPokemonData();
  displayPokemonList(data.results);
};

document.addEventListener('DOMContentLoaded', main);
