'use strict';

const capitalizeFirstLetter = (textContent) => {
  return textContent.charAt(0).toUpperCase() + textContent.slice(1);
};

const createNewElement = (tag, className, textContent = '') => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (textContent) element.textContent = textContent;
  return element;
};

const createPokemonImage = (pokemon) => {
  const pokemonImage = createNewElement('img','pokemon-img');
  pokemonImage.src =
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.other.home.front_default ||
    'src/images/no-image.webp';
  pokemonImage.alt = pokemon.name;
  return pokemonImage;
};

const createPokemonNameElement = (pokemon) => {
  const text = capitalizeFirstLetter(pokemon.name);
  return createNewElement('h2', 'pokemon-name', text);
};

const createPokemonIdElement = (pokemon) => {
  return createNewElement('div', 'pokemon-id', pokemon.id);
};

const createPokemonTypeElement = (typeInfo) => {
  const typeName = typeInfo.type.name;
  const typeElement = createNewElement('div','pokemon-type',capitalizeFirstLetter(typeName));
  typeElement.classList.add(typeName);
  return typeElement;
};

const createPokemonTypesElement = (pokemon) => {
  const pokemonTypesElement = createNewElement('div', 'pokemon-types');
  pokemon.types.forEach((typeInfo) => {
    pokemonTypesElement.appendChild(createPokemonTypeElement(typeInfo));
  });
  return pokemonTypesElement;
};

const createDetailElement = (label, value) => {
  const detailContainer = createNewElement('div', 'pokemon-detail');
  const detailLabel = createNewElement('h3', 'pokemon-detail-label', `${label}:`);
  const detailValue = createNewElement('p', 'pokemon-detail-value', value);

  detailContainer.appendChild(detailLabel);
  detailContainer.appendChild(detailValue);
  
  return detailContainer;
};

const createDetailList = (label, values) => {
  const detailContainer = createNewElement('div', 'pokemon-detail-list');
  const detailLabel = createNewElement('h3', 'pokemon-detail-label', `${label}:`);
  const detailList = createNewElement('ul', 'pokemon-detail-values');

  values.forEach(value => {
    const listItem = createNewElement('li', 'pokemon-detail-item', value);
    detailList.appendChild(listItem);
  });

  detailContainer.appendChild(detailLabel);
  detailContainer.appendChild(detailList);

  return detailContainer;
};

const createPokemonDetailsContent = (pokemon) => {
  const detailsContainer = createNewElement('div', 'pokemon-details-content');

  detailsContainer.appendChild(createDetailElement('Name', capitalizeFirstLetter(pokemon.name)));
  detailsContainer.appendChild(createDetailElement('ID', pokemon.id));
  detailsContainer.appendChild(createPokemonImageContainer(pokemon));
  detailsContainer.appendChild(createPokemonTypesElement(pokemon));
  detailsContainer.appendChild(createDetailElement('Height', pokemon.height));
  detailsContainer.appendChild(createDetailElement('Weight', pokemon.weight));
  detailsContainer.appendChild(createDetailList('Abilities', getAbilities(pokemon)));
  detailsContainer.appendChild(createDetailList('Moves', getPokemonMoves(pokemon).slice(0, 5)));
  detailsContainer.appendChild(createDetailList('Stats', getPokemonStats(pokemon).map(s => `${capitalizeFirstLetter(s.name)}: ${s.value}`)));

  const weaknessesContainer = createNewElement('div', 'pokemon-weaknesses');
  const loadingWeaknesses = createNewElement('p', 'loading-text', 'Loading weaknesses...');
  weaknessesContainer.appendChild(loadingWeaknesses);
  detailsContainer.appendChild(weaknessesContainer);

  loadWeaknesses(pokemon, weaknessesContainer);

  return detailsContainer;
};

const loadWeaknesses = (pokemon, container) => {
  const loadingText = container.querySelector('.loading-text');

  getPokemonWeakness(pokemon).then(weaknesses => {
    loadingText.remove();
    const weaknessesList = createDetailList('Weaknesses', getWeaknessArray(weaknesses));
    container.appendChild(weaknessesList);
  }).catch(error => {
    loadingText.textContent = 'Failed to load weaknesses.';
  });
};

const createPokemonImageContainer = (pokemon) => {
  const imageContainer = createNewElement('div', 'pokemon-image-container');
  imageContainer.appendChild(createPokemonImage(pokemon));

  return imageContainer;
};

const getWeaknessArray = (weaknesses) => {
  return weaknesses
    .map((weakness) => weakness.damage_relations.double_damage_from.map((damageType) => damageType.name))
    .reduce((allWeaknesses, currentWeaknesses) => allWeaknesses.concat(currentWeaknesses), []);
};


const createPokemonCard = (pokemon, pokemonDetailsContent) => {
  const pokemonCard = createNewElement('div', 'pokemon-card');

  pokemonCard.appendChild(createPokemonImage(pokemon));
  pokemonCard.appendChild(createPokemonNameElement(pokemon));
  pokemonCard.appendChild(createPokemonIdElement(pokemon));
  pokemonCard.appendChild(createPokemonTypesElement(pokemon));

  pokemonCard.addEventListener('click', () => {
    const pokemonDetailsPopup = createPopup(pokemonDetailsContent, 'popup-details', false);
    pokemonDetailsPopup.showModal();
  });

  return pokemonCard;
};

const fetchPokemonDetails = async (pokemon) => {
  const response = await fetch(pokemon.url);
  return await response.json();
};

const renderPokemons = async (pokemons) => {
  const pokemonGrid = document.getElementById('pokemon-grid');
  pokemonGrid.innerHTML = '';
  const pokemonFetchPromises = pokemons.map(async (pokemon) => {
    try {
      const pokemonDetails = await fetchPokemonDetails(pokemon);
      const pokemonDetailsContent = createPokemonDetailsContent(pokemonDetails);
      const pokemonCard = createPokemonCard(pokemonDetails, pokemonDetailsContent);
      pokemonGrid.appendChild(pokemonCard);
    } catch (error) {
      const errorPopup = createPopup(`Error fetching details for Pokémon ${pokemon.name}:`);
      errorPopup.showModal();
      console.error(error);
    }
  });
  await Promise.all(pokemonFetchPromises);
  hideLoadingIndicator();
};

const fetchPokemons = async () => {
  showLoadingIndicator();
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const pokemons = await response.json();
  return pokemons.results;
};

const main = async () => {
  const pokemons = await fetchPokemons();
  await renderPokemons(pokemons);
  addSearchButtonEventListener();
};

window.onload = main;
