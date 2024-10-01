'use strict';

const dataOfAllpokemons = {};

const fetchData = async (fetching, url) => {
  const fetchedData = [];
  const response = await fetch(url);
  const data = await response.json();

  for (const element of data.results) {
    if (fetching === 'types') {
      fetchedData.push(element);
    } else {
      fetchedData.push(element.name);
    }
  }

  return fetchedData;
};

const fetchNamesAndTypes = async () => {
  const typeUrl = 'https://pokeapi.co/api/v2/type';
  const nameUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  dataOfAllpokemons.types = await fetchData('types', typeUrl);
  dataOfAllpokemons.names = await fetchData('name', nameUrl);
};

const createPokemonsData = async (startingPoint = 0, endingPoint = 100) => {
  const shortListedPokemons = [];
  for (let index = startingPoint; index < endingPoint; index++) {
    const data = await getPokemonDetails(dataOfAllpokemons.names[index]);
    shortListedPokemons.push(data);
  }

  return shortListedPokemons;
};

const getPokemonDetails = async (pokemonNameOrID) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrID}`);
  const pokemon = await response.json();
  const name = pokemon.name;
  const id = pokemon.id;
  const imageUrl = pokemon.sprites.other['official-artwork'].front_shiny;

  
  return { id, name, imageUrl};
};
