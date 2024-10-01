'use strict';

window.onload = async () => {
  document.getElementById('search-button').addEventListener('click', loadingError);
  document.getElementById('home-button').addEventListener('click', loadingError);
  const pokemonArray = await generatePokemonArray();
  renderPokemon(pokemonArray);
};

const generatePokemonArray = async function () {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const data = await response.json();
  const pokemonArray = data.results;
  return pokemonArray;
};

const renderPokemon = async function (pokemonArray) {
  await Promise.all(pokemonArray.map(async (pokemon) => {
    try {
      const pokemonData = await fetch(pokemon.url);
      const parsedPokemon = await pokemonData.json();
      generatePokemon(parsedPokemon);
    } catch (error) {
      return;
    }
  }));
  document.getElementById('page-loader').classList.add('hide');
  enablePageFeatures();
};

const generatePokemon = function (pokemon) {
  const pokemonContainer = createPokemonContainer();
  pokemonContainer.append(generatePokemonImage(pokemon));
  pokemonContainer.append(generatePokemonDetails('Name', pokemon.name));
  pokemonContainer.append(generatePokemonDetails('Id', pokemon.id));
  pokemonContainer.append(generatePokemonDetails('Type', pokemon.types.map((index) => 
    index.type.name).join(', ')));
  pokemonContainer.addEventListener('click', () => {
    displayMoreDetails(pokemon);
  });
  document.getElementById('main-container').append(pokemonContainer);
};

const createPokemonContainer = function () {
  const container = document.createElement('div');
  container.classList.add('pokemon-container');
  return container;
};

const generatePokemonImage = function (obj) {
  const pokemonImage = document.createElement('img');
  pokemonImage.src = obj.sprites.other.dream_world.front_default || obj.sprites.other.home.front_default || './src/images/no-image.png';
  pokemonImage.alt = obj.name;
  pokemonImage.classList.add('pokemon-image');
  return pokemonImage;
};

const generatePokemonDetails = function (key, value) {
  const container = document.createElement('div');
  const detailKey = document.createElement('h3');
  const detailValue = document.createElement('p');
  detailKey.innerText = key + ': ';
  detailValue.innerText = value;
  container.append(detailKey);
  container.append(detailValue);
  container.classList.add(key.toLowerCase());
  return container;
};

const searchPokemon = function () {
  const searchedValue = document.getElementById('search-bar').value.toLowerCase();
  document.getElementById('search-bar').value = '';
  if (searchedValue === '') {
    displayErrorPopUp('Enter a Search Value');
    return;
  }
  document.getElementById('page-loader').classList.remove('hide');
  const displayedPokemon = document.querySelectorAll('.pokemon-container');

  if (!filterSearchResults(searchedValue, displayedPokemon)) {
    displayErrorPopUp('Search Value Not Found');
  }
  document.getElementById('page-loader').classList.add('hide');
};

const filterSearchResults = function (searchedValue, displayedPokemon) {
  let isFound = false;
  displayedPokemon.forEach((pokemon) => {
    const pokemonName = pokemon.querySelector('.name').textContent.replace('Name: ', '').toLowerCase();
    const pokemonId = pokemon.querySelector('.id').textContent.replace('ID: ', '').toLowerCase();
    const pokemonType = pokemon.querySelector('.type').textContent.replace('Type: ', '').toLowerCase();
    if (pokemonName.includes(searchedValue) || pokemonId.includes(searchedValue) || pokemonType.includes(searchedValue)) {
      isFound = true;
      pokemon.style.display = 'block';
    } else {
      pokemon.style.display = 'none';
    }
  });
  return isFound;
};

const openHomePage = async function () {
  document.getElementById('page-loader').classList.remove('hide');
  document.getElementById('main-container').textContent = '';
  const pokemonArray = await generatePokemonArray();
  renderPokemon(pokemonArray);
};

const displayErrorPopUp = function (Message = 'Page Not Loaded') {
  const popUp = document.getElementById('error-message');
  popUp.classList.add('error-message');
  popUp.innerText = Message;
  popUp.style.display = 'block';
  setTimeout(() => {
    popUp.style.display = 'none';    
  }, 2000);
};

const loadingError = function () {
  const popUp = document.getElementById('error-message');
  popUp.classList.add('error-message');
  popUp.innerText = 'Page Not Loaded';
  popUp.style.display = 'block';
  setTimeout(() => {
    popUp.style.display = 'none';    
  }, 2000);
}

const enablePageFeatures = function () {
  document.getElementById('search-button').removeEventListener('click', loadingError);
  document.getElementById('home-button').removeEventListener('click', loadingError);
  document.getElementById('search-button').addEventListener('click', searchPokemon);
  document.getElementById('home-button').addEventListener('click', openHomePage);
}

const generatePokemonStatistics = function (statistics) {
  const allStats = document.createElement('div');
  statistics.forEach(statistic => {
    const container = document.createElement('div');
    const detailKey = document.createElement('h3');
    const detailValue = document.createElement('p');
    detailKey.innerText = statistic.stat.name + ': ';
    detailValue.innerText = statistic.base_stat;
    container.append(detailKey);
    container.append(detailValue);
    allStats.append(container);
  });
  return allStats;
};

const generatePokemonWeakness = async function (pokemon) {
  const container = document.createElement('div');
  const weaknesses = [];
  for (let index of pokemon.types) {
    const response = await fetch(index.type.url);
    const pokemonWeakness = await response.json();
    pokemonWeakness.damage_relations.double_damage_from.forEach(weakness => {
      if (!weaknesses.includes(weakness.name)) {
        weaknesses.push(weakness.name);
      }
    });
  }
  const allWeakness = weaknesses.join(', ');
  container.append(generatePokemonDetails('Weakness', allWeakness));
  return container;
};

const generateModal = function () {
  const modal = document.createElement('button');
  modal.classList.add('details-modal');
  const closeButton = document.createElement('p');
  closeButton.innerText = 'close';
  closeButton.classList.add('close-modal');
  modal.append(closeButton);
  return modal;
}

const displayMoreDetails = async function (pokemon) {
  const detailsModal = generateModal();
  detailsModal.append(generatePokemonImage(pokemon));
  const pokemonDetails = await appendDetailsToModal(pokemon);
  detailsModal.append(pokemonDetails);
  detailsModal.style.display = 'flex';
  const closeButton = detailsModal.querySelector('.close-modal');
  closeButton.addEventListener('click', () => {
    detailsModal.style.display = 'none';
  });
  document.body.append(detailsModal);
};

const appendDetailsToModal = async function (pokemon) {
  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('modal-pokemon-details');
  detailsContainer.append(generatePokemonDetails('Name', pokemon.name));
  detailsContainer.append(generatePokemonDetails('Id', pokemon.id));
  detailsContainer.append(generatePokemonDetails('Type', pokemon.types.map(index => index.type.name).join(', ')));
  detailsContainer.append(generatePokemonDetails('Height', pokemon.height));
  detailsContainer.append(generatePokemonDetails('Weight', pokemon.weight));
  detailsContainer.append(generatePokemonDetails('Abilities', pokemon.abilities.map(index => index.ability.name).join(', ')));
  detailsContainer.append(generatePokemonDetails('Moves', pokemon.moves.map(index => index.move.name).slice(0, 5).join(', ')));
  const weaknesses = await generatePokemonWeakness(pokemon);
  detailsContainer.append(weaknesses);
  detailsContainer.append(generatePokemonStatistics(pokemon.stats));
  return detailsContainer;
};
