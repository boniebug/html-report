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
  if (filteredPokemon.length === 0) {
    const noDataFound = document.createElement('h1');
    noDataFound.textContent = 'No Pokemon Found! Please try a different search.';
    pokemonInfoSection.appendChild(noDataFound);
    return;
  }
  filteredPokemon.forEach(pokemon => {
    pokemonInfoSection.appendChild(displayPokemonData(pokemon));
  });
};

const createModalContainer = () => {
  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';
  document.body.appendChild(modalContainer);
  return modalContainer;
};

const createModalContent = (modalContainer) => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modalContainer.appendChild(modal);
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modal.appendChild(modalContent);
  return modalContent;
};

const createCloseModalButton = (modalContent) => {
  const closeModalButton = document.createElement('button');
  closeModalButton.textContent = 'X';
  closeModalButton.id = 'closeModalButton';
  closeModalButton.addEventListener('click', () => {
    modalContent.parentNode.parentNode.remove();
  });
  modalContent.appendChild(closeModalButton);
};

const createPokemonName = (modalContent, pokemonData) => {
  const pokemonName = document.createElement('h1');
  pokemonName.id = 'modalName';
  const UpperCaseName = pokemonData.name.toUpperCase();
  pokemonName.textContent = UpperCaseName;
  modalContent.appendChild(pokemonName);
};

const createPokemonImage = (modalContent, pokemonData) => {
  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemonData.sprites.other.home.front_shiny;
  modalContent.appendChild(pokemonImage);
};

const createPokemonId = (modalContent, pokemonData) => {
  const pokemonId = document.createElement('p');
  pokemonId.textContent = `ID: ${pokemonData.id}`;
  modalContent.appendChild(pokemonId);
};

const createPokemonTypes = (modalContent, pokemonData) => {
  const pokemonTypes = document.createElement('p');
  let types = '';
  pokemonData.types.forEach((type) => {
    types += `${type.type.name}, `;
  });
  types = types.slice(0, -2);
  pokemonTypes.textContent = `Types: ${types}`;
  modalContent.appendChild(pokemonTypes);
};

const createPokemonHeightWeight = (modalContent, pokemonData) => {
  const pokemonHeightWeight = document.createElement('p');
  pokemonHeightWeight.textContent = `Height: ${pokemonData.height} | Weight: ${pokemonData.weight}`;
  modalContent.appendChild(pokemonHeightWeight);
};

const createPokemonInfo = (modalContent, pokemonData) => {
  createPokemonName(modalContent, pokemonData);
  createPokemonImage(modalContent, pokemonData);
  createPokemonId(modalContent, pokemonData);
  createPokemonTypes(modalContent, pokemonData);
  createPokemonHeightWeight(modalContent, pokemonData);
};

const createPokemonMoves = (modalContent, pokemonData) => {
  const movesHeading = document.createElement('h2');
  movesHeading.innerText = 'Moves :'
  const pokemonMoves = document.createElement('ul');
  modalContent.appendChild(movesHeading);
  pokemonData.moves.forEach((move) => {
    const moveListItem = document.createElement('li');
    moveListItem.textContent = move.move.name;
    pokemonMoves.appendChild(moveListItem);
  });
  modalContent.appendChild(pokemonMoves);
};

const createPokemonAbilities = (modalContent, pokemonData) => {
  const abilitiesHeading = document.createElement('h2');
  abilitiesHeading.innerText = 'Abilities :'
  const pokemonAbilities = document.createElement('ul');
  modalContent.appendChild(abilitiesHeading);
  pokemonData.abilities.forEach((ability) => {
    const abilityListItem = document.createElement('li');
    abilityListItem.textContent = ability.ability.name;
    pokemonAbilities.appendChild(abilityListItem);
  });
  modalContent.appendChild(pokemonAbilities);
};

const createPokemonStatistics = (modalContent, pokemonData) => {
  const statisticsHeading = document.createElement('h2');
  statisticsHeading.innerText = 'Statistics :';
  const pokemonStatistics = document.createElement('ul');
  modalContent.appendChild(statisticsHeading);
  pokemonData.stats.forEach((stat) => {
    const statisticsListItem = document.createElement('li');
    statisticsListItem.textContent = stat.stat.name;
    pokemonStatistics.appendChild(statisticsListItem);
  });
  modalContent.appendChild(pokemonStatistics);
};

