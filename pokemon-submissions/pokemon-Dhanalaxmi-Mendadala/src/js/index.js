const allData = [];
let isResolved = false;
const fetchPokemonData = async () => {
  try {
    const fetchData = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0');
    const pokemonsData = await fetchData.json();
    const pokemons = pokemonsData.results;
    return fetchEachPokemon(pokemons);
  } catch (error) {
    console.log(error);
  }
};

const fetchEachPokemon = async (pokemons) => {
  for (let index = 0; index < pokemons.length; index++) {
    try {
      const response = await fetch(pokemons[index].url);
      const data = await response.json();
      pushData(data, pokemons[index].url, index);
    } catch { }
  }
  isResolved = true;
  return allData;
};

const pushData = (object, pokemonUrl, index) => {
  allData.push({
    indexInArray: index,
    url: pokemonUrl,
    name: object.name || 'pokemon',
    id: object.id || 'id not exist',
    image: object.sprites.front_default || './src/images/default.png',
    type: object.types[0].type.name || 'normal',
    height: object.height,
    weight: object.weight,
    moves: object.moves,
    weakness: object.types[0].type.url || 'normal',
    statistics: object.stats,
    abilities: object.abilities,
    views: object.sprites,
  });
};
const closePokemonDiv = () => {
  document.getElementById('pokemon').style.display = 'none';
  document.getElementById('main').style.display = 'flex';
};
const displayPokemonSection = (pokemon) => {
  const section = document.getElementById('pokemon');
  section.querySelector('#name').innerText = pokemon.name;
  section.querySelector('#pokemonImage').src = pokemon.image;
  section.querySelector('#pokemonId').innerText = pokemon.id;
  section.querySelector('#pokemonType').innerText = pokemon.type;
  section.querySelector('#pokemonHeight').innerText = pokemon.height;
  section.querySelector('#pokemonWeight').innerText = pokemon.weight;
  addMovesData(section, pokemon);
  addAbilitesData(section, pokemon);
  addStatisticsData(section, pokemon);
  addWeaknessData(section, pokemon);
  document.getElementById('pokemon').style.display = 'block';
};

const addMovesData = (section, pokemon) => {
  let moves = '';
  for (const object of pokemon.moves) {
    moves += `${object.move.name},`;
  }
  section.querySelector('#moves').innerText = moves;
};

const addAbilitesData = (section, pokemon) => {
  let abilities = '';
  for (const object of pokemon.abilities) {
    abilities += `${object.ability.name},`;
  }
  section.querySelector('#abilities').innerText = abilities;
};

const addStatisticsData = (section, pokemon) => {
  const statisticsElement = section.querySelector('#stats');
  const list = document.createElement('ul');
  let statistics = '';
  for (const object of pokemon.statistics) {
    statistics += `<li>${object.stat.name}:${object.base_stat}</li>`;
  }
  list.innerHTML = statistics;
  statisticsElement.append(list);
};

const addWeaknessData = async (section, pokemon) => {
  let weakness = 'Fighting and Bug Attacks';
  if (pokemon.weakness !== 'normal') {
    try {
      const response = await fetch(pokemon.weakness);
      const data = response.json();
      weakness = '';
      for (const weak of data.damage_relations.double_damage_from) {
        weakness += weak.name;
      }
    section.querySelector('#weakness').innerText;
    } catch { }
  } else {
    section.querySelector('#weakness').innerText = weakness;
  }
};

const addbutton = (button) => {
  button.addEventListener('click', (event) => {
    document.getElementById('main').style.display = 'none';
    displayPokemonSection(allData[event.target.id]);
  });
};

const createAndAppendDiv = (pokemon) => {
  const main = document.getElementById('main');
  const div = document.createElement('div');
  div.classList.add('pokemon');
  const [image, name, type, id, button] = [document.createElement('img'),
  document.createElement('h2'), document.createElement('h5'),
  document.createElement('h5'), document.createElement('button')];
  image.src = pokemon.image;
  name.innerText = pokemon.name;
  div.id = pokemon.id;
  id.innerText = `Pokemon Id: ${pokemon.id}`;
  type.innerText = `Pokemon Type: ${pokemon.type}`;
  button.innerText = 'Know about me';
  button.id = pokemon.indexInArray;
  addbutton(button);
  div.append(name, image, id, type, button);
  main.append(div);
};

const renderPokemons = async () => {
  const pokemons = await fetchPokemonData();
  if (isResolved) {
    document.getElementById('loader').remove();
    document.getElementById('popUpBox').remove();
  }
  for (const pokemon of pokemons) {
    createAndAppendDiv(pokemon);
  }
};

const search = () => {
  const input = document.getElementById('search').value.toLowerCase();
  allData.forEach((element) => {
    const pokemonDiv = document.getElementById(element.id);
    pokemonDiv.hidden = !(Object.values(element).some((eachData) => {
      return eachData.toString().includes(input);
    }));
  });
};

const setLoader = async () => {
  const main = document.getElementById('main');
  const loaderBox = document.createElement('div');
  const loader = document.createElement('div');
  const text = document.createElement('h2');
  loaderBox.id = 'loader';
  text.innerText = 'Loading....';
  loaderBox.append(loader, text);
  addPopUpBox();
  main.append(loaderBox);
};

const addPopUpBox = async () => {
  const box = document.createElement('div');
  box.innerHTML = 'Please Wait.. we are making your pokemon universe';
  box.id = 'popUpBox';
  document.getElementById('main').append(box);
  document.getElementById('search').addEventListener('input', () => {
    if (!isResolved) {
      document.getElementById('popUpBox').style.display = 'block';
      setTimeout(() => {
        document.getElementById('popUpBox').style.display = 'none';
      }, 1000);
    } else {
      search();
    }
  });
};

window.onload = async () => {
  setLoader();
  renderPokemons();
};
