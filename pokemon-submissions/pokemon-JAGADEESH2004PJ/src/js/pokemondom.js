'use strict';
const renderPokemons = (pokemonDataArray) => {
  createPokemonListDiv();
  const pokemonList = document.getElementById('pokemonList');
  for (let index = 0; index < pokemonDataArray.length; index++) {
    const card = document.createElement('div');
    card.className = 'pokemonCard';
    createAndAppend(pokemonDataArray[index], card);
    pokemonList.appendChild(card);
  }
};

const createPokemonListDiv = () => {
  const pokemonList = document.createElement('div');
  pokemonList.className = 'pokemonList';
  pokemonList.setAttribute('id', 'pokemonList');
  document.body.appendChild(pokemonList);
};

const createAndAppend = (pokemonData, pokemonCard) => {
  createAndAppendName(pokemonData, pokemonCard);
  createAndAppendImg(pokemonData, pokemonCard);
  createAndAppendId(pokemonData, pokemonCard);
  createAndAppendType(pokemonData, pokemonCard);
  createAndAppendButton(pokemonData, pokemonCard);
};

const createAndAppendName = (pokemonData, pokemonCard) => {
  const pokemonName = document.createElement('h2');
  pokemonName.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
  pokemonCard.appendChild(pokemonName);
};

const createAndAppendImg = (pokemonData, pokemonCard) => {
  const img = document.createElement('img');
  img.className = 'pokemonImage';
  if (pokemonData.sprites.other.home.front_default !== null) {
    img.src = pokemonData.sprites.other.home.front_default;
  pokemonCard.appendChild(img);
  }
};

const createAndAppendId = (pokemonData, pokemonCard) => {
  const id = document.createElement('p');
  id.className = 'idOfPokemon';
  id.textContent = `ID: ${pokemonData.id}`;
  pokemonCard.appendChild(id);
};

const createAndAppendType = (pokemonData, pokemonCard) => {
  const types = document.createElement('p');
  types.className = 'typeOfPokemon';
  const typeNames = [];
  for (let i = 0; i < pokemonData.types.length; i++) {
    typeNames.push(pokemonData.types[i].type.name);
  }
  types.textContent = `Types: ${typeNames.join(', ')}`;
  pokemonCard.appendChild(types);
};

const createMoreDetailsBtn = () => {
  const moreDetailsBtn = document.createElement('button');
  moreDetailsBtn.className = 'moreDetailsBtn';
  moreDetailsBtn.innerText = 'More Details...';
  return moreDetailsBtn;
}

const createAndAppendButton = (pokemonData, pokemonCard) => {
  const moreDetailsButton = createMoreDetailsBtn();
  moreDetailsButton.onclick = () => showDetailsPopup(pokemonData);
  pokemonCard.appendChild(moreDetailsButton);
};

const showDetailsPopup = (pokemonData) => {
  const overlay = createOverlay();
  const popup = createPopup();
  const closeButton = createCloseButton();
  popup.appendChild(closeButton);
  closeButton.addEventListener('click', () => closPopup(popup, overlay));
  const contentContainer = document.createElement('div');
  contentContainer.className = 'popupContent';
  popup.appendChild(contentContainer);
  const imgContainer = createImageContainer(pokemonData);
  contentContainer.appendChild(imgContainer);

  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'popupDetailsContainer';

  appendBasicDetails(detailsContainer, pokemonData);
  appendTypes(detailsContainer, pokemonData);
  appendAbilities(detailsContainer, pokemonData);
  appendStatistics(detailsContainer, pokemonData);
  appendMoves(detailsContainer, pokemonData);

  contentContainer.appendChild(detailsContainer);
  document.body.appendChild(popup);

  overlay.addEventListener('click', () => {
    document.body.removeChild(overlay);
    document.body.removeChild(popup);
  });
  popup.style.display = 'block';
};

const closPopup = (popup, overlay) => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
};

const createCloseButton = () =>{
  const closeBtn = document.createElement('button');
  closeBtn.className = 'closeBtn';
  closeBtn.innerText = 'x';
  return closeBtn;
}

const createOverlay = () => {
  const overlay = document.createElement('div');
  overlay.className = 'popupOverlay';
  document.body.appendChild(overlay);
  return overlay;
};

const createPopup = () => {
  const popup = document.createElement('div');
  popup.className = 'popup';
  return popup;
};

const createImageContainer = (pokemonData) => {
  const imgContainer = document.createElement('div');
  imgContainer.className = 'popupImageContainer';

  const img = document.createElement('img');
  img.src = pokemonData.sprites.other.home.front_default || '';
  img.className = 'popupImage';
  imgContainer.appendChild(img);

  return imgContainer;
};

const appendBasicDetails = (container, pokemonData) => {
  const name = document.createElement('h2');
  name.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
  container.appendChild(name);

  const id = document.createElement('p');
  id.textContent = `ID: ${pokemonData.id}`;
  container.appendChild(id);

  const height = document.createElement('p');
  height.textContent = `Height: ${pokemonData.height}`;
  container.appendChild(height);

  const weight = document.createElement('p');
  weight.textContent = `Weight: ${pokemonData.weight}`;
  container.appendChild(weight);
};

const appendTypes = (container, pokemonData) => {
  const types = document.createElement('p');
  let typeNames = [];
  for (let i = 0; i < pokemonData.types.length; i++) {
    typeNames.push(pokemonData.types[i].type.name);
  }
  types.textContent = `Types: ${typeNames.join(', ')}`;
  container.appendChild(types);
};

const appendAbilities = (container, pokemonData) => {
  const abilities = document.createElement('p');
  let abilityNames = [];
  for (let i = 0; i < pokemonData.abilities.length; i++) {
    abilityNames.push(pokemonData.abilities[i].ability.name);
  }
  abilities.textContent = `Abilities: ${abilityNames.join(', ')}`;
  container.appendChild(abilities);
};

const appendStatistics = (container, pokemonData) => {
  const stats = document.createElement('p');
  let statEntries = [];
  for (let i = 0; i < pokemonData.stats.length; i++) {
    statEntries.push(`${pokemonData.stats[i].stat.name}: ${pokemonData.stats[i].base_stat}`);
  }
  stats.textContent = `Statistics: ${statEntries.join(', ')}`;
  container.appendChild(stats);
};

const appendMoves = (container, pokemonData) => {
  const moves = document.createElement('p');
  let moveNames = [];
  for (let i = 0; i < 60; i++) {
    moveNames.push(pokemonData.moves[i].move.name);
  }
  moves.textContent = `Moves: ${moveNames.join(', ')}`;
  container.appendChild(moves);
};
