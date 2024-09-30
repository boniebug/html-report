'use strict';

const pokemonNameInContainer = (pokemonSection, searchValue) => {
  const pokemonName = pokemonSection.querySelector('.pokemonName').innerText.toLowerCase();
  return pokemonName.includes(searchValue);
};

const pokemonIdInContainer = (pokemonSection, searchValue) => {
  const pokemonId = pokemonSection.querySelector('.pokemonId').innerText.toLowerCase();
  return pokemonId.includes(searchValue);
};

const pokemonTypesInContainer = (pokemonSection, searchValue) => {
  const pokemonTypes = pokemonSection.querySelector('.pokemonTypes').innerText.toLowerCase();
  return pokemonTypes.includes(searchValue);
};

const searchData = (searchOption, searchValue, pokemonSection) => {
  let shouldDisplay = false;
  switch (searchOption) {
    case 'name': shouldDisplay = pokemonNameInContainer(pokemonSection, searchValue);
      break;
    case 'id': shouldDisplay = pokemonIdInContainer(pokemonSection, searchValue);
      break;
    case 'type': shouldDisplay = pokemonTypesInContainer(pokemonSection, searchValue);
      break;
    default: shouldDisplay = pokemonNameInContainer(pokemonSection, searchValue) ||
      pokemonIdInContainer(pokemonSection, searchValue) ||
      pokemonTypesInContainer(pokemonSection, searchValue);
  }
  return shouldDisplay;
};

const temporaryPopup = () => {
  const main = document.querySelector('main');
  const popUpDivTag = document.createElement('div');
  popUpDivTag.className = 'loadPopUp';
  popUpDivTag.innerText = 'pokemons are still loading, please wait...';
  main.appendChild(popUpDivTag);
  setTimeout(() => {
    popUpDivTag.remove();
  }, 2000);
};

const searchPokemon = () => {
  const searchInput = document.getElementById('searchPokemon');
  const searchOption = document.getElementById('searchOption').value;
  const pokemonDataSections = document.querySelectorAll('#pokemonContainer section');
  const searchValue = searchInput.value.toLowerCase();
  pokemonDataSections.forEach((pokemonSection) => {
    pokemonSection.style.display = searchData(searchOption, searchValue, pokemonSection) ? 'block' : 'none';
  });
};

const searchPokemonInContainer = () => {
  const loadingMessage = document.querySelector('main');
  if (loadingMessage.innerText.includes('Loading Pokemons...')) {
    temporaryPopup();
  }
  else {
    searchPokemon();
  }
};
