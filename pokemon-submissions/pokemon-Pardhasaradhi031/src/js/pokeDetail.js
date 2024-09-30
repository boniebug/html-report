'use strict';

const createPokeInfoButton = function () {
  const pokemons = document.getElementsByClassName('pokemon');
  const pokemonId = document.querySelectorAll('.id');
  for (let index = 0; index < pokemons.length; index++) {
    const id = pokemonId[index].textContent.replace('#', '').trim();
    console.log(id);
    const pokeInfoButton = document.createElement('button');
    pokeInfoButton.className = 'pokeInfoButton';
    pokeInfoButton.innerText = 'Show More';
    pokeInfoButton.addEventListener('click', () => {
      showPokemonDetails(id, index);
    });
    pokemons[index].appendChild(pokeInfoButton);
  }
};

const closeButtonListener = function (container) {
  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.addEventListener('click', () => {
    container.remove();
    document.getElementById('pokemonSection').style.display = 'flex';
  });
  return closeButton;
};

const createPokemonDataContainer = function (pokeData) {
  const container = document.createElement('div');
  container.className = 'pokemonDataContainer';
  const id = document.createElement('p');
  id.innerText = `ID: #${pokeData.id}`;
  const name = document.createElement('h2');
  name.innerText = pokeData.name;
  const image = document.createElement('img');
  image.src = pokeData.image;
  image.alt = pokeData.name;
  const height = document.createElement('p');
  height.innerText = `Height: ${pokeData.height}`;
  const weight = document.createElement('p');
  weight.innerText = `Weight: ${pokeData.weight}`;
  container.append(id, name, image, height, weight);
  document.body.append(container);
  container.append(closeButtonListener(container));
};

const getPokemonData = function (data) {
  const pokeData = {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    height: data.height,
    weight: data.weight
  };
  createPokemonDataContainer(pokeData);
};

const showPokemonDetails = function (id, index) {
  const main = document.getElementById('pokemonSection');
  main.style.display = 'none'; // Hide the main section

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
          getPokemonData(data);
    })
    .catch(error => console.error('Error fetching Pokémon data:', error));
};
