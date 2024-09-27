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
  divTag.innerText = 'Types: ';
  const spanTag = document.createElement('span');
  types.forEach(element => {
    spanTag.innerText += `${element},`;
  });
  divTag.appendChild(spanTag);
  return divTag;
};

const AppendPokemonCard = (pokemon) => {
  const divTagForCard = document.createElement('div');
  const divTagForDetails = document.createElement('div');
  const imgTag = createImageTag(pokemon.image);
  const pTagForName = createPTag(pokemon.name, 'name');
  const pTagForId = createPTag(pokemon.id, 'id', 'Id');
  const divTagForTypes = generatePokemonTypes(pokemon.types);
  divTagForCard.classList.add('card');
  divTagForDetails.append(pTagForName, pTagForId, divTagForTypes);
  divTagForDetails.classList.add('pokemon-details');
  divTagForCard.append(imgTag, divTagForDetails);
  return divTagForCard;
}

const pokemons = [];

const fetchAndStorePokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
  const parsedResponse = await response.json();
  const data = parsedResponse.results;
  for (let index = 1; index <= data.length; index++) {
    const otherDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
    const parsedDetails = await otherDetails.json();
    const pokemon = {};
    pokemon['name'] = data[index - 1].name;
    pokemon['id'] = parsedDetails.id;
    pokemon['types'] = [];
    parsedDetails.types.forEach(element => {
      pokemon['types'].push(element.type.name);
    });
    pokemon['image'] = parsedDetails.sprites.front_default;
    pokemons.push(pokemon);
  }
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
}

const searchPokemons = (pokemons) => {
  const userInput = document.querySelector('.search-bar').value;
  const container = document.querySelector('.container');
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-container');
  if (userInput === '') {
    renderPokemons(pokemons);
    return;
  }
  for (let index = 0; index < pokemons.length; index++) {
    for (const element of Object.values(pokemons[index])) {
      if (userInput == element || (Number(element) === NaN && element.includes(userInput))) {
        const card = AppendPokemonCard(pokemons[index]);
        cardsContainer.appendChild(card);
        break;
      }
    }
  }
  console.log(cardsContainer.children.length !== 0);
  container.innerHTML = '';
  if (cardsContainer.children.length === 0) {
    loader('no results');
    return;
  }
  container.appendChild(cardsContainer);
}

const addEventListeners = (pokemons) => {
  const button = document.getElementById('search-button');
  button.addEventListener('click', () => searchPokemons(pokemons));
}

const loader = (text) => {
  const pTag = document.createElement('p');
  pTag.classList.add('loader');
  pTag.innerText = text;
  const container = document.querySelector('.container');
  container.appendChild(pTag);
};

window.onload = async () => {
  loader('loading...');
  await fetchAndStorePokemons();
  await renderPokemons(pokemons);
  addEventListeners(pokemons);
};