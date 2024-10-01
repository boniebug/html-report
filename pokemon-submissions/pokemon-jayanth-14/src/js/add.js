'use strict';

const createTitle = (data) => {
  const title = document.createElement('p');
  title.classList.add('cardTitle');
  title.innerText = data.name;
  return title
};
const createImage = (data) => {
  const image = document.createElement('img');
  image.src = data.imageUrl;
  if (data.imageUrl === null) {
    image.src = './src/images/pokeball.png';
  }
  image.classList.add('cardImage');
  return image;
};
const createId = (data) => {
  const id = document.createElement('p');
  id.classList.add('cardId');
  id.innerText = data.id;
  return id;
};

const createTypes = (data) => {
  const types = document.createElement('p');
  types.classList.add('cardTypes');
  const typesArray = data.type;
  typesArray.forEach((typeName) => {
    const type = document.createElement('span');
    type.innerText = typeName;
    type.classList.add('cardType');
    type.style.backgroundColor = getcolors(typeName);
    types.appendChild(type);
  });
  return types;
};
const addDetails = (data, card) => {
  const image = createImage(data);
  const title = createTitle(data);
  const id = createId(data);
  const types = createTypes(data);
  card.append(image, title, id, types);
};
const addPokemon = (data) => {
  const card = document.createElement('div');
  card.classList.add('card');
  addDetails(data, card);
  card.addEventListener('click', () => { getFullDetails(data)})
  document.getElementById('cardContainer').appendChild(card);
};