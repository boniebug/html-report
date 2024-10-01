// https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0 for all pokemos
// https://pokeapi.co/api/v2/pokemon/ditto search using name
//  https://pokeapi.co/api/v2/type/{id or name}/  search for type
'use strict';
let pokemonCollection = [];

const getData = async (link) => {
  const response = await fetch(link);
  if (response.status !== 200) {
    throw new Error("link doesn't Found");
  }
  const data = await response.json();
  return data;
};

const createPTag = (text, className) => {
  const pTag = document.createElement('p');
  pTag.innerText = text;
  pTag.classList.add(className);
  return pTag;
};

const createImgTag = (url, className, alt) => {
  const imgTag = document.createElement('img');
  imgTag.src = url || './src/images/not-found.jpg';
  imgTag.alt = alt || 'image';
  imgTag.classList.add(className);
  return imgTag;
};

const createDivTag = (classname) => {
  const div = document.createElement('div');
  div.classList.add(classname);
  return div;
};

const createFullDetailsStructure = (details) => {
  const container = createDivTag('full-details');
  const image = createImgTag(details.image, 'full-details-image');
  const fullDetails = createDivTag('details');
  for (let key in details) {
    if (key !== 'image') {
      fullDetails.append(createPTag(`${key} : ${details[key]}`, 'detail'));
    }
  }
  const closeButton = document.createElement('button');
  closeButton.innerText = 'X';
  closeButton.addEventListener('click', (event) => {
    removeElement('.full-details-container');
  });
  container.append(closeButton, image, fullDetails);
  return container;
};

const getWeaknesses = async (types) => {
  const weaknesses = [];
  for (const type of types) {
    const data = await getData(`https://pokeapi.co/api/v2/type/${type.type.name}`);
    const weaknessResults = data.damage_relations.double_damage_from;
    weaknesses.push(weaknessResults.map(type => type.name));
  }
  return weaknesses;
};

const getFullDetails = async (id) => {
  const data = await getData(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const fullDetails = {
    image: data.sprites.other['official-artwork'].front_default,
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map(element => element.type.name),
    abilitys: data.abilities.map(element => element.ability.name),
    weakness: await getWeaknesses(data.types),
    stats: data.stats.map(element => {
      return [element.stat.name + '-' + element.base_stat]
    }),
    moves: data.moves.map(element => element.move.name),
  }
  return fullDetails;
};

const showFullDetails = async (id) => {
  const details = await getFullDetails(id);
  const fullDetailsStructure = createFullDetailsStructure(details);
  const container = createDivTag('full-details-container');
  container.append(fullDetailsStructure);
  document.querySelector('#main').append(container);
  removeElement('#loader-background');
};

const createPokemonCard = (details) => {
  const container = createDivTag('pokemonCard')
  const data = createDivTag('pokemon-details');
  const image = createImgTag(details.image, 'image', details.name);
  const id = createPTag('ID : ' + details.id, 'id');
  const name = createPTag('Name : ' + details.name, 'name');
  const type = createPTag('Type : ' + details.type, 'type');
  data.append(id, name, type);
  container.append(image, data);
  container.addEventListener('click', () => {
    setLoader();
    showFullDetails(details.id);
  });
  return container;
};

const search = (value) => {
  const container = document.querySelector('#search-results');
  container.innerText = '';
  const searchResults = pokemonCollection.filter((pokemon) => {
    if (
      pokemon.id.toString().includes(value) ||
      pokemon.name.includes(value) ||
      pokemon.type.toString().includes(value)
    ) {
      return true;
    }
  })
  renderElements(searchResults, '#search-results');
  searchResults.length || (container.innerText = 'No Results Found');
};

const hideElement = (element) => {
  document.querySelector(element).classList.add('hide');
};

const activateSearch = () => {
  const searchBar = document.querySelector('#search-bar');
  searchBar.addEventListener('input', () => {
    document.querySelector('#search-results').classList.remove('hide');
    search(searchBar.value.toLowerCase().trim());
    if (searchBar.value === '') {
      hideElement('#search-results');
    }
  });
};

const showErrorOnScreen = () => {
  const container = createDivTag('error-container');
  document.querySelector('#main')
  const message = createPTag(
    'Something went wrong please try again', 'message'
  );
  const retry = createImgTag('./src/images/retry-logo.jpg', 'retry', 'try again');
  retry.addEventListener('click', () => {
    window.location.reload();
  })
  container.append(message, retry);
  document.querySelector('#main').append(container);
};

const renderElements = (pokemon, parent) => {
  const isArray = Array.isArray(pokemon);
  const container = document.querySelector(parent);
  isArray && pokemon.forEach((pokemonDetails) => {
    container.append(createPokemonCard(pokemonDetails));
  });
  isArray || container.append(createPokemonCard(pokemon));
};

const getPokemonByName = async (name) => {
  return await getData(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
};

const getAllPokemonNames = async () => {
  let pokemonNames;
  const data = await getData(
    'https://pokeapi.co/api/v2/pokemon?limit=1303&offset=0'
  );
  pokemonNames = data.results.map(pokemon => pokemon.name);
  return pokemonNames;
};

const getPokemonCollection = async () => {
  const allPokemonNames = await getAllPokemonNames();
  const fetcingPromises = [];
  for (const pokemonName of allPokemonNames) {
    fetcingPromises.push(getPokemon(pokemonName));
  }
  return Promise.all(fetcingPromises);
};

const getPokemon = async (pokemonName) => {
  const pokemon = await getPokemonByName(pokemonName)
  const details = {
    image: pokemon.sprites.other['official-artwork'].front_default,
    id: pokemon.id,
    name: pokemon.name,
    type: pokemon.types.map(element => element.type.name),
  };
  pokemonCollection.push(details);
};

const createLoader = () => {
  const loaderContainer = document.createElement('div');
  loaderContainer.id = 'loader-background';
  const loader = document.createElement('div');
  loader.id = 'loader';
  loaderContainer.append(loader)
  return loaderContainer;
};

const setLoader = () => {
  const loader = createLoader();
  const main = document.querySelector('#main');
  main.append(loader);
};

const removeElement = (element) => {
  document.querySelector(element).remove();
};

window.onload = () => {
  setLoader();
  getPokemonCollection()
    .then(() => {
      renderElements(pokemonCollection, '#all-pokemons');
      removeElement('#loader-background');
    })
    .catch(() => {
      showErrorOnScreen();
      removeElement('#loader-background');
    });
  activateSearch();
};
