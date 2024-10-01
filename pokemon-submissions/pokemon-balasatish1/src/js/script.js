'use strict';

const showAbilities = (abilities) => {
  const abilitySpan = document.querySelector('.abilities');
  abilitySpan.innerHTML = '';
  abilities.forEach((ability) => abilitySpan.append(ability + ', '));
};

const showStats = (stats) => {
  const statsBox = document.querySelector('.stats-list');
  statsBox.innerHTML = '';
  for (const key in stats) {
    const newStat = document.createElement('li');
    const newSpan = document.createElement('span');
    newSpan.innerText = stats[key];
    newStat.append(key, ': ', newSpan);
    statsBox.appendChild(newStat);
  }
};

const showMoves = (moves) => {
  const movesBox = document.querySelector('.moves-list');
  movesBox.innerHTML = '';
  moves.forEach((move) => {
    const newMove = document.createElement('li');
    newMove.innerText = move;
    movesBox.appendChild(newMove);
  });
};

const showWeakness = (weaknessList) => {
  const weaknessSpan = document.querySelector('.weakness');
  weaknessSpan.innerHTML = '';
  weaknessList.forEach((weakness) => weaknessSpan.append(weakness + ', '));
};

const showPrimaryData = (pokemonData) => {
  document.querySelector('.id').innerText = pokemonData.id;
  document.querySelector('.name').innerText = pokemonData.name;
  document.querySelector('.type').innerText = pokemonData.type;
  document.querySelector('.height').innerText = pokemonData.height + ' Mts';
  document.querySelector('.weight').innerText = pokemonData.weight + ' Kgs';
  document.querySelector('.full-image').src = pokemonData.imageUrl;
};

const splitData = async function (pokemon, allPokemonData) {
  const id = parseInt(pokemon.children[1].firstElementChild.innerText);
  const pokemonData = allPokemonData.find(
    (eachPokeonData) => eachPokeonData.id === id
  );
  showPrimaryData(pokemonData);
  showAbilities(pokemonData.abilities);
  showStats(pokemonData.stats);
  showMoves(pokemonData.moves);
  showWeakness(pokemonData.weakness);
};

const showAllPokemonData = function (allPokemonData) {
  const allPokemon = document.querySelectorAll('.pokemon');
  allPokemon.forEach((pokemon) => {
    pokemon.addEventListener('click', () => {
      document.querySelector('.loading-container').style.visibility = 'visible';
      document.querySelector('.pokemon-details').style.visibility = 'visible';
      splitData(pokemon, allPokemonData);
    });
  });
};

const closeBtnFun = () => {
  const closeDetailsBtn = document.querySelector('.close-details-btn');
  closeDetailsBtn.addEventListener('click', () => {
    document.querySelector('.pokemon-details').style.visibility = 'hidden';
    document.querySelector('.loading-container').style.visibility = 'hidden';
  });
};

const findPokemonAndRender = function (
  searchValue,
  pokemonGallery,
  allPokemonData
) {
  for (const pokemonData of allPokemonData) {
    if (
      pokemonData.name.includes(searchValue) ||
      pokemonData.type.includes(searchValue) ||
      pokemonData.id.toString().includes(searchValue)
    ) {
      pokemonGallery.appendChild(pokemonData.element);
    }
  }
};

const searchPokemon = function (allPokemonData) {
  const searchInput = document.querySelector('.search-pokemon-input');
  const pokemonGallery = document.querySelector('.pokemon-gallery');
  searchInput.addEventListener('input', () => {
    pokemonGallery.innerHTML = '';
    const searchValue = searchInput.value.toLowerCase().trim();
    findPokemonAndRender(searchValue, pokemonGallery, allPokemonData);
  });
};

const createPara = function (text, value) {
  const paraTag = document.createElement('p');
  const spanTag = document.createElement('span');
  spanTag.innerText = value;
  paraTag.append(text, spanTag);
  return paraTag;
};

const createPokemonDiv = function (pokemonData) {
  const divTag = document.createElement('div');
  divTag.classList.add('pokemon');
  const image = document.createElement('img');
  image.src = pokemonData.imageUrl;
  divTag.append(
    image,
    createPara('Id : ', pokemonData.id),
    createPara('Name : ', pokemonData.name),
    createPara('Type : ', pokemonData.type)
  );
  return divTag;
};

const renderPokemonInGallery = async function (allPokemonData) {
  const pokemonGallery = document.querySelector('.pokemon-gallery');
  for (const pokemonData of allPokemonData) {
    pokemonData.element = createPokemonDiv(pokemonData);
    pokemonGallery.appendChild(pokemonData.element);
  }
  document.querySelector('.loading-container').style.visibility = 'hidden';
  document.querySelector('.loading-animation').remove();
};

const getWeaknessData = async (pokemonData, url) => {
  pokemonData.weakness = [];
  const response = await fetch(url);
  const responseData = await response.json();
  const weaknessList = responseData.damage_relations.double_damage_from;
  weaknessList.forEach((weakness) => pokemonData.weakness.push(weakness.name));
};

const getOtherData = (pokemonData, responseData) => {
  pokemonData.height = (responseData.height * 0.1).toFixed(1);
  pokemonData.weight = (responseData.weight / 10).toFixed(1);
  pokemonData.stats = {}, pokemonData.abilities = [], pokemonData.moves = [];
  responseData.stats.forEach((eachStat) => {
    pokemonData.stats[eachStat.stat.name] = eachStat.base_stat;
  });
  responseData.abilities.forEach((eachAbility) => {
    pokemonData.abilities.push(eachAbility.ability.name);
  });
  responseData.moves.forEach((eachMove) => {
    pokemonData.moves.push(eachMove.move.name);
  });
};

const getSpecificData = async function (endpoint) {
  const noImageUrl = './src/images/no-image-available.jpg',
    url = `https://pokeapi.co/api/v2/pokemon/${endpoint}/`,
    pokemonData = {};
  const response = await fetch(url);
  const responseData = await response.json();
  pokemonData.name = responseData.name, pokemonData.id = responseData.id;
  pokemonData.imageUrl = responseData.sprites.other.home.front_default
    || responseData.sprites.other['official-artwork'].front_default
    || responseData.sprites.front_default || noImageUrl;
  pokemonData.type = responseData.types[0].type.name;
  getOtherData(pokemonData, responseData);
  await getWeaknessData(pokemonData, responseData.types[0].type.url);
  return pokemonData;
};

const getPokemonData = async function () {
  const allPokemonData = [],
    pokemonLimit = 1302,
    url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonLimit}/`;
  const response = await fetch(url);
  const responseData = await response.json();
  const requiredData = responseData.results;
  for (const eachData of requiredData) {
    allPokemonData.push(await getSpecificData(eachData.name));
  }
  await renderPokemonInGallery(allPokemonData);
  return allPokemonData;
};

const main = async function () {
  const allPokemonData = await getPokemonData();
  searchPokemon(allPokemonData);
  showAllPokemonData(allPokemonData);
  closeBtnFun();
};

window.onload = main;
