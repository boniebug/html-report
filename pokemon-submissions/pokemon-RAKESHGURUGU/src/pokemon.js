const renderPokemon = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1302');
  const result = await response.json();
  for (let index = 0; index < result.results.length; index++) {
    try {
      const link = await fetch(result.results[index].url);
      const info = await link.json();
      if (info.sprites.front_default) {
        createContainers(info.name, info.id, info.sprites.front_default, info.types);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const createContainers = (name, id, image, types) => {
  const mainContainer = document.getElementById('pokemons');
  const container = document.createElement('div');
  container.className = 'pokemonInfo';
  const infoContainer = document.createElement('div');
  const readMoreInfo = document.createElement('div');
  infoContainer.className = 'infoContainer';
  readMoreInfo.className = 'readMoreInfo';
  mainContainer.appendChild(container);
  container.appendChild(infoContainer);
  container.appendChild(readMoreInfo);
  readMoreInfo.innerText = 'Read more...';
  renderPokemonNameAndId(infoContainer, name, id, image, types);
};

const renderPokemonNameAndId = (container, name, id, image, types) => {
  const printName = document.createElement('p');
  const printId = document.createElement('p');
  printId.className = 'pokemonId';
  printName.className = 'pokemonName';
  printId.innerText = `Id : ${id}`;
  printName.innerText = `Name : ${name}`;
  container.appendChild(printName);
  container.appendChild(printId);
  renderPokemonImg(container, image, types);
};

const renderPokemonImg = (container, image, types) => {
  const printImg = document.createElement('img');
  printImg.className = 'image';
  printImg.src = image;
  container.appendChild(printImg);
  renderPokemonTypeContainer(container, types);
};

const renderPokemonTypeContainer = (container, types) => {
  const pokemonTypeContainer = document.createElement('p');
  pokemonTypeContainer.className = 'pokemonTypeContainer';
  pokemonTypeContainer.innerText = `Types : `;
  container.appendChild(pokemonTypeContainer);
  const printPokemonList = document.createElement('ol');
  printPokemonList.className = 'printPokemonList';
  pokemonTypeContainer.appendChild(printPokemonList);
  renderPokemonType(types, printPokemonList, container);
};

const renderPokemonType = (types, printPokemonList) => {
  for (let index = 0; index < types.length; index++) {
    if (types[index].type.name !== null || undefined) {
      const PokemonType = document.createElement('li');
      PokemonType.className = 'PokemonType';
      PokemonType.innerText = types[index].type.name;
      printPokemonList.appendChild(PokemonType);
    }
  }
};

const showLoader = async () => {
  const loader = document.createElement('p');
  loader.id = 'loader';
  loader.innerText = 'Page is still loading...(The functionalities are not work until the page loads)';
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(loader);
  await renderPokemon(loader)
    .then(() => { loader.remove() });
};

const callSearch = () => {
  const search = document.getElementById('search');
  const selectOption = document.getElementById('select');
  switch (selectOption.value) {
    case 'all': searchFunctionality(search.value);
      break;
    case 'name': searchByName(search.value);
      break;
    case 'id': searchById(search.value);
      break;
    case 'type': searchByType(search.value);
      break;
    default: break;
  }
};

const searchByName = (value) => {
  const pokemonName = document.getElementsByClassName('pokemonName');
  const container = document.getElementsByClassName('pokemonInfo');
  const searchValue = value.toLowerCase();
  for (let index = 0; index < container.length; index++) {
    const name = pokemonName[index].innerText.toLowerCase();
    if (name.match(searchValue)) {
      container[index].style.display = 'block';
    } else {
      container[index].style.display = 'none';
    }
  }
};

const searchById = (value) => {
  const container = document.getElementsByClassName('pokemonInfo');
  const pokemonId = document.getElementsByClassName('pokemonId');
  const searchValue = value.toLowerCase();
  for (let index = 0; index < container.length; index++) {
    const id = pokemonId[index].innerText.toLowerCase();
    if (id.match(searchValue)) {
      container[index].style.display = 'block';
    } else {
      container[index].style.display = 'none';
    }
  }
};

const searchByType = (value) => {
  const container = document.getElementsByClassName('pokemonInfo');
  const pokemonType = document.getElementsByClassName('printPokemonList');
  const searchValue = value.toLowerCase();
  for (let index = 0; index < container.length; index++) {
    const type = pokemonType[index].innerText.toLowerCase();
    if (type.match(searchValue)) {
      container[index].style.display = 'block';
    } else {
      container[index].style.display = 'none';
    }
  }
};

const searchFunctionality = (value) => {
  const container = document.getElementsByClassName('pokemonInfo');
  const pokemonName = document.getElementsByClassName('pokemonName');
  const pokemonId = document.getElementsByClassName('pokemonId');
  const pokemonType = document.getElementsByClassName('pokemonTypeContainer');
  const searchValue = value.toLowerCase();
  for (let index = 0; index < container.length; index++) {
    const name = pokemonName[index].innerText.toLowerCase();
    const id = pokemonId[index].innerText.toLowerCase();
    const type = pokemonType[index].innerText.toLowerCase();

    if (name.match(searchValue) || id.match(searchValue) || type.match(searchValue)) {
      container[index].style.display = 'block';
    } else {
      container[index].style.display = 'none';
    }
  }
};

const createPopup = (name, id, image, types, height, weight, moves, abilities, stats, weakness) => {
  const pokemons = document.getElementsByClassName('pokemonInfo');
  for (let index = 0; index < pokemons.length; index++) {
    pokemons[index].style.backgroundColor = 'rgba(78, 78, 78, 0.084)';
  }
  const popup = document.createElement('div');
  popup.id = 'pokemonMoreInfo';
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(popup);
  const popupInfo = document.createElement('div');
  popup.appendChild(popupInfo);
  createPopupCloseButton(popup);
  renderPokemonNameAndId(popupInfo, name, id, image, types);
  renderPokemonHeightAndWeight(popupInfo, height, weight, moves, abilities, stats, weakness);
};

const renderPokemonHeightAndWeight = (container, height, weight, moves, abilities, stats, weakness) => {
  const pokemonHeight = document.createElement('p');
  pokemonHeight.className = 'pokemonHeight';
  pokemonHeight.innerText = `Height : ${height / 10}.m`;
  container.appendChild(pokemonHeight);
  const pokemonWeight = document.createElement('p');
  pokemonWeight.className = 'pokemonWeight';
  pokemonWeight.innerText = `Weight : ${weight / 10}.kg`;
  container.appendChild(pokemonWeight);
  renderPokemonMovesContainer(container, moves, abilities, stats, weakness);
};

const renderPokemonMovesContainer = (container, moves, abilities, stats, weakness) => {
  const pokemonTypeContainer = document.createElement('p');
  pokemonTypeContainer.className = 'pokemonMoveContainer';
  pokemonTypeContainer.innerText = `Moves : `;
  container.appendChild(pokemonTypeContainer);
  renderPokemonMove(moves, pokemonTypeContainer, container, abilities, stats, weakness);
};

const renderPokemonMove = (moves, printPokemonList, container, abilities, stats, weakness) => {
  for (let index = 0; index < moves.length; index++) {
    if (moves[index].move.name !== null || undefined) {
      const PokemonType = document.createElement('p');
      PokemonType.className = 'PokemonMove';
      PokemonType.innerText = `${index + 1} : ${moves[index].move.name}`;
      printPokemonList.appendChild(PokemonType);
    }
  }
  renderAbilitiesContainer(container, abilities, stats, weakness);
};

const renderAbilitiesContainer = (container, abilities, stats, weakness) => {
  const pokemonAbilityContainer = document.createElement('p');
  pokemonAbilityContainer.className = 'pokemonMoveContainer';
  pokemonAbilityContainer.innerText = `Abilities : `;
  container.appendChild(pokemonAbilityContainer);
  renderPokemonAbility(pokemonAbilityContainer, container, abilities, stats, weakness);
};

const renderPokemonAbility = (printPokemonList, container, abilities, stats, weakness) => {
  for (let index = 0; index < abilities.length; index++) {
    const PokemonType = document.createElement('p');
    PokemonType.className = 'PokemonMove';
    PokemonType.innerText = `${index + 1} : ${abilities[index].ability.name}`;
    printPokemonList.appendChild(PokemonType);
  }
  renderStatsContainer(container, stats, weakness);
};

const renderStatsContainer = (container, stats, weakness) => {
  const pokemonstatsContainer = document.createElement('p');
  pokemonstatsContainer.className = 'pokemonStatContainer';
  pokemonstatsContainer.innerText = `Stats : `;
  container.appendChild(pokemonstatsContainer);
  renderPokemonStat(pokemonstatsContainer, container, stats, weakness);
};

const renderPokemonStat = (printPokemonList, container, stats, weakness) => {
  for (let index = 0; index < stats.length; index++) {
    const PokemonType = document.createElement('p');
    PokemonType.className = 'PokemonStat';
    PokemonType.innerText = `${index + 1} . ${stats[index].stat.name} : ${stats[index].base_stat}`;
    printPokemonList.appendChild(PokemonType);
  }
  renderWeaknessContainer(container, weakness);
};

const renderWeaknessContainer = (container, weakness) => {
  const pokemonweaknessContainer = document.createElement('p');
  pokemonweaknessContainer.className = 'pokemonweaknessContainer';
  pokemonweaknessContainer.innerText = `Weakness : `;
  container.appendChild(pokemonweaknessContainer);
  renderWeakness(pokemonweaknessContainer, weakness);
};

const renderWeakness = async (printPokemonList, weakness) => {
  for (let index = 0; index < weakness.length; index++) {
    const PokemonType = document.createElement('p');
    PokemonType.className = 'PokemonWeakness';
    const link = await fetch(weakness[index].type.url);
    const info = await link.json();
    const damageFrom = info.damage_relations.double_damage_from;
    for (let i = 0; i < damageFrom.length; i++) {
      PokemonType.innerText = `${i + 1} . ${damageFrom[i].name}`;
      printPokemonList.appendChild(PokemonType);
    }
  }
  renderWeaknessContainer(container, abilities, weakness);
};

const createPopupCloseButton = (popup) => {
  const closeButton = document.createElement('button');
  closeButton.id = 'popCloseButton';
  closeButton.innerText = 'close';
  popup.appendChild(closeButton);
  closeButton.addEventListener('click', closePopup);
};

const closePopup = () => {
  const popup = document.getElementById('pokemonMoreInfo');
  popup.remove();
  const pokemons = document.getElementsByClassName('pokemonInfo');
  for (let index = 0; index < pokemons.length; index++) {
    pokemons[index].style.backgroundColor = 'rgba(255, 255, 255)';
  }
};

const popupFetchDetails = async (index) => {
  const popup = document.getElementById('pokemonMoreInfo');
  if (popup) {
    popup.remove();
  }
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1302');
  const result = await response.json();
  const link = await fetch(result.results[index].url);
  const info = await link.json();
  createPopup(info.name, info.id, info.sprites.front_default, info.types, info.height, info.weight, info.moves, info.abilities, info.stats, info.types);
};

window.onload = async () => {
  await showLoader();
  document.getElementById('select').addEventListener('change', callSearch);
  document.getElementById('search').addEventListener('input', callSearch);
  const readMoreButtons = document.getElementsByClassName('readMoreInfo');
  for (let index = 0; index < readMoreButtons.length; index++) {
    readMoreButtons[index].addEventListener('click', () => popupFetchDetails(index));
  }
};
