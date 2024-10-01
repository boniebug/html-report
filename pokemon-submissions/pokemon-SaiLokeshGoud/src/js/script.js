'use strict';

const pokemonNotFound = (pokemonFound) => {
  const noPokemonFoundDiv = document.querySelector('.no-pokemon-found');
  if (pokemonFound) {
    if (noPokemonFoundDiv) {
      noPokemonFoundDiv.remove();
    }
  } else {
    if (!noPokemonFoundDiv) {
      const newNoPokemonFoundDiv = createElementWithClass('div', 'no-pokemon-found');
      const newNoPokemonFoundText = createElementWithClass('h2', '', 'No Pokemons found!!!');
      newNoPokemonFoundDiv.appendChild(newNoPokemonFoundText);
      document.body.appendChild(newNoPokemonFoundDiv);
    }
  }
}

const isPokemonMatching = (pokemon, searchTerm) => {
  const pokemonName = pokemon.querySelector('.pokemon-name').innerText.toLowerCase();
  const pokemonId = pokemon.querySelector('.pokemon-id').innerText.toLowerCase();
  const pokemonType = pokemon.querySelector('.pokemon-type').innerText.toLowerCase();

  return pokemonName.includes(searchTerm) || pokemonId.includes(searchTerm) || pokemonType.includes(searchTerm);
};

const filterPokemons = (searchTerm) => {
  const allPokemons = document.querySelectorAll('.pokemon');
  let pokemonFound = false;

  allPokemons.forEach(pokemon => {
    if (isPokemonMatching(pokemon, searchTerm)) {
      pokemon.style.display = 'block';
      pokemonFound = true;
    } else {
      pokemon.style.display = 'none';
    }
  });

  return pokemonFound;
};

const handleSearchInput = () => {
  const searchInput = document.getElementById('searchBar');
  searchInput.addEventListener('input', () => {
    if (document.querySelector('.loading')) {
      searchInput.value = '';
    } else {
      const searchTerm = searchInput.value.toLowerCase();
      const pokemonFound = filterPokemons(searchTerm);
      pokemonNotFound(pokemonFound);
    }
  });
};

const showLoadingPopup = () => {
  if (document.querySelector('.loading')) {
    const popupDiv = createElementWithClass('div', 'popup');
    const popupText = createElementWithClass('h3', '', 'Please wait while Pokemons are loading...!!!');
    popupDiv.appendChild(popupText);
    document.body.appendChild(popupDiv);

    setTimeout(() => {
      popupDiv.remove();
    }, 2000);
  }
};

const handleSearchInputClick = () => {
  const searchInput = document.getElementById('searchBar');
  searchInput.addEventListener('click', showLoadingPopup);
};

const searchPokemons = () => {
  handleSearchInputClick();
  handleSearchInput();
};

const createElementWithClass = (tag, className, textContent = '') => {
  const element = document.createElement(tag);
  element.className = className;
  element.innerText = textContent;
  return element;
};

const fetchPokemonImage = (pokemonsDetails) => {
  const pokemonImage = pokemonsDetails.sprites.other.home.front_shiny
    || pokemonsDetails.sprites.other.home.front_default || 'src/images/pokemon-logo-black-transparent.png';
  const image = createElementWithClass('img', 'pokemon-images');
  image.src = pokemonImage;
  const imageDiv = createElementWithClass('div', 'pokemon-images-div');
  imageDiv.appendChild(image);
  return imageDiv;
};

const fetchPokemonId = (pokemonsDetails) => {
  return createElementWithClass('h3', 'pokemon-id', `Id: ${pokemonsDetails.id}`);
};

const fetchPokemonType = (pokemonsDetails) => {
  let types = '';
  pokemonsDetails.types.forEach((typeInfo, index) => {
    types += typeInfo.type.name;
    if (index < pokemonsDetails.types.length - 1) types += ', ';
  });
  return createElementWithClass('h3', 'pokemon-type', `Type: ${types}`);
};

const fetchPokemonName = (pokemonResults, i) => {
  const name = pokemonResults[i].name;
  return createElementWithClass('h1', 'pokemon-name', `Name: ${name}`);
};

const fetchTypeDetails = async (typeInfo) => {
  const response = await fetch(typeInfo.type.url);
  return await response.json();
};

const extractWeaknesses = (typeDetails) => {
  return typeDetails.damage_relations.double_damage_from.map(type => type.name);
};

const fetchPokemonWeaknesses = async (types) => {
  const typeWeaknesses = [];
  for (const typeInfo of types) {
    const typeDetails = await fetchTypeDetails(typeInfo);
    typeWeaknesses.push(...extractWeaknesses(typeDetails));
  }
  return [...new Set(typeWeaknesses)];
};

const createCloseButton = (pokemonMainPopup) => {
  const closeBtn = createElementWithClass('button', 'close-btn', 'Close');
  closeBtn.addEventListener('click', () => {
    pokemonMainPopup.remove();
  });
  return closeBtn;
};

const createPokemonDataElements = (pokemonDetails) => {
  const pokemonImage = fetchPokemonImage(pokemonDetails);
  const pokemonId = fetchPokemonId(pokemonDetails);
  const pokemonType = fetchPokemonType(pokemonDetails);
  const pokemonName = createElementWithClass('h1', 'pokemon-name', `Name: ${pokemonDetails.name}`);
  return [pokemonImage, pokemonName, pokemonId, pokemonType];
};

