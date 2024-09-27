'use strict';
const loader = document.getElementById('Loader');

const fetchPokemon = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
  const data = await response.json();
  setTimeout(() =>   
    displayPokemon(data.results), 5000);
displayPokemon(data.results)

};

const displayPokemon = async (pokemonData) => {
  const container = document.getElementById('container');
  for (const pokemon of pokemonData) {
    const response = await fetch(pokemon.url);
    const details = await response.json();       
    const pokemons = `     
      <div class="detail">
        <img src="${details.sprites.front_default}">
        <h2>${details.name}</h2>
        <p>ID: ${details.id}</p>
        <p>Type: ${details.types.map(fetchType => fetchType.type.name).join(', ')}</p
      </div>
    `;
    container.innerHTML += pokemons;
  }
};

// const searchPokemon = document.getElementById('search')
// const searchPokemons = () => {
//   const searchTerm = searchPokemon.value.toLowerCase();
//   const allPokemons = Array.from(document.querySelectorAll('.detail'));
//   allPokemons.forEach(pokemon => {
//       const name = pokemon.querySelector('h2').innerText.toLowerCase();
//       pokemon.style.display = name.includes(searchTerm) ? 'block' : 'none';
//   });
// };

// searchPokemon.addEventListener('input', searchPokemons);   

  fetchPokemon();
