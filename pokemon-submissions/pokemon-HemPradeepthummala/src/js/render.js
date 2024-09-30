'use strict';

const displayData = (div) => {
  const main = document.getElementById('main-container');
  main.appendChild(div);
};

const appendelementsToDiv = (div, elements) => {
  elements.forEach((element) => {
    div.appendChild(element);
  });
  displayData(div);
};

const setStats = (stats, statistics,elementsArray) => {
  elementsArray.push(stats);
  const unorderedList = document.createElement('ul');
  statistics.forEach((stat) => {
    const list = document.createElement('li')
    list.innerText += `${stat.name.toUpperCase()},${stat.effort},${stat.base}`;
    unorderedList.appendChild(list);
  });
  elementsArray.push(unorderedList)
};

const elementsData = (element, values, elementsArray) => {
  elementsArray.push(element);
  const unorderedList = document.createElement('ul');
  values.forEach((value) => {
    const list = document.createElement('li');
    list.innerText = value.toUpperCase();
    unorderedList.appendChild(list);
  });
  elementsArray.push(unorderedList)
};


const createClosebutton = () => {
  const button = document.createElement('button');
  button.innerText = 'close';
  button.classList.add('close-button');
  return button;
};

const setbuttonDisability = (disability) => {
  const buttons = document.querySelectorAll('.show-details');
  buttons.forEach((button) => {
    button.disabled = disability;
  });
};

const setTypesAbilitiesMovesStats = (object, elements) => {
  const types = document.createElement('h4');
  const stats = document.createElement('h4');
  const abilities = document.createElement('h4');
  const moves = document.createElement('h4');
  const weakness = document.createElement('h4');
  types.innerText = 'Type: ';
  stats.innerText = 'Statistics: ';
  moves.innerText = 'Moves: '
  abilities.innerText = 'Abilities: ';
  weakness.innerText = 'Weakness: ';
  elementsData(types, object.types, elements);
  elementsData(abilities, object.abilities, elements);
  elementsData(moves, object.moves, elements);
  setStats(stats, object.stats, elements);
  elementsData(weakness, object.weakness, elements);
};

const setNamesPicIdHeightWeight = (object, elements) => {
  const name = document.createElement('h4');
  const pic = document.createElement('img');
  const id = document.createElement('h4');
  const hW = document.createElement('h4');
  pic.src = object.image;
  name.innerText = `${object.name.toUpperCase()}`;
  id.innerText = `Id: ${object.id}`;
  hW.innerText = `Height: ${object.height}\nWeight:${object.weight}`;
  elements.push(name, pic, id, hW);
};

const createDetailsDiv = (object) => {
  setbuttonDisability(true);
  const div = document.createElement('div');
  const closeButton = createClosebutton(div);
  const elements = [];
  setNamesPicIdHeightWeight(object, elements);
  setTypesAbilitiesMovesStats(object, elements);
  div.setAttribute('id', 'pokemon' + object.id);
  closeButton.addEventListener('click', () => {
    div.remove();
    setbuttonDisability(false);
  });
  elements.push(closeButton);
  div.classList.add('details-container');
  appendelementsToDiv(div, elements);
};

const createDiv = (object) => {
  const div = document.createElement('div');
  const image = document.createElement('img');
  const h3 = document.createElement('h3');
  const button = document.createElement('button');
  div.classList.add('div-container');
  button.classList.add('show-details');
  button.innerText = 'Show Details';
  image.src = object.image;
  image.alt = `${object.name}'s image
  has to be displayed`;
  h3.innerText = object.name.toUpperCase();
  div.setAttribute('id', `poke${object.id}`);
  button.addEventListener('click', () => createDetailsDiv(object));
  appendelementsToDiv(div, [h3, image, button]);
};

const setImage = (object, pokemonImage) => {
  object.image = (pokemonImage['official-artwork'].front_default ||
    pokemonImage['official-artwork'].front_shiny);
};

const getAbilities = (abilities, object) => {
  object.abilities = [];
  for (const ability of abilities) {
    object.abilities.push(ability.ability.name);
  }
};

const getMoves = (moves, object) => {
  object.moves = [];
  for (const pokemove of moves) {
    object.moves.push(pokemove.move.name)
  }
};

const getStats = (stats, object) => {
  object.stats = [];
  for (const statistic of stats) {
    const stat = {};
    stat.effort = statistic.effort;
    stat.base = statistic.base_stat;
    stat.name = statistic.stat.name;
    object.stats.push(stat);
  }
};

const getWeakness = (weaknesses, object) => {
  for (const weakness of weaknesses) {
    if (!object.weakness.includes(weakness.name)) {
      object.weakness.push(weakness.name);
    }
  }
};

const getTypes = async (types, object) => {
  object.types = [];
  object.weakness = [];
  for (const type of types) {
    object.types.push(type.type.name);
    const weakness = await (await fetch(`https://pokeapi.co/api/v2/type/${type.type.name}`)).json();
    getWeakness(weakness.damage_relations.double_damage_from, object);
  }
};

const addPokeDataToObject = async (pokemons, pokeData) => {
  for (const pokemonData of pokeData.results) {
    const object = {};
    object.name = (pokemonData.name);
    const pokemon = (await (await fetch(pokemonData.url)).json());
    object.id = pokemon.id;
    object.height = pokemon.height;
    object.weight = pokemon.weight;
    getAbilities(pokemon.abilities, object);
    getMoves(pokemon.moves, object);
    getStats(pokemon.stats, object);
    setImage(object, pokemon.sprites.other);
    await getTypes(pokemon.types, object);
    pokemons.push(object);
  }
};

const getPokeData = async () => {
  const pokemonDetails = [];
  const pokemonsData = (await
    (await
      fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    ).json());
  await addPokeDataToObject(pokemonDetails, pokemonsData);
  return pokemonDetails;
};

const createDivToShowResult = () => {
  const main = document.getElementById('main-container');
  const error = document.createElement('div');
  error.innerText = `NO results found`;
  error.classList.add('results-container');
  main.append(error);
  return error;
};

const CheckWhetherDivIsFound = (isFound, container) => {
  if (!isFound) {
    container.style.display = 'flex';
  } else {
    container.style.display = 'none';
  }
};

const getSearchedDiv = (pokemon, isFound, container) => {
  const searchValue = (document.getElementById('search-input').value).toLowerCase();
  for (const poke of pokemon) {
    for (const type of poke.types) {
      if (poke.name.toLowerCase().startsWith(searchValue) ||
        type.toLowerCase().startsWith(searchValue) ||
        (poke.id.toString()).includes(searchValue)) {
        document.getElementById(`poke${poke.id}`).style.display = '';
        isFound = true;
      } else {
        document.getElementById(`poke${poke.id}`).style.display = 'none';
      }
    }
  }
  CheckWhetherDivIsFound(isFound, container);
};

const displayPopup = () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none'
  }, 1500)
};

const setPopup = () => {
  const searchBox = document.getElementById('search-input');
  searchBox.addEventListener('click', displayPopup);
  return searchBox;
};

const load = async (searchBox) => {
  const pokemons = await getPokeData();
  searchBox.removeEventListener('click', displayPopup)
  document.getElementById('popup').remove();
  document.getElementById('load').remove();
  for (const pokemon of pokemons) {
    createDiv(pokemon);
  }
  const resultContainer = createDivToShowResult();
  document.getElementById('search-input')
    .addEventListener('input', () => {
      getSearchedDiv(pokemons, false, resultContainer);
    });
};

window.onload = () => {
  const searchBox = setPopup();
  load(searchBox);
};
