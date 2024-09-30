'use strict'

const createImage = (image, name) => {
  const imageContainer = document.createElement('img');
  imageContainer.src = image;
  imageContainer.id = `${name}-image`;
  imageContainer.classList.add('image');
  return imageContainer;
};

const createDetails = (tag, className, text, searchValue) => {
  const detailContainer = document.createElement(tag);
  detailContainer.classList.add(className);
  detailContainer.innerHTML = text.replace(new RegExp(searchValue, 'gi'), (match) => `<mark>${match}</mark>`);
  return detailContainer;
};

const createPokemonContainer = (pokemon, value) => {
  const outerContainer = document.getElementById('outer-container');
  const container = document.createElement('div');
  container.id = pokemon.name;
  container.classList.add('pokemon-container');
  container.appendChild(createDetails('h2', 'pokemon-name', pokemon.name, value));
  container.appendChild(createImage(pokemon.imageUrl, pokemon.name));
  container.appendChild(createDetails('p', 'pokemon-id', pokemon.id.toString(), value));
  container.appendChild(createDetails('p', 'pokemon-type', pokemon.type, value));
  outerContainer.appendChild(container);
};

const displayImageOnHover = (pokemon, image) => {
  image.src = pokemon.imageOnHover;
};

const displayImageOnLeave = (pokemon, image) => {
  image.src = pokemon.imageUrl;
};

const createPopupDetails = (tag, className, array, key, name) => {
  const popupDetailContainer = document.createElement(tag);
  popupDetailContainer.classList.add(className);
  const details = [];
  for (let element of array) {
    details.push(`${element[key][name]}`);
  }
  popupDetailContainer.innerText = details.join(',');
  return popupDetailContainer;
};

const createDivision = (className) => {
  const div = document.createElement('div');
  div.classList.add(className);
  return div;
};
const createLeftDiv = (leftDiv, pokemon) => {
  leftDiv.appendChild(createDetails('h2', 'pokemon-name', pokemon.name));
  leftDiv.appendChild(createImage(pokemon.imageUrl, pokemon.name));
  leftDiv.appendChild(createDetails('p', 'pokemon-id', pokemon.id.toString()));
  return leftDiv;
};

const createButton = (tag, idName, className, text) => {
  const button = document.createElement(tag);
  button.id = idName;
  button.classList.add(className);
  button.innerHTML = text;
  return button;
};

const createMoveWeaknessDiv = (movesWeaknessDiv, pokemon) => {
  movesWeaknessDiv.appendChild(createButton('button', `${pokemon.name}-moves-btn`, 'moves-btn', 'Moves'));
  movesWeaknessDiv.appendChild(createButton('button', `${pokemon.name}-weakness-btn`, 'weakness-btn', 'Weakness'));
  return movesWeaknessDiv;
};

const createPokemonsDetailsDiv = (pokemonDetailsDiv, pokemon) => {
  pokemonDetailsDiv.appendChild(createPopupDetails('p', 'pokemon-type', pokemon.types, 'type', 'name'));
  pokemonDetailsDiv.appendChild(createPopupDetails('p', 'pokemon-ability', pokemon.abilities, 'ability', 'name'));
  pokemonDetailsDiv.appendChild(createPopupDetails('p', 'pokemon-statistics', pokemon.statistics, 'stat', 'name'));
  return pokemonDetailsDiv;
};

const createHeightWeightDiv = (heightWeightDiv, pokemon) => {
  heightWeightDiv.appendChild(createDetails('p', 'pokemon-height', pokemon.height.toString()));
  heightWeightDiv.appendChild(createDetails('p', 'pokemon-weight', pokemon.weight.toString()));
  return heightWeightDiv;
};

const createCloseButton = () => {
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.id = 'close';
  closeButton.innerText = 'X';
  return closeButton;
}

const createPopupContainer = (pokemon) => {
  const popup = createDivision('pokemon-popup-container');
  const leftDiv = createDivision('left-div');
  const rightDiv = createDivision('right-div');
  const heightWeightDiv = createDivision('height-weight-div');
  const pokemonDetailsDiv = createDivision('pokemon-details-div');
  const movesWeaknessDiv = createDivision('moves-weakness');

  popup.appendChild(createLeftDiv(leftDiv, pokemon));
  rightDiv.appendChild(createHeightWeightDiv(heightWeightDiv, pokemon));
  rightDiv.appendChild(createPokemonsDetailsDiv(pokemonDetailsDiv, pokemon));
  rightDiv.appendChild(createMoveWeaknessDiv(movesWeaknessDiv, pokemon));
  popup.appendChild(rightDiv);
  popup.appendChild(createCloseButton());

  return popup;
};

const closePopupContainer = () => {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
  const popup = document.getElementsByClassName('pokemon-popup-container')[0];
  const movesContainer = document.getElementsByClassName('moves-container')[0];
  const body = document.body;
  body.removeChild(popup);
  body.removeChild(movesContainer);
};

const createPopupActions = () => {
  const close = document.getElementById('close');
  close.addEventListener('click', closePopupContainer);
};

const showPopupContainer = (popup) => {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
  const body = document.body;
  body.appendChild(popup);
  createPopupActions();
};

const displayMoves = (array, key, name) => {
  const body = document.body;
  body.appendChild(createPopupDetails('div', 'moves-container', array, key, name));
};
