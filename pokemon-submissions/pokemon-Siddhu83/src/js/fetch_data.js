'use strict';
const POKEMON = [];

const makeFetchCall = async (url) => {
  try {
    const pokemonResponse = await fetch(url);
    const json = await pokemonResponse.json();
    return json;
  } catch (error) {
    console.log('Error: ', error);
  }
};

const determineProperty = (object, propertyName) => {
  const resultArray = [];
  for (const element of object) {
    resultArray.push(element[propertyName]['name']);
  }
  return resultArray;
};

const determineAbilities = (abilityObject) => {
  const abilities = [];
  for (const element of abilityObject) {
    abilities.push(element['ability']['name']);
  }
  return abilities;
};

const determineWeakness = async (urls) => {
  const weaknessRawDataType1 = await makeFetchCall(urls[0]);
  const weaknessData1 = weaknessRawDataType1['damage_relations'];
  let weaknessArray1 = weaknessData1['double_damage_from'].concat(weaknessData1['half_damage_from']);
  const list1 = weaknessArray1.map(element => element['name']);
  let resultArray = list1;
  if (urls.length === 2) {
    const weaknessRawDataType2 = await makeFetchCall(urls[1]);
    const weaknessData2 = weaknessRawDataType2['damage_relations'];
    let weaknessArray2 = weaknessData2['double_damage_from'].concat(weaknessData2['half_damage_from']);
    const list2 = weaknessArray2.map(element => element['name']);
    resultArray = list1.concat(list2)
    const commonWeakness = list1.filter(weakness => list2.includes(weakness));
    resultArray = commonWeakness || resultArray;
  }
  return new Promise((resolve, reject) => {
    resolve(resultArray);
  });
};

const determineStats = (statsObject) => {
  const result = [];
  for (const element of statsObject) {
    result.push([
      element['stat']['name'], element['base_stat']
    ]);
  }
  return result;
};

const createExtraDetails = async (pokemon) => {
  const urls = [`https://pokeapi.co/api/v2/type/${pokemon['types'][0]['type']['name']}`];

  if (pokemon['types'][1]) {
    urls.push(`https://pokeapi.co/api/v2/type/${pokemon['types'][1]['type']['name']}`);
  }
  const extraDetails = {
    height: pokemon.height + ' decimeter',
    weight: pokemon.weight + ' hectogram',
    abilities: determineAbilities(pokemon['abilities']),
    moves: determineProperty(pokemon['moves'], 'move'),
    stats: determineStats(pokemon['stats']),
    weakness: await determineWeakness(urls)
  };
  return new Promise((resolve, reject) => {
    resolve(extraDetails);
  });
};

const createPokemon = async () => {
  const rawData = await makeFetchCall(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
  const allPokemonsData = rawData.results;
  for (const element of allPokemonsData) {
    const pokemon = await makeFetchCall(element.url);
    if (pokemon) {
      const currentPokemon = {
        name: pokemon['name'],
        image: pokemon['sprites']['other']['official-artwork']['front_default'] ||
          pokemon['sprites']['other']['official-artwork']['front_shiny'] ||
          'src/assets/no-image.png',
        id: pokemon['id'],
        type: determineProperty(pokemon['types'], 'type'),
        extraDetails: await createExtraDetails(pokemon)
      };
      POKEMON.push(currentPokemon);
    }
  }
  return new Promise((resolve, reject) => {
    resolve(POKEMON);
  });
};
