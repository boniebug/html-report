'use strict';

const createPTag = (text, className, id) => {
  const pTag = document.createElement('p');
  className && pTag.classList.add(className);
  id && pTag.classList.add(id);
  pTag.innerText = text;
  return pTag;
};

const createImageTag = (imageUrl, className, id) => {
  const pokemonImage = document.createElement('img');
  pokemonImage.src = imageUrl;
  className && pokemonImage.classList.add(className);
  id && pokemonImage.classList.add(id);
  return pokemonImage;
};

const displayPokemons = (pokemonData) => {
  const parent = document.getElementsByClassName('pokemon-main-container')[0];
  parent.innerHTML = '';
  for (const thisPokemon of pokemonData) {
    const currentContainer = document.createElement('section');
    currentContainer.id = `pokemon-unit-${thisPokemon.id}`;
    currentContainer.className = 'pokemon-unit';
    const pokemonImage = createImageTag(thisPokemon.image, 'pokemon-image', `pokemon-image-${thisPokemon.image}`);
    const pokemonName = createPTag(`Name: ${thisPokemon.name}`, 'pokemon-name', `pokemon-name-${thisPokemon.name}`);
    const pokemonId = createPTag(`Id: ${thisPokemon.id}`, 'pokemon-id', `pokemon-id-${thisPokemon.id}`);
    const pokemonType = createPTag(`Types: ${thisPokemon.type}`, 'pokemon-type', `pokemon-type-${thisPokemon.type}`);
    currentContainer.append(pokemonImage, pokemonName, pokemonId, pokemonType);
    parent.appendChild(currentContainer);
  }
  return;
};
