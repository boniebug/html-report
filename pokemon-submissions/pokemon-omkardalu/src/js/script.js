// https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0 for all pokemos
// https://pokeapi.co/api/v2/pokemon/ditto search using name

let pokemonCollection = [];

const getData = async (link) => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
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

const removeLoader = () => {
  document.querySelector('#loader-background').remove();
};

const createPTag = (text, className) => {
  const pTag = document.createElement('p');
  pTag.innerText = text;
  pTag.classList.add(className);
  return pTag;
};

const createImgTag = (url, className) => {
  const imgTag = document.createElement('img');
  imgTag.src = url;
  imgTag.classList.add(className);
  return imgTag;
};

const createPokemonCard = (details) => {
  const container = document.createElement('div');
  container.className = 'pokemonCard';
  const image = createImgTag(details.image, 'image');
  const id = createPTag('ID : ' + details.id, 'id');
  const name = createPTag('Name : ' + details.name, 'name');
  const type = createPTag('Type : ' + details.type, 'type');
  container.append(image, id, name, type);
  return container;
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
    'https://pokeapi.co/api/v2/pokemon?limit=1400&offset=0'
  );
  pokemonNames = data.results.map(pokemon => pokemon.name);
  return pokemonNames;
};

const getPokemonCollection = async () => {
  const allPokemonNames = await getAllPokemonNames();
  for (const pokemonName of allPokemonNames) {
    await getPokemonByName(pokemonName).then((pokemon) => {
      const details = {
        image: pokemon.sprites.front_shiny,
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.types.map(element => element.type.name),
      };
      pokemonCollection.push(details);
    });
  }
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

const activateSearch = () => {
  const searchBar = document.querySelector('#search-bar');
  searchBar.addEventListener('input', () => {
    document.querySelector('#search-results').classList.remove('hide');
    search(searchBar.value.toLowerCase().trim());
  });

  searchBar.addEventListener('blur', () => {
    document.querySelector('#search-results').classList.add('hide');
  })
};

window.onload = () => {
  setLoader();
  getPokemonCollection()
    .then(() => {
      renderElements(pokemonCollection, '#all-pokemons');
      removeLoader();
    });
  activateSearch();
};
