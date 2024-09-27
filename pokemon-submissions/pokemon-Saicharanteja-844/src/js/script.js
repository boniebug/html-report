'use strict';

const createLoader = () => {
  const loaderContainer = document.createElement('div');
  loaderContainer.classList.add('loaderContainer');
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loaderContainer.append(loader);
  document.body.appendChild(loaderContainer);
  return loaderContainer;
};

const displayInitialResults = async (pokemonDataList) => {
  const pokemonInfoSection = document.getElementById('pokemon-info');
  pokemonInfoSection.innerHTML = '';
  pokemonDataList.forEach(pokemon => {
    pokemonInfoSection.appendChild(displayPokemonData(pokemon));
  });
};

const displaySearchResults = async (filteredPokemon) => {
  const pokemonInfoSection = document.getElementById('pokemon-info');
  pokemonInfoSection.textContent = '';
  filteredPokemon.forEach(pokemon => {
    pokemonInfoSection.appendChild(displayPokemonData(pokemon));
  });
};

const displayPokemonData = (data) => {
  const pokemonCard = document.createElement('div');
  pokemonCard.className = 'pokemon-card';
  const pokemonImage = document.createElement('img');
  pokemonImage.src = data.sprites.front_default;
  pokemonCard.appendChild(pokemonImage);
  displayPokemonNameIdType(data, pokemonCard);
  return pokemonCard;
};

const displayPokemonNameIdType = (data, pokemonCard) => {
  const pokemonName = document.createElement('h2');
  pokemonName.textContent = data.name;
  pokemonCard.appendChild(pokemonName);
  const pokemonId = document.createElement('p');
  pokemonId.textContent = `ID: ${data.id}`;
  pokemonCard.appendChild(pokemonId);
  const pokemonType = document.createElement('p');
  const types = data.types.map(type => type.type.name).join(', ');
  pokemonType.textContent = `Type: ${types}`;
  pokemonCard.appendChild(pokemonType);
};

const filterPokemon = (pokemonList, searchValue) => {
  const filteredPokemon = pokemonList.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchValue.toLowerCase());
    const idMatch = pokemon.id.toString() === searchValue;
    const typeMatch = pokemon.types.some((type) => {
      return type.type.name.toLowerCase() === searchValue.toLowerCase();
    });
    return nameMatch || idMatch || typeMatch;
  });
  return filteredPokemon;
};

const getPokemonData = async (Name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${Name}/`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllPokemonData = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1025';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pokemonList = data.results;
    const pokemonDataPromises = pokemonList.map(pokemon => getPokemonData(pokemon.name));
    const pokemonDataList = await Promise.all(pokemonDataPromises);
    return pokemonDataList;
  } catch (error) {
    console.error(error);
  }
};

const createSearchInput = () => {
  const searchInput = document.createElement('input');
  searchInput.id = 'searchBar';
  searchInput.type = 'search';
  searchInput.placeholder = 'Search';
  return searchInput;
};

const createSearchButton = () => {
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchButton.id ='searchButton';
  return searchButton;
};

const addSearchButtonEventListener = (searchInput, searchButton) => {
  searchButton.addEventListener('click', async () => {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
      await handleSearchClick(searchValue);
    }
  });
};

const handleSearchClick = async (searchValue) => {
  const pokemonInfoSection = document.getElementById('pokemon-info');
  pokemonInfoSection.textContent = '';
  const loaderContainer = await createLoader();
  const lowerSearchValue = searchValue.toLowerCase();
  setTimeout(async () => {
    loaderContainer.remove();
    await callDisplaySearchResults(lowerSearchValue);
  }, 5000);
};

const callDisplaySearchResults = async (lowerSearchValue) => {
  const pokemonList = await getAllPokemonData();
  const filteredPokemon = filterPokemon(pokemonList, lowerSearchValue);
  displaySearchResults(filteredPokemon);
};

const searchBar = async () => {
  const searchInput = createSearchInput();
  const searchButton = createSearchButton();
  addSearchButtonEventListener(searchInput, searchButton);
  document.getElementById('header').appendChild(searchInput);
  document.getElementById('header').appendChild(searchButton);
};

document.addEventListener('DOMContentLoaded', async () => {
  const loaderContainer = await createLoader();
  try {
    const pokemonDataList = await getAllPokemonData();
    await displayInitialResults(pokemonDataList);
    await searchBar();
    loaderContainer.remove();
  } catch (error) {
    console.error(error);
  }
});
