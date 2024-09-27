const createElementAssignClass = (element, classNames) => {
  const classNamesArr = classNames.split(' ');
  const newElement = document.createElement(element);
  for (const index in classNamesArr) {
    newElement.classList.add(classNamesArr[index].toString());
  }
  return newElement;
};

const setPokemonId = (pokemonInfo, pokemonData) => {
  const pokemonIdPara = createElementAssignClass('p', 'pokemon-id-para');
  const pokemonId = createElementAssignClass('span', 'pokemon-id')
  const defaultText = document.createTextNode('Id:');
  pokemonId.innerText = pokemonData.id;
  pokemonIdPara.append(defaultText, pokemonId);
  pokemonInfo.appendChild(pokemonIdPara);
};

const setPokemonName = (pokemonInfo, pokemonData) => {
  const pokemonNamePara = createElementAssignClass('p', 'pokemon-name-para');
  const pokemonName = createElementAssignClass('span', 'pokemon-name')
  const defaultText = document.createTextNode('Name:');
  pokemonName.innerText = pokemonData.name;
  pokemonNamePara.append(defaultText, pokemonName);
  pokemonInfo.appendChild(pokemonNamePara);
};

const setPokemonType = (pokemonInfo, pokemonData) => {
  const pokemonTypePara = createElementAssignClass('p', 'pokemon-type-para');
  const pokemonType = createElementAssignClass('span', 'pokemon-type')
  const defaultText = document.createTextNode('Type:');
  const pokemonTypes = [];
  pokemonData.types.forEach(type => pokemonTypes.push(type['type'].name));
  pokemonType.innerText = pokemonTypes.join(', ')
  pokemonTypePara.append(defaultText, pokemonType);
  pokemonInfo.appendChild(pokemonTypePara);
};

const setPokemonImg = (pokemonContainer, pokemonData) => {
  const pokemonImg = document.createElement('img');
  pokemonImg.src = pokemonData.sprites.front_default;
  pokemonContainer.appendChild(pokemonImg);
};

const setPokemonInfo = (pokemonContainer, pokemonData) => {
  const pokemonInfo = createElementAssignClass('div', 'pokemon-info');
  pokemonContainer.appendChild(pokemonInfo);
  setPokemonId(pokemonInfo, pokemonData);
  setPokemonName(pokemonInfo, pokemonData);
  setPokemonType(pokemonInfo, pokemonData);
  pokemonContainer.appendChild(pokemonInfo);
};

const createSectionForPokemon = () => {
  const allPokemonContainer = document.querySelector('.all-pokemons-container');
  const pokemonContainer = createElementAssignClass('div', 'pokemon-container');
  allPokemonContainer.appendChild(pokemonContainer);
  return pokemonContainer;
};

const createLoadingPopup = (textMessage, className) => {
  const loaderContainer = createElementAssignClass('div', className);
  const loadingMessage = createElementAssignClass('div', 'loader-popup-message')
  loadingMessage.innerText = textMessage;
  loaderContainer.appendChild(loadingMessage);
  const mainContainer = document.querySelector('.all-pokemons-main-container');
  mainContainer.appendChild(loaderContainer);
  return loaderContainer;
};

const togglePopup = (isRendered, container) => {
  const visibleStatus = isRendered ? 'none' : 'block';
  container.style.cssText = `display: ${visibleStatus}`;
};

const processPokemonData = async (pokemonsData, loaderContainer) => {
  togglePopup(false, loaderContainer);
  for (const pokemon of pokemonsData) {
    const pokemonData = await getPokemonData(pokemon.url);
    const pokemonContainer = pokemonData && createSectionForPokemon();
    pokemonData && setPokemonImg(pokemonContainer, pokemonData);
    pokemonData && setPokemonInfo(pokemonContainer, pokemonData);
  }
  togglePopup(true, loaderContainer);
};