const createPokemonDetailsElements = (pokemonDetails) => {
  const pokemonHeight = createElementWithClass('p', 'pokemon-height', `Height: ${pokemonDetails.height}`);
  const pokemonWeight = createElementWithClass('p', 'pokemon-weight', `Weight: ${pokemonDetails.weight}`);
  let abilities = '';
  pokemonDetails.abilities.forEach((abilityInfo, index) => {
    abilities += abilityInfo.ability.name;
    if (index < pokemonDetails.abilities.length - 1) abilities += ', ';
  });
  const pokemonAbilities = createElementWithClass('p', 'pokemon-abilities', `Abilities: ${abilities}`);
  return [pokemonHeight, pokemonWeight, pokemonAbilities];
};

const createPokemonMovesElement = (pokemonDetails) => {
  let moves = '';
  pokemonDetails.moves.slice(0, 7).forEach((moveInfo, index) => {
    moves += moveInfo.move.name;
    if (index < pokemonDetails.moves.length - 1) moves += ', ';
  });
  return createElementWithClass('p', 'pokemon-moves', `Moves: ${moves}`);
};

const createPokemonstatisticsElement = (pokemonDetails) => {
  const statsDiv = createElementWithClass('div', 'pokemon-statistics');

  pokemonDetails.stats.forEach(statInfo => {
    const statContainer = createElementWithClass('div', 'stat-container');
    const statName = createElementWithClass('span', 'stat-name', statInfo.stat.name);
    const statValue = createElementWithClass('span', 'stat-value', `:${statInfo.base_stat}`);

    const statBar = createElementWithClass('div', 'stat-bar');
    const statProgress = createElementWithClass('div', 'stat-progress');
    statProgress.style.width = `${statInfo.base_stat}%`; 
    statProgress.style.backgroundColor = 'green'; 

    statBar.appendChild(statProgress);
    statContainer.append(statName, statValue, statBar);
    statsDiv.appendChild(statContainer);
  });

  return statsDiv;
};


const createPokemonWeaknessesElement = async (pokemonDetails) => {
  const weaknesses = await fetchPokemonWeaknesses(pokemonDetails.types);
  return createElementWithClass('p', 'pokemon-weaknesses', `Weaknesses: ${weaknesses.join(', ')}`);
};

const displayPokemonPopup = async (pokemonDetails) => {
  const pokemonMainPopup = createElementWithClass('div', 'pokemon-main-popup');
  const popupDiv = createElementWithClass('div', 'pokemon-popup');

  const closeButton = createCloseButton(pokemonMainPopup);
  const pokemonDataElements = createPokemonDataElements(pokemonDetails);
  const pokemonDetailsElements = createPokemonDetailsElements(pokemonDetails);
  const pokemonMovesElement = createPokemonMovesElement(pokemonDetails);
  const pokemonstatisticsElement = createPokemonstatisticsElement(pokemonDetails);
  const pokemonWeaknessesElement = await createPokemonWeaknessesElement(pokemonDetails);

  popupDiv.append(
    closeButton,
    ...pokemonDataElements,
    ...pokemonDetailsElements,
    pokemonMovesElement,
    pokemonstatisticsElement,
    pokemonWeaknessesElement
  );
  pokemonMainPopup.append(popupDiv);
  document.body.appendChild(pokemonMainPopup);
};


const displayPokemons = async (pokemonResults) => {
  const main = document.querySelector('#main');
  for (let i = 0; i < pokemonResults.length; i++) {
    const pokemon = createElementWithClass('div', 'pokemon');
    try {
      const response = await fetch(pokemonResults[i].url);
      const pokemonsDetails = await response.json();

      const pokemonName = fetchPokemonName(pokemonResults, i);
      const pokemonType = fetchPokemonType(pokemonsDetails);
      const pokemonId = fetchPokemonId(pokemonsDetails);
      const pokemonImage = fetchPokemonImage(pokemonsDetails);
      pokemon.append(pokemonImage, pokemonName, pokemonId, pokemonType);
      main.appendChild(pokemon);

      pokemon.addEventListener('click', async () => {
        await displayPokemonPopup(pokemonsDetails);
      });
    } catch (error) {
    }
  }
};

const hideLoader = () => {
  const loading = document.querySelector('.loading');
  if (loading) {
    loading.remove();
  }
  document.querySelector('#main').style.display = 'flex';
};

const fetchPokemons = async () => {
  try {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    const response = await fetch(apiUrl);
    const pokemonList = await response.json();
    await displayPokemons(pokemonList.results);
  } catch (error) {
  } finally {
    hideLoader();
  }
};

const showLoader = () => {
  const loading = createElementWithClass('div', 'loading');
  const loadingText = createElementWithClass('h1', '', 'Loading Pokemons');
  const loadAnimation = createElementWithClass('p', 'loadAnimation');
  loading.append(loadingText, loadAnimation);
  document.body.appendChild(loading);
};

window.onload = () => {
  showLoader();
  fetchPokemons();
  searchPokemons();
};