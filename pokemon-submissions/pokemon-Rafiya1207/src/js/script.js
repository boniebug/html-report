const createPTag = (value, className) => {
  const pTag = document.createElement('p');
  pTag.innerText = value;
  pTag.classList.add(`pokemon-${className}`);
  return pTag;
};

const createImageTag = (image) => {
  const imgTag = document.createElement('img');
  imgTag.setAttribute('src', image);
  imgTag.classList.add('pokemon-image');
  return imgTag;
};

const generatePokemonTypes = (types) => {
  const divTag = document.createElement('div');
  divTag.classList.add('pokemon-types');
  divTag.append(types.toString());
  return divTag;
};

const createLink = (text) => {
  const pTag = document.createElement('p');
  pTag.innerText = 'more details';
  pTag.classList.add('more-details');
  pTag.id = text;
  pTag.addEventListener('click', () => displayPopUp(pTag));
  return pTag;
};

const AppendPokemonCard = (pokemon) => {
  const divTagForCard = document.createElement('div');
  const divTagForDetails = document.createElement('div');
  const imgTag = createImageTag(pokemon.image);
  const pTagForName = createPTag(pokemon.name, 'name');
  const pTagForId = createPTag(pokemon.id, 'id');
  const divTagForTypes = generatePokemonTypes(pokemon.types);
  const linkForDetails = createLink(pokemon.name);
  divTagForDetails.classList.add('pokemon-details');
  divTagForDetails.append(pTagForName, pTagForId, divTagForTypes);
  divTagForCard.classList.add('card');
  divTagForCard.append(imgTag, divTagForDetails, linkForDetails);
  return divTagForCard;
};

const renderPokemons = async (pokemons) => {
  const container = document.querySelector('.container');
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-container');
  for (let index = 0; index < pokemons.length; index++) {
    const card = AppendPokemonCard(pokemons[index]);
    cardsContainer.appendChild(card);
  }
  container.innerHTML = '';
  container.appendChild(cardsContainer);
};

const loader = (text) => {
  const container = document.querySelector('.container');
  const pTag = document.createElement('p');
  container.innerHTML = '';
  pTag.classList.add('loader');
  pTag.innerText = text;
  container.appendChild(pTag);
};

const main = async (pokemons) => {
  loader('loading...');
  await fetchPokemons();
  await renderPokemons(pokemons);
  const button = document.getElementById('search-button');
  button.addEventListener('click', () => handleSearchOperation(pokemons));
};

window.onload = () => {
  main(pokemons);
};
