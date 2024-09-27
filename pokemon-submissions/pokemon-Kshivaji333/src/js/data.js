'use strict';

const allPokemonsData = [];

const getNamesOfAllPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const pokemonsNames = await response.json();

  return pokemonsNames;
};

const createPokemonsData = async () => {
  console.log('in creat start');
  const allPokemons = await getNamesOfAllPokemons();
  const length = allPokemons.results.length
  // for(const pokemon of allPokemons.results){
  //   const data = await getPokemonDetails(pokemon.name);
  //   allPokemonsData.push(data);
  //   console.log('in loop')
  // }
  for(let index = 0; index < 150; index++){
    const data = await getPokemonDetails(allPokemons.results[index].name);
    allPokemonsData.push(data);
    console.log('in loop')
  }
  console.log('in creat start');
};

const getPokemonDetails = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await response.json();
  const id = pokemon.id;
  const type = pokemon.types[0].type.name;
  const imageUrl = pokemon.sprites.front_shiny;
  return {id,name,imageUrl,type};
};
