'use strict';
const appendDetails = async (data, pokemonDetails) => {
  const pokemonData = document.createElement('div');
  pokemonData.className = 'moreDetails';
  pokemonData.appendChild(closeButton(pokemonDetails))
  pokemonData.appendChild(await appendPokemanImage(data));
  pokemonData.appendChild(appendPokemanId(data));
  pokemonData.appendChild(appendPokemonName(data));
  pokemonData.appendChild(appendPokemanType(data));
  pokemonData.appendChild(await appendPokemonWeight(data));
  pokemonData.appendChild(await appendPokemonHeight(data));
  pokemonData.appendChild(await appendPokemonAbilities(data));
  pokemonData.appendChild(await appendPokemonStatistics(data));
  pokemonData.appendChild(await appendPokemonMoves(data));
  pokemonData.appendChild(await appendPokemonWeaknesses(data));
  return pokemonData;
}
const showMoreDetails = async (data) => {
  const main = document.querySelector('main');
  const pokemonDetails = document.createElement('section');
  pokemonDetails.className = 'pokemonDetails';
  pokemonDetails.appendChild(await appendDetails(data, pokemonDetails));
  main.appendChild(pokemonDetails);
  pokemonDetails.onclick = (e) => {
    if (e.target === pokemonDetails) {
      pokemonDetails.remove();
    }
  }
};

const displayPokemon = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const pokemonData = document.createElement('section');
  pokemonData.onclick = () => showMoreDetails(data);
  pokemonData.appendChild(await appendPokemanImage(data));
  pokemonData.appendChild(appendPokemanId(data));
  pokemonData.appendChild(appendPokemonName(data));
  pokemonData.appendChild(appendPokemanType(data));
  pokemonData.appendChild(appendPokemonData());
  document.getElementById('pokemonContainer').appendChild(pokemonData);
};

async function fetchPokemons() {
  const main = document.querySelector('main');
  const divTag = document.createElement('h2');
  divTag.className = 'loadingMessage';
  divTag.innerText = 'Loading Pokemons...';
  main.appendChild(divTag);
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=1325');
  const data = await response.json();
  for (const pokemon of data.results) {
    await displayPokemon(pokemon.url);
  }
  divTag.remove();
  document.getElementById('pokemonContainer').style.display = 'flex';
};

window.onload = () => {

  fetchPokemons();
};
