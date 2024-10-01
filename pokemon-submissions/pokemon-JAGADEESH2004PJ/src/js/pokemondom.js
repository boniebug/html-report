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

const showDetailsPopup = async (pokemonData) => {
  const overlay = createOverlay();
  const popup = createPopup();
  const closeButton = createCloseButton();

  popup.appendChild(closeButton);
  closeButton.addEventListener('click', () => closePopup(popup, overlay));

  const image = createImage(pokemonData);
  popup.appendChild(image);

  const detailsContainer = await appendAllDetails(pokemonData);
  popup.appendChild(detailsContainer);

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  overlay.addEventListener('click', () => {
      closePopup(popup, overlay);
  });
  popup.style.display = 'block';
};


const closePopup = (popup, overlay) => {
  overlay.remove();
  popup.remove();


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

const createImage = (pokemonData) => {
  const img = document.createElement('img');
  img.src = pokemonData.sprites.other.home.front_default || '';
  img.className = 'popupImage';
  return img;
};

const appendAllDetails = async (pokemonData) => {
  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'popupDetailsContainer';

  appendBasicDetails(detailsContainer, pokemonData);
  appendTypes(detailsContainer, pokemonData);
  appendAbilities(detailsContainer, pokemonData);
  appendStatistics(detailsContainer, pokemonData);
  appendMoves(detailsContainer, pokemonData);

  const weaknesses = await getWeaknesses(pokemonData);
  appendWeakness(detailsContainer, weaknesses);

  return detailsContainer;
};


const appendBasicDetails = (container, pokemonData) => {
  const name = document.createElement('h2');
  name.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
  container.appendChild(name);

  const id = document.createElement('p');
  id.textContent = `ID: ${pokemonData.id}`;
  container.appendChild(id);

  const height = document.createElement('p');
  height.textContent = `Height: ${pokemonData.height} metres`;
  container.appendChild(height);

  const weight = document.createElement('p');
  weight.textContent = `Weight: ${pokemonData.weight} Kg`;
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
  for (let i = 0; i <pokemonData.moves.length; i++) {
    moveNames.push(pokemonData.moves[i].move.name);
  }
  moves.textContent = `Moves: ${moveNames.join(', ')}`;
  container.appendChild(moves);
};

const appendWeakness = (container, weaknesses) => {
  const weaknessParagraph = document.createElement('p');
  weaknessParagraph.textContent = `Weakness: ${weaknesses.length > 0 ? weaknesses.join(', ') : 'None'}`;
  container.appendChild(weaknessParagraph);
};

const getWeaknesses = async (pokemon) => {
  const weaknesses = [];

  for (let i = 0; i < pokemon.types.length; i++) {
      const typeInfo = await fetchConvertData(pokemon.types[i].type.url);
      if (typeInfo) {
          for (let j = 0; j < typeInfo.damage_relations.double_damage_from.length; j++) {
              const weakness = typeInfo.damage_relations.double_damage_from[j].name;
              if (!weaknesses.includes(weakness)) {
                  weaknesses.push(weakness);
              }
          }
          for (let j = 0; j < typeInfo.damage_relations.half_damage_to.length; j++) {
              const weakness = typeInfo.damage_relations.half_damage_to[j].name;
              if (!weaknesses.includes(weakness)) {
                  weaknesses.push(weakness);
              }
          }
      }
  }
  return weaknesses;
};

