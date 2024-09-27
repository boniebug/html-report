const getPokemonData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return null;
  }
};

const setupLoader = () => {
  const textMessage = 'Loading....';
  const loaderContainer = createLoadingPopup(textMessage, 'loader-container');
  togglePopup(false, loaderContainer);
  return loaderContainer;
};

const checkMatchings = function (searchText, pokemonsInfoList) {
  for (const pokemonInfo of pokemonsInfoList) {
    const keys = Object.keys(pokemonInfo);
    for (let index = 0; index < keys.length - 1; index++) {
      const key = keys[index];
      if (pokemonInfo[key].match(searchText)) {
        console.log(pokemonInfo['pokemonContainer'])
        pokemonInfo['pokemonContainer'].style.cssText = 'display: flex';
      } else {
        pokemonInfo['pokemonContainer'].style.cssText = 'display: none';
      }
    }
  }
};

const setUpList = (searchBox) => {
  const pokemonsInfoList = [];
  const pokemonsContainer = document.querySelectorAll('.pokemon-container')
  const pokemonsNames = document.querySelectorAll('.pokemon-name');
  const pokemonsTypes = document.querySelectorAll('.pokemon-type');
  const pokemonsIds = document.querySelectorAll('.pokemon-id');
  pokemonsNames.forEach((element, index) => {
    const tempObj = {};
    tempObj.pokemonName = pokemonsNames[index].innerText.toLowerCase();
    tempObj.pokemonType = pokemonsTypes[index].innerText.toLowerCase();
    tempObj.pokemonId = pokemonsIds[index].innerText.toLowerCase();
    tempObj.pokemonContainer = pokemonsContainer[index];
    console.log('ok' + tempObj.pokemonContainer)
    pokemonsInfoList.push(tempObj);
  });
  checkMatchings(searchBox.value.toLowerCase(), pokemonsInfoList);
};

const setEventsForSearchBox = () => {
  const searchBox = document.querySelector('.search-box');
  searchBox.addEventListener('input', () => {
    setUpList(searchBox);
  });
};

const main = async () => {
  setEventsForSearchBox();
  const loaderContainer = setupLoader();
  const initialData = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/?limit=1&&offset=0`);
  const allpokemonsData = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/?limit=${initialData.count}&&offset=0`);
  togglePopup(true, loaderContainer);
  processPokemonData(allpokemonsData.results, loaderContainer);
};

window.onload = main;