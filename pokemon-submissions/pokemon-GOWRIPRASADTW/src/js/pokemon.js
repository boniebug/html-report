'use strict';

const fetchPokemon = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1031');
  const data = await response.json();
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
        <p>Type: ${details.types.map(fetchType => fetchType.type.name).join(', ')}</p>
        <div class='hiddenDetails'>
          <p>weight: ${details.weight}</p>
          <p>Height: ${details.height}</p>
          <div> <strong>Statistics:  </strong>
            <p>hp: ${details.stats[0].base_stat} </p>
            <p>attack: ${details.stats[1].base_stat} </p>
            <p>defense: ${details.stats[2].base_stat} </p>
            <p>specialAttack: ${details.stats[3].base_stat} </p>
            <p>specialdefence: ${details.stats[4].base_stat} </p>
            <p>speed: ${details.stats[5].base_stat} </p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += pokemons;
  }
};

const searchPokemons = () => {
  const searchPokemon = document.getElementById('search')
  const searchTerm = searchPokemon.value.toLowerCase();
  const allPokemons = document.querySelectorAll('.detail');
  allPokemons.forEach(pokemon => {
    const name = pokemon.querySelector('h2').innerText.toLowerCase();
    pokemon.style.display = name.includes(searchTerm) ? 'block' : 'none';
  });
};

fetchPokemon();
