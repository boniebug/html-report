const fetchPokemonsData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    const pokemonsData = await response.json();
    return pokemonsData;
  } catch (error) {
    if (error.message === 'Unexpected end of JSON input') {
      return null;
    }
    throw error;
  }
};

const setupLoader = () => {
  const textMessage = 'Loading....';
  const loaderContainer = createLoadingPopup(textMessage, 'loader-container');
  toggleContainer(false, loaderContainer, 'block');
  return loaderContainer;
};

const setUpList = (searchText) => {
  const pokemonsContainer = document.querySelectorAll('.pokemon-container')
  const pokemonsNames = document.querySelectorAll('.pokemon-name');
  const pokemonsTypes = document.querySelectorAll('.pokemon-type');
  const pokemonsIds = document.querySelectorAll('.pokemon-id');
  pokemonsContainer.forEach((_, index) => {
    const pokemonInfo = {};
    pokemonInfo.pokemonName = pokemonsNames[index].innerText.toLowerCase();
    pokemonInfo.pokemonType = pokemonsTypes[index].innerText.toLowerCase();
    pokemonInfo.pokemonId = pokemonsIds[index].innerText.toLowerCase();
    pokemonInfo.pokemonContainer = pokemonsContainer[index];
    checkMatchings(searchText, pokemonInfo);
  });
};

const setSearchBoxEvent = () => {
  const searchBox = document.querySelector('.search-box');
  searchBox.addEventListener('input', () => setUpList(searchBox.value.toLowerCase()));
};

const main = async () => {
  const loaderContainer = setupLoader();
  const initialData = await fetchPokemonsData(`https://pokeapi.co/api/v2/pokemon/?limit=1&&offset=0`);
  const allpokemonsData = await fetchPokemonsData(`https://pokeapi.co/api/v2/pokemon/?limit=${initialData.count}&&offset=0`);
  setSearchBoxEvent();
  processPokemonsData(allpokemonsData.results, loaderContainer);
};

window.onload = main;
