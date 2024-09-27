
const createImgTag = (src,name) => {
  const imageTAg = document.createElement('img')
  imageTAg.src = src;
  imageTAg.alt = name;

  return imageTAg;
};

const createH3Tag = (id) =>  {
  const h3Tag = document.createElement('h3');
  h3Tag.innerText = id;
  h3Tag.className = 'id';
  
  return h3Tag;
};

const createH2Tag = (name) =>  {
  const h2Tag = document.createElement('h2');
  h2Tag.innerText = name;
  h2Tag.className = 'name';

  return h2Tag;
};

const createPTag = (type) =>  {
  const pTag = document.createElement('p');
  pTag.innerText = `${type} type`;
  pTag.className = 'type';

  return pTag;
};

const createCard  = (pokemon) => {
  const card = document.createElement('div')
  card.id = pokemon.id;
  card.className = 'pokemon';
  const image = createImgTag(pokemon.imageUrl);
  const id = createH3Tag(pokemon.id);
  const type = createPTag(pokemon.type);
  const name = createH2Tag(pokemon.name);
  card.appendChild(id);
  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(type);
  
  return card;
};

