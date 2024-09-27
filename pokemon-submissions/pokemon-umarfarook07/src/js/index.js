'use strict';

const capitalizeFirstLetter = (textContent) => {
  return textContent.charAt(0).toUpperCase() + textContent.slice(1);
};

const createPokemonImage = (pokemon) => {
  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemon.sprites.front_default || 'src/images/no-image.webp';
  pokemonImage.alt = pokemon.name;
  pokemonImage.classList.add('pokemon-img');
  return pokemonImage;
};

const createPokemonNameElement = (pokemon) => {
  const pokemonNameElement = document.createElement('h2');
  pokemonNameElement.classList.add('pokemon-name');
  pokemonNameElement.textContent = capitalizeFirstLetter(pokemon.name);
  return pokemonNameElement;
};

const createPokemonIdElement = (pokemon) => {
  const pokemonIdElement = document.createElement('div');
  pokemonIdElement.classList.add('pokemon-id');
  pokemonIdElement.textContent = pokemon.id;
  return pokemonIdElement;
};

const createPokemonTypeElement = (typeInfo) => {
  const typeElement = document.createElement('div');
  typeElement.classList.add('pokemon-type');
  typeElement.textContent = capitalizeFirstLetter(typeInfo.type.name);
  return typeElement;
};

const createPokemonTypesElement = (pokemon) => {
  const pokemonTypesElement = document.createElement('div');
  pokemonTypesElement.classList.add('pokemon-types');
  pokemon.types.forEach((typeInfo) => {
    const typeElement = createPokemonTypeElement(typeInfo);
    pokemonTypesElement.appendChild(typeElement);
  });
  return pokemonTypesElement;
};

const createPokemonCard = (pokemon) => {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');

  pokemonCard.appendChild(createPokemonImage(pokemon));
  pokemonCard.appendChild(createPokemonNameElement(pokemon));
  pokemonCard.appendChild(createPokemonIdElement(pokemon));
  pokemonCard.appendChild(createPokemonTypesElement(pokemon));

  return pokemonCard;
};

const isMatchingSearchValue = (value, searchValue) => {
  return value.trim().toLowerCase().includes(searchValue);
};

const isNameMatch = (pokemonName, searchValue) => {
  return isMatchingSearchValue(pokemonName, searchValue);
};
const isIdMatch = (pokemonId, searchValue) => {
  return isMatchingSearchValue(pokemonId, searchValue);
};
const isTypeMatch = (pokemonTypes, searchValue) => {
  return pokemonTypes.some((type) => isMatchingSearchValue(type, searchValue));
};

const getPokemonName = (card) => {
  return card.querySelector('.pokemon-name').textContent.toLowerCase()
};
const getPokemonId = (card) => {
  return card.querySelector('.pokemon-id').textContent;
};
const getPokemonTypes = (card) => {
  const types = [];
  card.querySelectorAll('.pokemon-type').forEach((type) => {
    types.push(type.textContent.toLowerCase());
  });
  return types;
};

const handleSearch = () => {
  const searchValue = getSearchValue();
  const pokemonCards = document.querySelectorAll('.pokemon-card');
  pokemonCards.forEach((card) => {
    const isMatch = isPokemonMatch(card, searchValue);
    card.style.display = isMatch ? '' : 'none';
  });
};

const getSearchValue = () => {
  const searchElement = document.getElementById('search');
  return searchElement.value.trim().toLowerCase();
};

const isPokemonMatch = (card, searchValue) => {
  const pokemonName = getPokemonName(card);
  const pokemonId = getPokemonId(card);
  const pokemonTypes = getPokemonTypes(card);
  const isNameMatched = isNameMatch(pokemonName, searchValue);
  const isIdMatched = isIdMatch(pokemonId, searchValue);
  const areTypesMatched = isTypeMatch(pokemonTypes, searchValue);
  return isNameMatched || isIdMatched || areTypesMatched;
};

const fetchPokemonDetails = async (pokemon) => {
  const pokemonDetails = await fetch(pokemon.url);
  const parsedPokemonDetails = await pokemonDetails.json();
  return parsedPokemonDetails;
};

const fetchPokemons = async () => {
  showLoadingIndicator();
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const pokemons = await response.json();
  return pokemons.results;
};

const addSearchButtonEventListener = () => {
  const searchElement = document.getElementById('search');
  const searchButton = document.getElementById('search-btn');
  searchButton.onclick = handleSearch;
  searchElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
};

const renderPokemons = async (pokemons) => {
  const pokemonGrid = document.getElementById('pokemon-grid');
  pokemonGrid.innerHTML = '';
  
  const pokemonFetchPromises = pokemons.map(async (pokemon) => {
    const pokemonDetails = await fetch(pokemon.url);
    const parsedPokemonDetails = await pokemonDetails.json();
    const pokemonCard = createPokemonCard(parsedPokemonDetails);
    pokemonGrid.appendChild(pokemonCard);
  });

  await Promise.all(pokemonFetchPromises);
  hideLoadingIndicator();
};

const main = async () => {
  const pokemons = await fetchPokemons();
  await renderPokemons(pokemons);
  addSearchButtonEventListener();
};

window.onload = main;
