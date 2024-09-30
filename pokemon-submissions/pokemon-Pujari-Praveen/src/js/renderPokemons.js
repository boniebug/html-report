const createLoadingPopup = (textMessage, className) => {
  const loaderContainer = createElementAssignClass('div', className);
  const loadingMessage = createElementAssignClass('p', 'loader-popup-message');
  loadingMessage.innerText = textMessage;
  loaderContainer.appendChild(loadingMessage);
  const mainContainer = document.querySelector('.all-pokemons-main-container');
  mainContainer.appendChild(loaderContainer);
  return loaderContainer;
};

const checkMatchings = function (searchText, pokemonInfo) {
  const pokemonProperties = Object.keys(pokemonInfo);
  let pokemonProperty = pokemonProperties[0];
  for (index = 0; index < pokemonProperties.length - 1; index++) {
    if (pokemonInfo[pokemonProperty].match(searchText)) {
      toggleContainer(false, pokemonInfo['pokemonContainer'], 'flex');
      return;
    }
    pokemonProperty = pokemonProperties[index + 1];
  }
  toggleContainer(true, pokemonInfo[pokemonProperty]);
};

const createElementAssignClass = (element, classNames) => {
  const classNamesArr = classNames.split(' ');
  const newElement = document.createElement(element);
  for (const className of classNamesArr) {
    newElement.classList.add(className.toLowerCase());
  }
  return newElement;
};

const setPokemonId = (pokemonAllInfo, pokemonData, pokemonNameHeight) => {
  const pokemonIdPara = createElementAssignClass('p', 'pokemon-id-para');
  const pokemonId = createElementAssignClass('span', 'pokemon-id pokemon-info');
  const defaultText = document.createTextNode('Id:');
  pokemonId.innerText = pokemonData.id;
  pokemonIdPara.append(defaultText, pokemonId);
  pokemonIdPara.style.top = `${pokemonNameHeight}px`;
  pokemonAllInfo.appendChild(pokemonIdPara);
  return pokemonId.innerText.toLowerCase();
};

const setPokemonName = (pokemonAllInfo, pokemonData) => {
  const pokemonName = createElementAssignClass('p', 'pokemon-name pokemon-info');
  pokemonName.innerText = pokemonData.name;
  pokemonAllInfo.appendChild(pokemonName);
  return pokemonName;
};

const setPokemonType = (pokemonAllInfo, pokemonData) => {
  const pokemonTypePara = createElementAssignClass('p', 'pokemon-type-para');
  const pokemonType = createElementAssignClass('span', 'pokemon-type pokemon-info');
  const defaultText = document.createTextNode('Type:');
  const pokemonTypes = [];
  pokemonData.types.forEach(type => pokemonTypes.push(type['type'].name));
  pokemonType.innerText = pokemonTypes.join(', ');
  pokemonTypePara.append(defaultText, pokemonType);
  pokemonAllInfo.appendChild(pokemonTypePara);
  return pokemonType.innerText.toLowerCase();
};

const setPokemonImg = (pokemonContainer, pokemonData) => {
  const pokemonImg = createElementAssignClass('img', 'pokemon-img');
  pokemonImg.src = pokemonData.sprites.other['official-artwork'].front_default || './src/Images/no-image-available.png';
  pokemonImg.alt = 'Image Not Available';
  pokemonContainer.appendChild(pokemonImg);
};

const setPokemonAllInfo = (pokemonContainer, pokemonData) => {
  const pokemonAllInfo = {};
  const pokemonName = setPokemonName(pokemonContainer, pokemonData);
  pokemonAllInfo.pokemonName = pokemonName.innerText.toLowerCase();
  pokemonAllInfo.pokemonId = setPokemonId(pokemonContainer, pokemonData, pokemonName.offsetHeight);
  setPokemonImg(pokemonContainer, pokemonData);
  pokemonAllInfo.pokemonType = setPokemonType(pokemonContainer, pokemonData);
  pokemonAllInfo.pokemonContainer = pokemonContainer;
  return pokemonAllInfo;
};

const createPokemonContainer = () => {
  const allPokemonContainer = document.querySelector('.all-pokemons-container');
  const pokemonContainer = createElementAssignClass('div', 'pokemon-container');
  allPokemonContainer.appendChild(pokemonContainer);
  return pokemonContainer;
};

const toggleContainer = (isRendered, container, style) => {
  const visibleStatus = isRendered ? 'none' : style;
  container.style.cssText = `display: ${visibleStatus}`;
};

const setPokemonStats = (pokemonSideBanner, pokemonData) => {
  const pokemonStatsContainer = createElementAssignClass('div', 'pokemon-stats-container');
  pokemonData.stats.forEach(statsInfo => {
    const pokemonStatPara = createElementAssignClass('p', 'pokemon-stat');
    const statFactor = createElementAssignClass('span', 'stat-factor');
    const statFactorValue = createElementAssignClass('span', 'stat-factor-value');
    statFactor.innerText = statsInfo.stat.name;
    statFactorValue.innerText = statsInfo.base_stat;
    pokemonStatPara.append(statFactor, statFactorValue);
    pokemonStatsContainer.appendChild(pokemonStatPara);
  });
  pokemonSideBanner.appendChild(pokemonStatsContainer);
};

