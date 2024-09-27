'use strict';

const createImageElement = (image) => {
  const img = document.createElement('img');
  img.src = image ? image : './src/images/pokeball.png';
  return img;
};

const createTextElement = (text, label) => {
  const span = document.createElement('span');
  span.innerText = `${label}: ${text}`;
  return span;
};

const createMainDataContainer = (img, nameContainer, idContainer, typeContainer) => {
  const mainData = document.createElement('section');
  mainData.appendChild(img);
  mainData.appendChild(nameContainer);
  mainData.appendChild(idContainer);
  mainData.appendChild(typeContainer);
  return mainData;
};

const assignData = async (image, name, id, type) => {
  const img = createImageElement(image);
  const nameContainer = createTextElement(name, 'Name');
  const idContainer = createTextElement(id, 'Id');
  const typeContainer = createTextElement(type, 'Type');
  const mainData = createMainDataContainer(img, nameContainer, idContainer, typeContainer);
  const container = document.querySelector('.pokemonData');
  container.appendChild(mainData);
};

const getELement =async (element) => {
    const url = await fetch(element['url']);
    return url.json();
};

const getPokemonData = async (element) => {
  const name = element['name'];
  const url = await getELement(element);
  const image = url['sprites']['front_default'];
  const id = url['id'];
  const type1 = url['types'][0]['type']['name'];
  const type2 = url['types'][1] ? url['types'][1]['type']['name'] : undefined;
  const type = type2 ? type1 + '/' + type2 : type1;
  return { image, name, id, type };
};

const createPokemonContainer = async (rawPokemonInfo) => {
  const allPokemonData = rawPokemonInfo['results'];
  const loader = document.querySelector('.loader');
  let count = 0;
  for (const element of allPokemonData) {
    const pokemonData = await getPokemonData(element);
    assignData(pokemonData.image, pokemonData.name, pokemonData.id, pokemonData.type);
    count++;
    if (count === allPokemonData.length) {
      loader.style.display = 'none';
    }
  }
};

const searchPokemon = () => {
  const pokemonData = document.querySelector('.pokemonData');
  const allDataPokemon = pokemonData.querySelectorAll('section');
  const pokemonSearch = document.querySelector('.searchPokemon').value.toLowerCase();
  allDataPokemon.forEach((pokemon) => {
    const pokemonInfo = pokemon.querySelectorAll('span');
    if (pokemonInfo[0].innerText.toLowerCase().includes(pokemonSearch)) {
      pokemon.style.display = 'flex';
    } else if (pokemonInfo[1].innerText.toLowerCase().includes(pokemonSearch)) {
      pokemon.style.display = 'flex';
    } else if (pokemonInfo[2].innerText.toLowerCase().includes(pokemonSearch)) {
      pokemon.style.display = 'flex';
    } else {
      pokemon.style.display = 'none';
    }
  });
};

const pokemonFetch =async () => {
  const loader = document.querySelector('.loader');
  const fetchData = await fetch('https://pokeapi.co/api/v2/pokemon?limit=358&offset=0');
  const fetchResult = await fetchData.json();
  createPokemonContainer(fetchResult);
  loader.style.display = 'none';
};

window.onload = () => {
  const pokemonSearch = document.querySelector('.searchPokemon');
  pokemonFetch();
  pokemonSearch.addEventListener('input', searchPokemon);
};