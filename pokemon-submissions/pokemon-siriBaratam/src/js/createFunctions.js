'use strict'

const createImage = (image) => {
  const imageContainer = document.createElement('img');
  imageContainer.src = image;
  imageContainer.classList.add('image');
  return imageContainer;
};

const createDetails = (tag, className, text, searchValue) => {
  const detailContainer = document.createElement(tag);
  detailContainer.classList.add(className);
  detailContainer.innerHTML = text.replace(new RegExp(searchValue, 'gi'), (match) => `<mark>${match}</mark>`);
  return detailContainer;
};

const createPokemonContainer = (pokemon, value) => {
  const outerContainer = document.getElementById('outer-container');
  const container = document.createElement('div');
  container.classList.add('pokemon-container');
  container.appendChild(createDetails('h2', 'pokemon-name', pokemon.name, value));
  container.appendChild(createImage(pokemon.imageUrl));
  container.appendChild(createDetails('p', 'pokemon-id', pokemon.id.toString(), value));
  container.appendChild(createDetails('p', 'pokemon-type', pokemon.type, value));
  outerContainer.appendChild(container);
};