const fetchWeaknessData = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${name}/`);
  const typeData = await response.json();
  return typeData.damage_relations.double_damage_from;
};

const createWeaknessesList = (weaknesses,modalContent) => {
  const pokemonWeaknesses = document.createElement('ul');
  const weaknessHeading = createWeaknessesHeading();
  modalContent.appendChild(weaknessHeading);
  weaknesses.forEach((weakness) => {
    const weaknessListItem = document.createElement('li');
    weaknessListItem.textContent = weakness.name;
    pokemonWeaknesses.appendChild(weaknessListItem);
  });
  return pokemonWeaknesses;
};

const createWeaknessesHeading = () => {
  const weaknessHeading = document.createElement('h2');
  weaknessHeading.innerText = 'Weaknesses :'
  return weaknessHeading;
};

const createPokemonWeaknesses = async (modalContent, pokemonData) => {
  const weaknessArray = [];
  pokemonData.types.forEach((type) => {
    weaknessArray.push(fetchWeaknessData(type.type.name));
  });
  const weaknesses = await Promise.all(weaknessArray);
  const flatenedWeaknesses = weaknesses.flat();
  const pokemonWeaknesses = createWeaknessesList(flatenedWeaknesses,modalContent);
  modalContent.appendChild(pokemonWeaknesses);
};

const createModal = async (pokemonData) => {
  try {
    const modalContainer = createModalContainer();
    const modalContent = createModalContent(modalContainer);
    createCloseModalButton(modalContent);
    createPokemonInfo(modalContent, pokemonData);
    createPokemonMoves(modalContent, pokemonData);
    createPokemonAbilities(modalContent, pokemonData);
    createPokemonStatistics(modalContent, pokemonData);
    await createPokemonWeaknesses(modalContent, pokemonData);
  } catch (error) {
    console.error(error);
  }
};

const displayPokemonData = (data) => {
  const pokemonCard = document.createElement('div');
  pokemonCard.className = 'pokemon-card';
  pokemonCard.addEventListener('click', async () => {
    await createModal(data);
  });
  const pokemonImage = document.createElement('img');
  pokemonImage.src = data.sprites.other.home.front_shiny;
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
  let types = '';
  data.types.forEach(type => types += `${type.type.name}, `);
  types = types.slice(0, -2);
  const pokemonType = document.createElement('p');
  pokemonType.textContent = `Type: ${types}`;
  pokemonCard.appendChild(pokemonType);
};

const filterPokemon = (pokemonList, searchValue) => {
  const lowerSearchValue = searchValue.toLowerCase();
  const filteredPokemon = pokemonList.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(lowerSearchValue);
    const idMatch = pokemon.id.toString() === searchValue;
    const typeMatch = pokemon.types.some((type) => {
      return type.type.name.toLowerCase() === lowerSearchValue;
    });
    return nameMatch || idMatch || typeMatch;
  });
  return filteredPokemon;
};

const getPokemonData = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getAllPokemonData = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1032';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pokemonList = data.results;
    const pokemonDataPromises = [];
    pokemonList.forEach(pokemon => {
      pokemonDataPromises.push(getPokemonData(pokemon.name));
    });
    return await Promise.all(pokemonDataPromises);
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
  searchButton.id = 'searchButton';
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
  await callDisplaySearchResults(lowerSearchValue);
  loaderContainer.remove();
  loaderContainer.style.display = 'none';
};

const callDisplaySearchResults = async (lowerSearchValue) => {
  const pokemonList = await getAllPokemonData();
  const filteredPokemon = filterPokemon(pokemonList, lowerSearchValue);
  displaySearchResults(filteredPokemon);
};

const createHomeButton = () => {
  const homeButton = document.createElement('button');
  homeButton.textContent = 'Home';
  homeButton.id = 'homeButton';
  return homeButton;
};

const addHomeButtonEventListener = (homeButton) => {
  homeButton.addEventListener('click', async () => {
    const loaderContainer = await createLoader();
    const pokemonInfoSection = document.getElementById('pokemon-info');
    pokemonInfoSection.textContent = '';
    const pokemonDataList = await getAllPokemonData();
    await displayInitialResults(pokemonDataList);
    loaderContainer.remove();
  });
};

const searchBar = async () => {
  const searchInput = createSearchInput();
  const searchButton = createSearchButton();
  const homeButton = createHomeButton();
  addSearchButtonEventListener(searchInput, searchButton);
  addHomeButtonEventListener(homeButton);
  document.getElementById('header').appendChild(homeButton);
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