const setPokemonMoves = (pokemonSideBanner, pokemonData) => {
  const pokemonMovesDetails = createElementAssignClass('details', 'pokemon-info moves');
  const pokemonMovesSummary = document.createElement('summary');
  pokemonMovesSummary.innerText = 'Moves';
  const pokemonMoves = createElementAssignClass('ul', 'pokemon-info pokemon-moves-list');
  pokemonData.moves.forEach(moveInfo => {
    const newMoveListItem = createElementAssignClass('li', 'pokemon-move');
    pokemonMoves.appendChild(newMoveListItem);
    newMoveListItem.innerText = moveInfo['move'].name;
  });
  pokemonMovesDetails.append(pokemonMovesSummary, pokemonMoves);
  pokemonSideBanner.appendChild(pokemonMovesDetails);
};

const setNormalAbilities = (normalAbilitiesArr) => {
  const normalAbilityDetails = createElementAssignClass('p', 'normal-ability-para');
  const defaultNoramlAbilityText = document.createTextNode('Noraml Abilities:');
  const normalAbilities = createElementAssignClass('span', 'pokemon-ability');
  normalAbilityDetails.append(defaultNoramlAbilityText, normalAbilities);
  normalAbilities.innerText = normalAbilitiesArr.join(', ');
  return normalAbilityDetails;
};

const setHiddenAbilities = (hiddenAbilitiesArr) => {
  const hiddenAbilityDetails = createElementAssignClass('p', 'normal-ability-para');
  const defaultHiddenAbilityText = document.createTextNode('Hidden Abilities:');
  const hiddenAbilities = createElementAssignClass('span', 'pokemon-ability');
  hiddenAbilityDetails.append(defaultHiddenAbilityText, hiddenAbilities);
  hiddenAbilities.innerText = hiddenAbilitiesArr.join(', ');
  return hiddenAbilityDetails;
};

const setPokemonAbilities = (pokemonSideBanner, pokemonData) => {
  const pokemonAbilitiesData = pokemonData.abilities;
  const hiddenAbilitiesArr = [];
  const normalAbilitiesArr = [];
  pokemonAbilitiesData.forEach((abilityInfo) => {
    abilityInfo.is_hidden && normalAbilitiesArr.push(abilityInfo.ability.name);
    !abilityInfo.is_hidden && hiddenAbilitiesArr.push(abilityInfo.ability.name);
  });
  const normalAbilityDetails = setNormalAbilities(normalAbilitiesArr);
  const hiddenAbilityDetails = setHiddenAbilities(hiddenAbilitiesArr);
  pokemonSideBanner.append(normalAbilityDetails, hiddenAbilityDetails);
};

const setPokemonWeight = (pokemonSideBanner, pokemonData) => {
  const weightPara = createElementAssignClass('p', 'weight-para');
  const defaultWeightText = document.createTextNode('Weight:');
  const pokemonWeight = createElementAssignClass('span', 'pokemon-weight pokemon-info');
  pokemonWeight.innerText = pokemonData.weight;
  weightPara.append(defaultWeightText, pokemonWeight);
  pokemonSideBanner.appendChild(weightPara);
};

const setPokemonHeight = (pokemonSideBanner, pokemonData) => {
  const heightPara = createElementAssignClass('p', 'height-para');
  const defaultHeightText = document.createTextNode('Height:');
  const pokemonHeight = createElementAssignClass('span', 'pokemon-height pokemon-info');
  pokemonHeight.innerText = pokemonData.height;
  heightPara.append(defaultHeightText, pokemonHeight);
  pokemonSideBanner.appendChild(heightPara);
};

const createPokemonSideBanner = (pokemonInfo, pokemonData) => {
  const pokemonSideBanner = pokemonInfo.pokemonContainer.cloneNode(true);
  pokemonSideBanner.classList.remove('pokemon-container');
  pokemonSideBanner.classList.add('pokemon-side-banner');
  setPokemonHeight(pokemonSideBanner, pokemonData);
  setPokemonWeight(pokemonSideBanner, pokemonData);
  setPokemonAbilities(pokemonSideBanner, pokemonData);
  setPokemonMoves(pokemonSideBanner, pokemonData);
  setPokemonStats(pokemonSideBanner, pokemonData);
  const allPokemonMainContainer = document.querySelector('.all-pokemons-main-container');
  allPokemonMainContainer.appendChild(pokemonSideBanner);
};

const processPokemonsData = async (pokemonsData, loaderContainer) => {
  const searchBox = document.querySelector('.search-box');
  for (const pokemon of pokemonsData) {
    const pokemonData = await fetchPokemonsData(pokemon.url);
    const pokemonContainer = pokemonData && createPokemonContainer();
    const pokemonInfo = pokemonData && setPokemonAllInfo(pokemonContainer, pokemonData);
    pokemonData && pokemonContainer.addEventListener('click', () => createPokemonSideBanner(pokemonInfo, pokemonData));
    const searchText = pokemonData && searchBox.value.toLowerCase();
    searchText && checkMatchings(searchText, pokemonInfo);
  }
  toggleContainer(true, loaderContainer);
};
