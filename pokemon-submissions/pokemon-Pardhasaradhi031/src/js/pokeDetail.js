'use strict';

const createPokeInfoButton = function () {
  const pokemons = document.getElementsByClassName('pokemon');
  const pokemonId = document.querySelectorAll('.id');
  for (let index = 0; index < pokemons.length; index++) {
    const id = pokemonId[index].textContent.replace('#', '').trim();
    console.log(id);
    const pokeInfoButton = document.createElement('button');
    pokeInfoButton.className = 'pokeInfoButton';
    pokeInfoButton.innerText = 'Show More';
    pokeInfoButton.addEventListener('click', () => {
      showPokemonDetails(id, index);
    });
    pokemons[index].appendChild(pokeInfoButton);
  }
};

const closeButtonListener = function (container) {
  const closeButton = document.createElement('button');
  closeButton.innerText = 'x';
  closeButton.className = 'closeDetails'
  closeButton.addEventListener('click', () => {
    container.remove();
    document.getElementById('pokemonSection').style.display = 'flex';
  });
  return closeButton;
};

const createTextElement = function (text, label) {
  const div = document.createElement('div');
  const span = document.createElement('span');
  span.innerText = `${label}:` + ' ';
  const para = document.createElement('p');
  para.innerText = `${text}\n`;
  div.className = `pokemon${label}`
  div.append(span, para);
  return div;
};

const createPokemonDataContainer = function (pokeData) {
  const container = document.createElement('div');
  container.className = 'pokemonDataContainer';
  const id = createTextElement(`#${pokeData.id}`, 'Id');
  const name = createTextElement(pokeData.name, 'Name')
  const image = document.createElement('img');
  image.src = pokeData.image || `./src/images/Pokeball.png`;
  image.alt = pokeData.name;
  const types = createTextElement(`${pokeData.types}`, 'Type');
  const height = createTextElement(`${pokeData.height} decimeters`, 'Height');
  const weight = createTextElement(`${pokeData.weight} hectograms`, 'Weight');
  container.append(id, name, image, types, height, weight,
    pokeData.weakness, pokeData.moves, pokeData.abilities, pokeData.statistics);
  document.body.append(container);
  container.append(closeButtonListener(container));
};

const createMovesContainer = function (pokemonMoves) {
  const container = document.createElement('div');
  container.className = 'pokemonMoves';
  const heading = document.createElement('p');
  heading.innerText = 'Moves: ';
  container.append(heading);
  for (let index = 0; index < pokemonMoves.length; index++) {
    const movesElement = document.createElement('span');
    movesElement.innerText = `${pokemonMoves[index]}` + ',' + ' ';
    container.appendChild(movesElement);
  }
  return container;
};

const getPokemonMoves = function (data) {
  const pokemonMoves = [];
  for (let index = 0; index < data.moves.length; index++) {
    pokemonMoves.push(data.moves[index]['move'].name);
  }
  console.log(pokemonMoves)
  const movesContainer = createMovesContainer(pokemonMoves);
  return movesContainer;
};

const createAbilitiesContainer = function (abilities) {
  const container = document.createElement('div');
  container.className = 'pokemonAbilities';
  const span = document.createElement('span');
  span.innerText = 'Abilities: ';
  container.append(span);
  for (let index = 0; index < abilities.length; index++) {
    const abilityElement = document.createElement('p');
    abilityElement.innerText = abilities[index];
    container.appendChild(abilityElement);
  }
  return container;
};

const getPokemonAbilities = function (data) {
  const abilities = [];
  for (let index = 0; index < data.abilities.length; index++) {
    abilities.push(data.abilities[index].ability.name);
  }
  const abilitiesContainer = createAbilitiesContainer(abilities);
  return abilitiesContainer;
};
const createStatisticsContainer = function (stats) {
  const container = document.createElement('div');
  container.className = 'pokemonStatistics';
  const div = document.createElement('div');
  div.innerText = 'Statistics: ';
  container.append(div);
  for (let stat in stats) {
    const statElement = document.createElement('p');
    const statValue = document.createElement('span');
    statElement.innerText = `${stat}: `;
    statValue.innerText = `${stats[stat]}`
    statElement.append(statValue);
    container.appendChild(statElement);
  }
  return container;
};

const getPokemonStatistics = function (data) {
  const stats = {};
  for (let index = 0; index < data.stats.length; index++) {
    stats[data.stats[index].stat.name] = data.stats[index]['base_stat'];
  }
  const statistics = createStatisticsContainer(stats);
  console.log(statistics);
  return statistics;
};

const createWeaknessContainer = function (weaknesses) {
  const container = document.createElement('div');
  container.className = 'pokemonWeakness';
  const span = document.createElement('span');
  span.innerText = 'Weakness: ';
  container.append(span);
  for (let index = 0; index < weaknesses.length; index++) {
    const weaknessElement = document.createElement('p');
    weaknessElement.innerText = weaknesses[index] + ' type';
    container.appendChild(weaknessElement);
  }

  return container;
};


const getWeakness = function (data) {
  const weakness = [];
  const length = data['damage_relations']['double_damage_from'].length;
  for (let index = 0; index < length; index++) {
    weakness.push(data['damage_relations']['double_damage_from'][index].name);
  }
  const weaknessContainer = createWeaknessContainer(weakness);
  return weaknessContainer;
};

const getPokemonWeakness = async function (data) {
  const url = data.types[0].type.url;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(getWeakness(data));
    return getWeakness(data);
  } catch {}
};

const getPokemonData = async function (data) {
  const pokeData = {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: getPokemonTypes(data),
    height: data.height,
    weight: data.weight,
    moves: getPokemonMoves(data),
    abilities: getPokemonAbilities(data),
    statistics: getPokemonStatistics(data),
    weakness: await getPokemonWeakness(data)
  };
  createPokemonDataContainer(pokeData);
  console.log(pokeData.weakness);
};

const showPokemonDetails = function (id, index) {
  const main = document.getElementById('pokemonSection');
  main.style.display = 'none';

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
      getPokemonData(data);
    })
    .catch(error => console.error('Error fetching Pokémon data:', error));
};
