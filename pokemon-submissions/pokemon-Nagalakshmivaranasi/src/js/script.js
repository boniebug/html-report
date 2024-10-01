const displayPopup = () => {
  const divForPopup = document.querySelector('.popup');
  divForPopup.style.display = 'block';
  setTimeout(() => {
    divForPopup.style.display = 'none';
  }, 2000);
};

const preloading = () => {
  const divForLoading = document.createElement('div');
  const pokemonContainer = document.getElementById('pokemon-container');
  divForLoading.classList.add('preload');
  divForLoading.innerHTML = 'Loading...';
  pokemonContainer.appendChild(divForLoading);

  const divForPopup = document.createElement('div');
  divForPopup.classList.add('popup');
  divForPopup.innerText = 'The page is loading please wait..';
  divForPopup.style.display = 'none';
  pokemonContainer.appendChild(divForPopup);

  const searchPokemon = document.getElementById('search');
  searchPokemon.addEventListener('click', displayPopup)
};

const createObject = (pokemonData) => {
  const pokemonInfo = {
    id: pokemonData.id,
    name: pokemonData.name,
    type: pokemonData.types[0].type.name,
    image: pokemonData.sprites.other.home.front_default,
    height: pokemonData.height,
    weight: pokemonData.weight,
    moves: [],
    abilities: [],
    stastics: []
  };
  for (let index = 0; index < pokemonData.moves.length && index < 5; index++) {
    pokemonInfo.moves.push(pokemonData.moves[index].move.name);
  }
  for (let index = 0; index < pokemonData.abilities.length; index++) {
    pokemonInfo.abilities.push(pokemonData.abilities[index].ability.name);
  }
  for (let index = 0; index < pokemonData.stats.length; index++) {
  pokemonInfo.stastics.push(pokemonData.stats[index].stat.name);
  }
  return pokemonInfo;
};

const fetchData = async (data, array) => {
  for (let element of data.results) {
    try {
      const details = await fetch(element.url);
      const pokemonData = await details.json();
      console.log(pokemonData);
      array.push(createObject(pokemonData));
    }
    catch (error) {
      console.log('error at fetching data', error);
    }
  }
  return array;
};

const fetchPokemonData = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';
  const options = {
    method: 'GET'
  }
  try {
    const array = [];
    const response = await fetch(url, options);
    const data = await response.json();
    return fetchData(data, array);
  }
  catch (error) {
    console.log('error at fetching data', error);
  }
};

const addImage = (addImage) => {
  const image = document.createElement('img');
  image.classList.add('image');
  image.setAttribute('alt', 'no such image');
  image.src = addImage;
  return image;
};

const addDetial = (label, value) => {
  const pTag = document.createElement('p');
  const spanTag = document.createElement('span');
  pTag.classList.add('details');
  spanTag.classList.add('bold-text');
  spanTag.innerText = label;
  pTag.append(spanTag, value);
  return pTag;
};

const displayPokemonDetails = (pokemonObj) => {
  const container = document.createElement('div');
  container.classList.add('pokemon-details');
  container.id = pokemonObj['name'];

  const pokemonImage = addImage(pokemonObj['image']);
  const pokemonName = addDetial('Name: ', pokemonObj['name']);
  const pokemonType = addDetial('Type: ', pokemonObj['type']);
  const pokemonId = addDetial('Id: ', pokemonObj['id']);

  container.append(pokemonImage, pokemonName, pokemonType, pokemonId)
  return container;
};

const addPokemonsToDom = async (pokemons) => {
  const pokemonContainer = document.getElementById('pokemon-container');
  for (const pokemon of pokemons) {
    const pokemonDetial = displayPokemonDetails(pokemon);
    pokemonContainer.appendChild(pokemonDetial);
  }
  return pokemonContainer;
};

const displayPokemonOnSearch = (pokemons) => {
  const input = document.getElementById('search');
  const value = input.value.toLowerCase();
  for (let pokemon of pokemons) {
    const id = pokemon.id.toString();
    const pokemonDetial = document.getElementById(pokemon.name);
    if (pokemon.name.includes(value) || pokemon.type.includes(value) || id.includes(value)) {
      pokemonDetial.style.display = 'block';
    }
    else {
      pokemonDetial.style.display = 'none';
    }
  }
};

const closeDetails = () => {
  const divForAdditionalDetails = document.querySelector('.additional-details');
  // divForAdditionalDetails.style.display = 'none';
  const main = document.getElementById('main');
  main.removeChild(divForAdditionalDetails);
  const overlay = document.querySelector('.overlay')
  overlay.style.display = 'none';
};

const displayExtraDetails = (pokemon) => {
  console.log(pokemon);
  const divForAdditionalDetails = document.createElement('div');
  divForAdditionalDetails.classList.add('additional-details');

  const main = document.getElementById('main');
  main.appendChild(divForAdditionalDetails);

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  main.appendChild(overlay);

  const pokemonImage = addImage(pokemon['image']);
  const pokemonName = addDetial('Name: ', pokemon['name']);
  const pokemonType = addDetial('Type: ', pokemon['type']);
  const pokemonId = addDetial('Id: ', pokemon['id']);
  const pokemonHeight = addDetial('Height: ', pokemon['height']);
  const pokemonWeight = addDetial('Weight: ', pokemon['weight']);
  const pokemonMoves = addDetial('Moves: ', pokemon['moves']);
  const pokemonAbility = addDetial('Abilities: ', pokemon['abilities']);
  const pokemonStastics = addDetial('Stastics: ', pokemon['stastics']);
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'Close';
  divForAdditionalDetails.append(pokemonImage, pokemonName, pokemonType, pokemonId, pokemonHeight);
  divForAdditionalDetails.append(pokemonWeight, pokemonMoves, pokemonAbility, pokemonStastics, closeButton);
  closeButton.addEventListener('click', closeDetails);
};

const extraDetails = (pokemons) => {
  for (let pokemon of pokemons) {
    const pokemonDetial = document.getElementById(pokemon.name);
    pokemonDetial.addEventListener('click', () => { displayExtraDetails(pokemon) });
  }
};

const main = async () => {
  preloading();
  const pokemons = await fetchPokemonData();
  addPokemonsToDom(pokemons);
  const preload = document.querySelector('.preload');
  preload.remove();
  const popup = document.querySelector('.popup');
  popup.remove();
  const searchPokemon = document.getElementById('search');
  searchPokemon.addEventListener('input', () => { displayPokemonOnSearch(pokemons) })
  console.log(pokemons);
  extraDetails(pokemons);
};

window.onload = main;
