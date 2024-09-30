'use strict';

const getUrl =async (url) => {
  const moveUrl = await fetch(url);
  const response = await moveUrl.json();
  return response;
};

const generateStat =async (url) => {
  const statContainer = document.createElement('span');
  const allStats = url['stats'];
  let stat = '';
  for (const statElement of allStats) {
    const statName = statElement['stat']['name'];
    const statValue = statElement['base_stat'];
    const statDetails = statName + ':' + statValue;
    stat = stat + statDetails + '\n';
  }
  statContainer.innerText ='All Stats:\n' + stat;
  return statContainer;
};

const generateAbility = async (url) => {
  const abilityContainer = document.createElement('span');
  const allAbilities = url['abilities'];
  let ability = '';
  for (const abilityElement of allAbilities) {
    const abilityName = abilityElement['ability']['name'];
    const abilityUrl = await getUrl(abilityElement['ability']['url']);
    if (abilityUrl['effect_entries'][0]) {
      const abilityDescription = abilityUrl['effect_entries'][0]['effect'];
      const abilities = abilityName + ':' + abilityDescription;
      ability = ability + abilities + '\n';
    }
  }
  abilityContainer.innerText = 'Abilities: ' + ability;
  return abilityContainer;
};

const generateMoves = async (url) => {
  const moveContainer = document.createElement('span');
  const allMoves = url['moves'];
  let move = '';
  for (const moveElement of allMoves) {
    const moveName = moveElement['move']['name'];
    const moveUrl = await getUrl(moveElement['move']['url']);
    if (moveUrl['effect_entries'][0]) {
      const moveDescription = moveUrl['effect_entries'][0]['effect'];
      const moves = moveName + ':' + moveDescription;
      move = move + moves + '\n';
    }
  }
  moveContainer.innerText = 'Moves: ' + move;
  return moveContainer;
};

const getData = (pokemonDetail, unit, detail) => {
  const detailContainer = document.createElement('span');
  detailContainer.innerText = detail + pokemonDetail + unit;
  return detailContainer;
};

const appendNewDetails =async (pokemonInfo, url) => {
  const moves = await generateMoves(url);
  const abilities = await generateAbility(url);
  const stats = await generateStat(url);
  const height = getData(url['height'], 'ft', 'Height: ');
  const weight = getData(url['weight'], 'kg', 'Weight: ');
  pokemonInfo.appendChild(height);
  pokemonInfo.appendChild(weight);
  pokemonInfo.appendChild(stats);
  pokemonInfo.appendChild(abilities);
  pokemonInfo.appendChild(moves);
};

const getSubWeakness = (allWeaknessTypes) => {
  const array = [];
  for (const weaknesses of allWeaknessTypes) {
    const weaknessType = weaknesses['name'];
    array.push(weaknessType);
  }
  return array;
};

const getWeaknesses = async (weaknessesType) => {
  const weakness = await getUrl(weaknessesType['type']['url']);
  return getSubWeakness(weakness['damage_relations']['double_damage_from']);
};

const getImmunitiesAndNeutrals = async (weaknessesType) => {
  const weakness = await getUrl(weaknessesType['type']['url']);
  return {
    immunities: getSubWeakness(weakness['damage_relations']['no_damage_from']),
    neutrals: getSubWeakness(weakness['damage_relations']['half_damage_from'])
  };
};

const combineWeaknesses = (weaknesses, newWeaknesses) => {
  for (let i = 0; i < newWeaknesses.length; i++) {
    if (!weaknesses.includes(newWeaknesses[i])) {
      weaknesses.push(newWeaknesses[i]);
    }
  }
  return weaknesses;
};

const removeImmunitiesAndNeutrals = (weaknesses, immunities, neutrals) => {
  const newWeaknesses = [];
  for (let i = 0; i < weaknesses.length; i++) {
    if (!immunities.includes(weaknesses[i]) && !neutrals.includes(weaknesses[i])) {
      newWeaknesses.push(weaknesses[i]);
    }
  }
  return newWeaknesses;
};

const formatWeaknesses = (weaknesses) => {
  let weak = '';
  for (let i = 0; i < weaknesses.length; i++) {
    if (i === 0) {
      weak = weaknesses[i];
    } else {
      weak = weak + ',' + weaknesses[i];
    }
  }
  return weak;
};

const appenWeakness = async (pokemonInfo, url) => {
  const weaknessContainer = document.createElement('span');
  const alltypes = url['types'];
  let weaknesses = [];
  let immunities = [];
  let neutrals = [];
  for (const weaknessesType of alltypes) {
    const newWeaknesses = await getWeaknesses(weaknessesType);
    weaknesses = combineWeaknesses(weaknesses, newWeaknesses);
    const { immunities: newImmunities, neutrals: newNeutrals } = await getImmunitiesAndNeutrals(weaknessesType);
    immunities = combineWeaknesses(immunities, newImmunities);
    neutrals = combineWeaknesses(neutrals, newNeutrals);
  }
  weaknesses = removeImmunitiesAndNeutrals(weaknesses, immunities, neutrals);
  const weak = formatWeaknesses(weaknesses);
  weaknessContainer.innerText = 'Weakness: ' + weak;
  pokemonInfo.appendChild(weaknessContainer);
};

const redirectPokemon = (pokemonData, pokemonInfo, url) => {
  const morePokemonDetails = document.querySelector('.morePokemonData');
  pokemonData.style.display = 'none';
  morePokemonDetails.style.display = 'flex';
  const removeButton = pokemonInfo.querySelector('button');
  pokemonInfo.removeChild(removeButton);
  morePokemonDetails.appendChild(pokemonInfo);
  appendNewDetails(pokemonInfo, url);
  appenWeakness(pokemonInfo,url);
}

const pokemonFullData = (url) => {
  const pokemonData = document.querySelector('.pokemonData');
  const allDataPokemon = pokemonData.querySelectorAll('section');
  allDataPokemon.forEach((pokemonInfo) => {
    const pokemon = pokemonInfo.querySelector('button');
    pokemon.addEventListener('click', () => {
      redirectPokemon(pokemonData, pokemonInfo, url);
    });
  });
};