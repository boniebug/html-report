
const createImgTag = (src, name) => {
  const imageTag = document.createElement('img');
  imageTag.src = src;
  imageTag.alt = name;

  return imageTag;
};

const createH3Tag = (id) => {
  const h3Tag = document.createElement('h3');
  h3Tag.innerText = `#${id}`;
  h3Tag.className = 'id';

  return h3Tag;
};

const createH2Tag = (name) => {
  const h2Tag = document.createElement('h2');
  h2Tag.innerText = name;
  h2Tag.className = 'name';

  return h2Tag;
};

const createCard = (pokemon) => {
  const card = document.createElement('div')
  card.id = pokemon.id;
  card.className = 'pokemon';
  const image = createImgTag(pokemon.imageUrl, pokemon.name);
  const id = createH3Tag(pokemon.id);
  // const type = createTagForTypes(pokemon.types);
  const name = createH2Tag(pokemon.name);
  card.appendChild(id);
  // card.appendChild(type);
  card.appendChild(name);
  card.appendChild(image);

  return card;
};

const appendCards = (shortList, container) => {
  for (const pokemon of shortList) {
    dataOfAllpokemons[pokemon.id] = pokemon;
    const card = createCard(pokemon);
    addClickEvent(card);
    container.appendChild(card);
  }
};