'use strict';

const capitalizeFirstLetter = (textContent) => {
  return textContent.charAt(0).toUpperCase() + textContent.slice(1);
};

const createNewElement = (tag, className, textContent = '') => {
  const element = document.createElement(tag);
  element.classList.add(className);
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
  const typeName = typeInfo.type.name;
  const typeElement = document.createElement('div');
  typeElement.classList.add('pokemon-type');
  typeElement.classList.add(typeName);
  typeElement.textContent = capitalizeFirstLetter(typeName);
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

const createDetailElement = (label, value) => {
  const detailContainer = document.createElement('div');
  const detailLabel = document.createElement('h3');
  const detailValue = document.createElement('p');

  detailLabel.textContent = `${label}:`;
  detailValue.textContent = value;

  detailContainer.appendChild(detailLabel);
  detailContainer.appendChild(detailValue);

  return detailContainer;
};

const createDetailList = (label, values) => {
  const detailContainer = document.createElement('div');
  const detailLabel = document.createElement('h3');
  const detailValue = document.createElement('ul');

  detailLabel.textContent = `${label}:`;

  values.forEach(value => {
    const item = document.createElement('li');
    item.textContent = value;
    detailValue.appendChild(item);
  });

  detailContainer.appendChild(detailLabel);
  detailContainer.appendChild(detailValue);

  return detailContainer;
};

const createPokemonDetailsContent = (pokemon) => {
  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('pokemon-details-content');

  const name = createDetailElement('Name', capitalizeFirstLetter(pokemon.name));
  const id = createDetailElement('ID', pokemon.id);

  const pokemonImageContainer = createPokemonImageContainer(pokemon);
  const pokemonTypes = createPokemonTypesElement(pokemon);

  const height = createDetailElement('Height', pokemon.height);
  const weight = createDetailElement('Weight', pokemon.weight);

  const pokemonAbilities = getAbilities(pokemon);
  const abilities = createDetailList('Abilities', pokemonAbilities);

  const pokemonMoves = getPokemonMoves(pokemon);
  const moves = createDetailList('Moves', pokemonMoves.slice(0, 5));

  const pokemonsStats = getPokemonStats(pokemon);
  const stats = createDetailList(
    'Stats',
    pokemonsStats.map((s) => `${capitalizeFirstLetter(s.name)}: ${s.value}`)
  );

  detailsContainer.appendChild(name);
  detailsContainer.appendChild(id);
  detailsContainer.appendChild(pokemonImageContainer);
  detailsContainer.appendChild(pokemonTypes);
  detailsContainer.appendChild(height);
  detailsContainer.appendChild(weight);
  detailsContainer.appendChild(abilities);
  detailsContainer.appendChild(moves);
  detailsContainer.appendChild(stats);

  getPokemonWeakness(pokemon).then((weaknesses) => {
    const weaknessArray = getWeaknessArray(weaknesses);
    const weaknessesElement = createDetailList(
      'Weaknesses',
      weaknessArray
    );
    detailsContainer.appendChild(weaknessesElement);
  });

  return detailsContainer;
};

const createPokemonImageContainer = (pokemon) => {
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('pokemon-image-container');
  const pokemonImage = createPokemonImage(pokemon);
  imageContainer.appendChild(pokemonImage);

  return imageContainer;
};

const getWeaknessArray = (weaknesses) => {
  return weaknesses
    .map((weak) =>
      weak.damage_relations.double_damage_from.map((w) => w.name)
    )
    .reduce((acc, curr) => acc.concat(curr), []);
};

const createPokemonCard = (pokemon, pokemonDetailsPopup) => {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');

  pokemonCard.appendChild(createPokemonImage(pokemon));
  pokemonCard.appendChild(createPokemonNameElement(pokemon));
  pokemonCard.appendChild(createPokemonIdElement(pokemon));
  pokemonCard.appendChild(createPokemonTypesElement(pokemon));

  pokemonCard.addEventListener('click', () => {
    pokemonDetailsPopup.showModal();
  });

  return pokemonCard;
};

const fetchPokemonDetails = async (pokemon) => {
  const pokemonDetails = await fetch(pokemon.url);
  const parsedPokemonDetails = await pokemonDetails.json();
  return parsedPokemonDetails;
};

const renderPokemons = async (pokemons) => {
  const pokemonGrid = document.getElementById('pokemon-grid');
  pokemonGrid.innerHTML = '';
  const pokemonFetchPromises = pokemons.map(async (pokemon) => {
    try {
      const pokemonDetails = await fetchPokemonDetails(pokemon);
      const pokemonDetailsPopup = createPokemonDetailsPopup(pokemonDetails);
      const pokemonCard = createPokemonCard(pokemonDetails, pokemonDetailsPopup);
      pokemonGrid.appendChild(pokemonCard);
    } catch (error) {
      showPopup(`Error fetching details for Pokémon ${pokemon.name}:`);
      console.error(error)
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
