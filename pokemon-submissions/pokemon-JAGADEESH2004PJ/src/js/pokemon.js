'use strict';
const fetchConvertData = async (url) => {
  try {
    const response = await fetch(url);
    const pokemonData = await response.json();
    return pokemonData;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const fetchAllPokemons = async () => {
  const allPokemons = [];
  const loadingElement = document.querySelector('#loading');
  loadingElement.style.display = 'block';
  setTimeout(async () => {
    const data = await fetchConvertData(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`);
    for (const pokemon of data.results) {
      allPokemons.push(pokemon);
    }
    loadingElement.style.display = 'none';
    for (let i = 0; i < allPokemons.length; i++) {
      await appendToDom(allPokemons[i]);
    }
  }, 4000);
};

const appendToDom = async (pokemon) => {
  try {
    const data = await fetchConvertData(pokemon.url);
    const card = document.createElement('div');
    card.className = 'pokemonCard';
    createAndAppend(data, card);
  } catch (error) {
    console.log('Failed to load Pokémon data:', error);
  }
};

const createAndAppend = (pokemonData, pokemonCard) => {
  createAndAppendName(pokemonData, pokemonCard)
  createAndAppendImg(pokemonData, pokemonCard)
  createAndAppendId(pokemonData, pokemonCard);
  createAndAppendType(pokemonData, pokemonCard);
  document.getElementById('pokemonList').appendChild(pokemonCard);
};

const createAndAppendName = (pokemonData, pokemonCard) => {
  const pokemonName = document.createElement('h2');
  pokemonName.textContent = `${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name.slice(1)}`;
  pokemonCard.appendChild(pokemonName);
};

const createAndAppendImg = (pokemonData, pokemonCard) => {
  const img = document.createElement('img');
  img.className = 'pokemonImage'
  img.src = pokemonData.sprites.front_default;
  img.alt = pokemonData.name;
  pokemonCard.appendChild(img);

};

const createAndAppendId = (pokemonData, pokemonCard) => {
  const id = document.createElement('p');
  id.textContent = `ID: ${pokemonData.id}`;
  pokemonCard.appendChild(id);
};

const createAndAppendType = (pokemonData, pokemonCard) => {
  const types = document.createElement('p');
  const typeNames = [];
  for (let i = 0; i < pokemonData.types.length; i++) {
    typeNames.push(pokemonData.types[i].type.name);
  }
  types.textContent = `Types: ${typeNames.join(', ')}`;
  pokemonCard.appendChild(types);
};

const searchFunction = () => {
  const userInput = document.querySelector('.searchBox').value.toLowerCase();
  const possibilities = document.querySelectorAll('#pokemonList .pokemonCard');
  const noResultsMessage = document.querySelector('#noResultsMessage');
  if (userInput === '') {
    showAllPokemons(possibilities, noResultsMessage);
  } else {
    filterPokemons(possibilities, userInput, noResultsMessage);
  }
};

const showAllPokemons = (possibilities, noResultsMessage) => {
  for (const suggestion of possibilities) {
    suggestion.style.display = 'block';
  }
  noResultsMessage.style.display = 'none';
};

const filterPokemons = (possibilities, userInput, noResultsMessage) => {
  let isFound = false;
  for (const suggestion of possibilities) {
    const suggestionText = suggestion.textContent.toLowerCase();
    if (suggestionText.includes(userInput)) {
      suggestion.style.display = 'block';
      isFound = true;
    } else {
      suggestion.style.display = 'none';
    }
  }
  if (!isFound) {
    noResultsMessage.textContent = 'No Pokémon found';
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';
  }
};

const stillLoading = () => {
  const pTag = document.createElement('p');
  pTag.innerText = 'Pokemons are still loading...Please wait..';
  pTag.className = 'stillLoading';
  document.body.appendChild(pTag);
  setTimeout(() => {
    pTag.remove();
    document.querySelector('.searchBox').value = '';
  }, 2000);
};

window.onload = () => {
  fetchAllPokemons();
  document.querySelector('.searchBox').addEventListener('input', () => {
    let state = document.querySelector('.pokemonList').textContent;
    if (state === '') {
      stillLoading();
    } else {
      searchFunction();
    }
  });
};
