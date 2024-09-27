'use strict';
async function fetchPokemonDetails() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=1268');
  const data = await response.json();
  const pokemonList = data.results;
  const pokemonContainer = document.getElementById('pokemon-container');
  for (const pokemon of pokemonList) {
    const res = await fetch(pokemon.url);
    const pokemonData = await res.json();
    const divelem = document.createElement('div');
    const pokemonImg = document.createElement('img');
    const pokemonName = document.createElement('p');
    const pokemonId = document.createElement('p');
    const pokemonType = document.createElement('p');
    divelem.classList.add('pokemonNm');
    pokemonImg.src = pokemonData.sprites.front_default;
    pokemonImg.alt = pokemonData.name;
    pokemonName.innerText = 'Name: ' + pokemonData.name;
    pokemonId.innerText = 'Id: ' + pokemonData.id;
    pokemonType.innerText = 'Type: ' + pokemonData.types.map(type => type.type.name).join(', ');
    divelem.append(pokemonImg, pokemonName, pokemonId, pokemonType);
    pokemonContainer.appendChild(divelem);
  }
};

const searchList = () => {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const listItems = document.querySelectorAll('.pokemonNm');
  listItems.forEach(item => {
    const name = item.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
    const id = item.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
    const type = item.querySelector('p:nth-of-type(3)').textContent.toLowerCase();
    if (name.includes(searchInput) || id.includes(searchInput) || type.includes(searchInput)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};

const main = () => {
  setTimeout(() => {
    document.getElementById('popupMsg').style.display = "none";
    document.querySelector('.page-heading').style.display = 'block';
    fetchPokemonDetails();
  }, 10000);
};

main();