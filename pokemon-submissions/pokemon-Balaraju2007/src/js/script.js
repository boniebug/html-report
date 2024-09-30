const arrayOfPokemons = [];

const searchPokemons = function () {
  const pokemons = document.querySelectorAll('.pokemon');
  const pokemonData = document.getElementById('search');
  for (const index in arrayOfPokemons) {
    const pokemon = arrayOfPokemons[index]['name'] + arrayOfPokemons[index]['id'] + arrayOfPokemons[index]['type'];
    if (pokemon.toLowerCase().includes(pokemonData.value.toLowerCase())) {
      pokemons[index].style.display = 'block';
    } else {
      pokemons[index].style.display = 'none';
    }
  }
};

const hideLoading = function () {
  const totalPokemons = document.getElementById('pokemons');
  if (totalPokemons.innerText !== '') {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
  }
};

const displayDetails = function (section, pokemonName, pokemonId, pokemonImage, pokemonType, pokemonHeight, pokemonweight) {
  const image = document.createElement('img');
  const name = document.createElement('p');
  const id = document.createElement('p');
  const type = document.createElement('p');
  const height = document.createElement('p');
  const weight = document.createElement('p');
  section.appendChild(image);
  section.appendChild(name);
  section.appendChild(id);
  section.appendChild(type);
  section.appendChild(height);
  section.appendChild(weight);
  image.src = pokemonImage;
  name.innerText = 'name :'+pokemonName;
  id.innerText = 'id :'+pokemonId;
  type.innerText = 'type :'+pokemonType;
  height.innerText = 'height :'+ pokemonHeight;
  weight.innerText = 'weight :'+ pokemonweight;
};

const createAndAppendElements = function (pokemons) {
  const totalPokemons = document.getElementById('pokemons');
  for (let index = 0; index < pokemons.length; index++) {
    const section = document.createElement('section');
    section.className = 'pokemon';
    const name = pokemons[index]['name'];
    const id = pokemons[index]['id'];
    const url = pokemons[index]['imageUrl'];
    const type = pokemons[index]['type'];
    const height = pokemons[index]['height'];
    const weight = pokemons[index]['weight']
    displayDetails(section, name, id, url, type, height, weight);
    const div = document.createElement('div');
    div.className = 'groupPokemonAndButton';
    div.appendChild(section);
    const button = document.createElement('button');
    button.className = 'seeMore';
    button.innerText = 'see more';
    div.appendChild(button);
    totalPokemons.appendChild(div)
  } 
  const buttons = document.querySelectorAll('.seeMore');
  for (let index = 0; index < buttons.length; index++) {
    showPokemonAllDetails(buttons[index]);
  }
};

const fetchStatistics = function (pokemon) {
  const statisticsObject = {};
  const stats = pokemon['stats'];
  const baseStat = [];
  const statName = [];
  for (const index in stats) {
    baseStat.push(stats[index]['base_stat']);
    statName.push(stats[index]['stat']['name'])
  }
  statisticsObject.baseStat = baseStat;
  statisticsObject.statName = statName;
  return statisticsObject;
}

const fetchMove = function (pokemons) {
  const moveObject = {};
  const moves = pokemons['moves'];
  const move = [];
  for (const index in moves) {
    move.push(moves[index]['move']['name']);
  }
  moveObject.name = move;
  return moveObject;
}

const fetchAbility = function (pokemon) {
  const abilitiesObjects = {};
  const abilities = pokemon['abilities'];
  const name = [];
  for (let index in abilities) {
    name.push(abilities[index]['ability']['name']);
  }
  abilitiesObjects.name = name;
  return abilitiesObjects;
}

const fetchEachPokemonDetails = async (pokemonName, pokemonAddress) => {
  const object ={};
  const eachPokemon = await fetch(pokemonAddress);
  try {
    const parseEachPokemon = await eachPokemon.json();
    const pokemonId = parseEachPokemon['id'];
    const pokemonImage = parseEachPokemon['sprites']['other']['home']['front_default'];
    const height = parseEachPokemon['height'];
    const weight = parseEachPokemon['weight'];
    const name = fetchAbility(parseEachPokemon)
    const moves = fetchMove(parseEachPokemon);
    const stats = fetchStatistics(parseEachPokemon);
    let pokemonType1 = parseEachPokemon['types'][0]['type']['name'];
    const pokemonType2 = (parseEachPokemon['types'][1])?parseEachPokemon['types'][1]['type']['name']:undefined;
    if (pokemonType2) {
      pokemonType1 = pokemonType1+' '+pokemonType2;
    }
    object.stats = stats;
    object.moves = moves;
    object.abilities = name;
    object.name = pokemonName;
    object.id = pokemonId;
    object.imageUrl = pokemonImage;
    object.type = pokemonType1;
    object.height = height;
    object.weight = weight;
    return object;
  } catch (a) {
    return false;
  }
};

const fetchPokemon = async () => {
  const totalPokemons = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1032");
  const parsePokemons = await totalPokemons.json();
  const resultsArray = parsePokemons.results;
  for (const element of resultsArray) {
    const pokemonName = element.name;
    const pokemon =await fetchEachPokemonDetails(pokemonName, element.url);
    if (pokemon) {
      arrayOfPokemons.push(pokemon)
    }
  }
   createAndAppendElements(arrayOfPokemons);
   hideLoading();
};

window.onload = function () {
  fetchPokemon();
};

const showPokemonAllDetails = function (buttons) {
  buttons.addEventListener('click', () =>{
  const pokemon = buttons.parentElement;
  const section = pokemon.querySelector('.pokemon');
  if (pokemon.style.backgroundColor === 'white') {
  pokemon.style.width = '100%';
  pokemon.style.backgroundColor = 'aliceblue';
  section.style.height = '50vh';
  } else {
    pokemon.style.backgroundColor = 'white';
    section.style.height = '35vh';
    pokemon.style.width = 'none'
  }
  })
}