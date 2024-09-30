'use strict';

const createPTag = (text, className, id) => {
  const pTag = document.createElement('p');
  className && pTag.classList.add(className);
  id && pTag.setAttribute('id', id);
  pTag.innerText = text;
  return pTag;
};

const createImageTag = (imageUrl, className, id) => {
  const pokemonImage = document.createElement('img');
  pokemonImage.src = imageUrl;
  className && pokemonImage.classList.add(className);
  id && pokemonImage.setAttribute('id', id);
  return pokemonImage;
};

const displayPokemons = (pokemonData) => {
  const parent = document.getElementsByClassName('pokemon-main-container')[0];
  parent.innerHTML = '';
  for (const thisPokemon of pokemonData) {
    const currentContainer = document.createElement('section');
    currentContainer.id = `pokemon-unit-${thisPokemon.id}`;
    currentContainer.className = 'pokemon-unit';
    const pokemonImage = createImageTag(thisPokemon.image, 'pokemon-image', `pokemon-image-${thisPokemon.id}`);
    const pokemonName = createPTag(`Name: ${thisPokemon.name}`, 'pokemon-name', `pokemon-name-${thisPokemon.name}`);
    const pokemonId = createPTag(`Id: ${thisPokemon.id}`, 'pokemon-id', `pokemon-id-${thisPokemon.id}`);
    const pokemonType = createPTag(`Types: ${thisPokemon.type}`, 'pokemon-type', `pokemon-type-${thisPokemon.type}`);
    currentContainer.append(pokemonImage, pokemonName, pokemonId, pokemonType);
    parent.appendChild(currentContainer);
    currentContainer.addEventListener('click', () => {
      createFullDetails(thisPokemon);
    })
  }
  return;
};

const removeFullDetails = () => {
  const detailsContainer = document.getElementsByClassName('pokemon-detail-unit')[0];
  detailsContainer.remove();
  const pokemonContainer = document.getElementsByClassName('pokemon-main-container')[0];
  pokemonContainer.classList.remove('disabled');
  const search = document.getElementById('search-bar');
  search.classList.remove('disabled');
};

const createFullDetails = (pokemonDetailsObject) => {
  const mainContainer = document.getElementsByClassName('main-container')[0];
  const pokemonUnit = document.getElementsByClassName('pokemon-main-container')[0];
  pokemonUnit.classList.add('disabled');
  const search = document.getElementById('search-bar');
  search.classList.add('disabled');
  const parentContainer = document.createElement('section');
  parentContainer.className = 'pokemon-detail-unit';
  const closeButton = document.createElement('button');
  closeButton.id = 'detail-unit-close';
  closeButton.addEventListener('click', () => removeFullDetails());
  const id = pokemonDetailsObject.id;

  const pokemonImage = createImageTag(pokemonDetailsObject.image, 'detail-unit-image', `detail-unit-image-${id}`);
  const pokemonName = createPTag(`Name: ${pokemonDetailsObject.name}`, 'detail-unit-name', `detail-unit-name-${id}`);
  const pokemonId = createPTag(id, 'detail-unit-id', `detail-unit-id-${id}`);
  const pokemonType = createPTag(`Types: ${pokemonDetailsObject.type}`, 'detail-unit-type', `detail-unit-type-${id}`);
  const pokemonHeight = createPTag(`Height: ${pokemonDetailsObject.extraDetails.height}`, 'detail-unit-heigth', `detail-unit-heigth-${id}`);
  const pokemonweight = createPTag(`weight: ${pokemonDetailsObject.extraDetails.weight}`, 'detail-unit-weight', `detail-unit-weight-${id}`);
  const pokemonAbility = createPTag(`Abilities: ${pokemonDetailsObject.extraDetails.abilities}`, 'detail-unit-abilities', `detail-unit-abilities-${id}`);
  const pokemonMoves = createPTag(`Moves: ${pokemonDetailsObject.extraDetails.moves}`, 'detail-unit-moves', `detail-unit-moves-${id}`);
  const pokemonWeakness = createPTag(`Weakness: ${pokemonDetailsObject.extraDetails.weakness} types`, 'detail-unit-weakness', `detail-unit-weakness-${id}`);
  const pokemonStats = createPTag(`Stats: ${pokemonDetailsObject.extraDetails.stats}`, 'detail-unit-stats', `detail-unit-stats-${id}`);

  parentContainer.append(closeButton, pokemonName, pokemonId, pokemonImage, pokemonType);
  parentContainer.append(pokemonHeight, pokemonweight, pokemonAbility, pokemonMoves);
  parentContainer.append(pokemonWeakness, pokemonStats);
  mainContainer.append(parentContainer);
};
