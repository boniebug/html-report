window.onload = () => {
  loading();
  pokemonFetch();
  search(passElementsToSearch);
};

const loading = () => {
  loadingMessage();
  search(displayPopUp);
}

const loadingMessage = () => {
  const body = document.getElementsByTagName('body')[0];
  const loadingMessage = document.createElement('h2');
  loadingMessage.id = 'loading-message';
  loadingMessage.innerText = 'Loading..';
  body.append(loadingMessage);
};

const removeLoadingAndEvenListnersOfLoading = () => {
  const searchByElement = document.getElementById('searchBy');
  const searchInput = document.getElementById('searchItem');
  searchInput.removeEventListener('input', displayPopUp);
  searchByElement.removeEventListener('change', displayPopUp);
  const loadingMessage = document.getElementById('loading-message');
  if (loadingMessage) {
    loadingMessage.remove();
  }
};

const pokemonFetch = async () => {
  const rootUrl = 'https://pokeapi.co/api/v2/pokemon';
  const main = document.createElement('main');
  try {
    const response = await fetch(`${rootUrl}?limit=100000&offset=0`);
    const pokemons = await response.json();
    await pokemonIterate(pokemons.results, main);
    document.body.append(main);

  } catch (error) {
    console.error(error);
  }
  removeLoadingAndEvenListnersOfLoading();
};

const pokemonIterate = async (pokemons, main) => {
  for (let i = 0; i < pokemons.length; i++) {
    await pokemonDataFetch(pokemons[i].url, main);
  }
};

const createDivAndItsElementsAppendToMain = (main, src, name, id, type, ability, height, weight, moves, states, weekness) => {
  const div = document.createElement('div');
  div.className = 'pokemon-container';
  const img = createImage(src);
  const pokemonName = createDetail(name, 'pokemon-name', 'h1');
  const pokemonId = createDetail(`Id: ${id}`, 'pokemon-id');
  const pokemonType = createDetail(`Type: ${type}`, 'pokemon-type');
  div.addEventListener('click', () => {
    createIndetailContainer(src, name, id, type, ability, height, weight, moves, states, weekness);
  });
  div.append(img, pokemonName, pokemonId, pokemonType);
  main.appendChild(div);
};


const createImage = (src) => {
  const img = document.createElement('img');
  img.src = src || 'https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png';
  img.className = 'pokemon-image';
  return img;
};

const createDetail = (info, className, tag = 'p') => {
  const detail = document.createElement(tag);
  detail.innerText = info;
  detail.className = className;
  return detail;
};

