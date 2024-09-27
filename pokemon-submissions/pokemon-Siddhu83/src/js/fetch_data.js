'use strict';
const POKEMON = [];

const determineType = (typesArray) => {
  const types = [];
  for (const element of typesArray) {
    types.push(element.type.name);
  }
  return types;
};

const makeFetchCall = async (url) => {
  try {
    const pokemonResponse = await fetch(url);
    const json = await pokemonResponse.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

const createPokemon = async () => {
  for (let i = 1; i <= 1024; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon-form/${i}/`;
    const pokemon = await makeFetchCall(url);
    const pokemonTypes = determineType(pokemon.types);
    const currentPokemon = {
      name: pokemon['name'],
      image: pokemon['sprites']['front_default'],
      id: pokemon['id'],
      type: pokemonTypes
    };
    POKEMON.push(currentPokemon);
  }
  return new Promise((resolve, reject) => {
    resolve(POKEMON);
  });
};
