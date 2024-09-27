'use strict';

const getPokemons = () => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302`;
  fetch(url)
    .then((response) => {return response.json()})
    .then((response) => {return response.results})
    .then((data) => {
      data.forEach(dataItem => {
        const pokemonData = {}
        pokemonData.name = dataItem.name;
        pokemonData.url = dataItem.url;
        fetch(pokemonData.url)
        .then((response) => {return response.json()})
        .then((response) => {
          pokemonData.type = [];
          response.types.forEach((types) => {
            pokemonData.type.push(types.type.name)
          });
          pokemonData.id = response.id;
          pokemonData.imageUrl = response.sprites.front_default;
          return pokemonData;
        })
    .then((data) => {
      addPokemon(pokemonData);
    })  
      });
    })
    .then(() => {
      setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
      }, 15000);
    });
};

window.onload = () => {
  getPokemons();
  addSearchFunctionality();  
  // getResults();
}