const pokemonDataFetch = async (pokemonUrl, main) => {
  try {
    const response = await fetch(pokemonUrl);
    const pokemonData = await response.json();
    const pokemonName = pokemonData.name;
    const pokemonId = pokemonData.id;
    const pokemonType = pokemonData.types.map(item => item.type.name);
    const pokemonImage = pokemonData.sprites.other.home.front_shiny;
    const pokemonAblities = pokemonData.abilities.map(element => element.ability.name);
    const pokemonHeight = pokemonData.height;
    const pokemonWeight = pokemonData.weight;
    const pokemonMoves = pokemonData.moves.map(element => element.move.name).slice(0, 5);
    const pokemonStats = pokemonData.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`);
    const PokemonWeekness = await Promise.all(
      pokemonData.types.map(element => pokemonWeekNessFetch(element.type.url))
    );
    createDivAndItsElementsAppendToMain(main, pokemonImage, pokemonName, pokemonId, pokemonType, pokemonAblities, pokemonHeight,
      pokemonWeight, pokemonMoves, pokemonStats, PokemonWeekness);
  } catch (error) {
    console.error(error);
  }
};

const pokemonWeekNessFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const PokemonWeakness = data.damage_relations.double_damage_from.map(element => element.name).join(', ');
    return PokemonWeakness;
  } catch (error) {
    console.log(error);
  }
};

const search = (callback) => {
  const searchByElement = document.getElementById('searchBy');
  const searchInput = document.getElementById('searchItem');
  searchInput.addEventListener('input', callback);
  searchByElement.addEventListener('change', callback);
};

const passElementsToSearch = () => {
  const searchByElement = document.getElementById('searchBy');
  const searchInput = document.getElementById('searchItem');
  const searchBy = searchByElement.value;
  const searchText = searchInput.value.toLowerCase();
  filterPokemons(searchBy, searchText);
};

const searchDisplay = (container, searchBy, matchesName, matchesId, matchesType) => {
  if (searchBy === 'all') {
    container.style.display = (matchesName || matchesId || matchesType) ? 'block' : 'none';
  } else if (searchBy === 'name') {
    container.style.display = matchesName ? 'block' : 'none';
  } else if (searchBy === 'id') {
    container.style.display = matchesId ? 'block' : 'none';
  } else if (searchBy === 'type') {
    container.style.display = matchesType ? 'block' : 'none';
  }
  else {
  }
};

const filterPokemons = async (searchBy, searchText) => {
  const pokemonContainers = document.getElementsByClassName('pokemon-container');
  let isFound = false;
  for (let i = 0; i < pokemonContainers.length; i++) {
    const container = pokemonContainers[i];
    const { nameValue, idValue, typeValue } = await pokemonSearchDetails(container);
    const matchesName = nameValue.includes(searchText);
    const matchesId = idValue.includes(searchText);
    const matchesType = typeValue.includes(searchText);
    searchDisplay(container, searchBy, matchesName, matchesId, matchesType);
    if (matchesName || matchesId || matchesType) {
      isFound = true;
    }
  }
  isSearchFound(isFound);
};

const isSearchFound = (isFound) => {
  if (!isFound) {
    displayPopUp('Search results do not match. Please search for something else.', isFound);
  } else {
    const popUpElement = document.getElementById('popup-message');
    if (popUpElement) {
      popUpElement.remove();
    }
  }
};

const pokemonSearchDetails = async (container) => {
  const nameElement = container.getElementsByClassName('pokemon-name')[0];
  const idElement = container.getElementsByClassName('pokemon-id')[0];
  const typeElement = container.getElementsByClassName('pokemon-type')[0];
  const nameValue = nameElement.innerText.toLowerCase();
  const idValue = idElement.innerText.split(': ')[1].toLowerCase();
  const typeValue = typeElement.innerText.split(': ')[1].toLowerCase();
  return { nameValue, idValue, typeValue };
};

const displayPopUp = (popupmessage, forLoading = true) => {
  let popUpElement = document.getElementById('popup-message');

  if (!popUpElement) {
    popUpElement = document.createElement('div');
    popUpElement.id = 'popup-message';
    popUpElement.innerText = popupmessage;
    document.body.appendChild(popUpElement);

    if (forLoading) {
      popUpElement.innerText = 'Pokemons are still loading. Please wait until they load.';
      setTimeout(() => {
        document.body.removeChild(popUpElement);
      }, 2000);
    }
  }
};

const createDetailDiv = () => {
  let detailDiv = document.getElementById('detail-div');

  if (!detailDiv) {
    detailDiv = document.createElement('div');
    detailDiv.id = 'detail-div';
    detailDiv.className = 'detail-div';
    document.body.appendChild(detailDiv);
  } else {
    detailDiv.innerHTML = '';
  }
  return detailDiv;
};

const createIndetailContainer = (src, name, id, type, ability, height, weight, moves, stats, weekness) => {
  const detailDiv = createDetailDiv();
  const img = createImage(src);
  const pokemonName = createDetail(name, 'detail-name', 'h2');
  const pokemonId = createDetail(`ID: ${id}`, 'detail-id');
  const pokemonType = createDetail(`Type: ${type}`, 'detail-type');
  const pokemonAbility = createList(ability, 'Abilities');
  const pokemonHeight = createDetail(`Height: ${height}`, 'detail-height');
  const pokemonWeight = createDetail(`Weight: ${weight}`, 'detail-weight');
  const pokemonMoves = createList(moves, 'Moves');
  const pokemonWeakness = createList(weekness, 'Weakness');
  const pokemonStats = createList(stats, 'Stats');
  const closeButton = createCloseButtonForDetailsDiv();
  detailDiv.appendChild(closeButton);
  closeButton.onclick = () => {
    document.body.removeChild(detailDiv);
  };

  detailDiv.append(img, pokemonName, pokemonId, pokemonType, pokemonHeight, pokemonWeight, pokemonAbility, pokemonMoves, pokemonWeakness, pokemonStats);
};

const createCloseButtonForDetailsDiv = () => {
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button'
  closeButton.innerText = 'X';
  return closeButton;
}
const createList = (element, name) => {
  const listContainer = document.createElement('div');
  const listTitle = document.createElement('h3');
  listTitle.innerText = name;
  listContainer.appendChild(listTitle);

  const ul = document.createElement('ul');
  element.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    ul.appendChild(li);
  });

  listContainer.appendChild(ul);
  return listContainer;
};









