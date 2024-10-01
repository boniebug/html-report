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

const createFullDetails = (pokemonDetails) => {
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
  const id = pokemonDetails.id;

  const pokemonName = createPTag(`Name: ${pokemonDetails.name}`, 'detail-unit-name');
  const pokemonId = createPTag(id, 'detail-unit-id');
  const pokemonImage = createImageTag(pokemonDetails.image, 'detail-unit-image');
  const pokemonType = createPTag(`Types: ${pokemonDetails.type}`, 'detail-unit-type');
  const pokemonHeight = createPTag(`Height: ${pokemonDetails.extraDetails.height}`, 'detail-unit-heigth');
  const pokemonweight = createPTag(`weight: ${pokemonDetails.extraDetails.weight}`, 'detail-unit-weight');
  const pokemonAbility = createPTag(`Abilities: ${pokemonDetails.extraDetails.abilities}`, 'detail-unit-abilities');
  const pokemonMoves = createPTag(`Moves: ${pokemonDetails.extraDetails.moves.join('\n')}`, 'detail-unit-moves');
  const pokemonWeakness = createPTag(`Weakness: ${pokemonDetails.extraDetails.weakness.join(', ')}`, 'detail-unit-weakness');
  const pokemonStats = createPTag(`Stats: ${pokemonDetails.extraDetails.stats.join(', ')}`, 'detail-unit-stats');
  parentContainer.append(closeButton, pokemonName, pokemonId, pokemonImage, pokemonType);
  parentContainer.append(pokemonHeight, pokemonweight, pokemonAbility, pokemonMoves);
  parentContainer.append(pokemonWeakness, pokemonStats);
  mainContainer.append(parentContainer);
};
