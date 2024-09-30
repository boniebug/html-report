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
  const moreDetails = document.createElement('button');
  moreDetails.innerText = 'See for details';
  mainData.appendChild(img);
  mainData.appendChild(nameContainer);
  mainData.appendChild(idContainer);
  mainData.appendChild(typeContainer);
  mainData.appendChild(moreDetails);
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
  try {
    const url = await fetch(element['url']);
    const response = await url.json();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getPokemonData = async (element, counter) => {
  const name = element['name'];
  const url = await getELement(element);
  if(!url) {
    console.log(`skipping the ${name} for causing error`);
    return { image: './src/images/pokeball.png', name, id: counter, type: 'Unknown' };
  }
  const image = url['sprites']['other']['home']['front_default'];
  const id = url['id'];
  const type1 = url['types'][0]['type']['name'];
  const type2 = url['types'][1] ? url['types'][1]['type']['name'] : undefined;
  const type = type2 ? type1 + '/' + type2 : type1;
  return { image, name, id, type ,url};
};

const createPokemonContainer = async (rawPokemonInfo) => {
  const loader = document.querySelector('.loader');
  const array = [];
  let counter = 0;
  for (const element of rawPokemonInfo) {
    counter += 1;
    const pokemonData = await getPokemonData(element, counter);
    if (pokemonData) {
      array.push(pokemonData);
    }
  }
  loader.style.display = 'none';
  pageLoaded = true;
  array.forEach((pokemon) => {
    assignData(pokemon.image, pokemon.name, pokemon.id, pokemon.type);
    pokemonFullData(pokemon['url']);
  });
};

const pokemonFetch =async () => {
  const loader = document.querySelector('.loader');
  const fetchData = await fetch('https://pokeapi.co/api/v2/pokemon/');
  const fetchResult = await fetchData.json();
  createPokemonContainer(fetchResult['results']);
};

const searchPokemon = () => {
  if (pageLoaded) {
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
  }
};

let pageLoaded = false;

window.onload = () => {
  const pokemonSearch = document.querySelector('.searchPokemon');
  pokemonFetch();
  pokemonSearch.addEventListener('input', searchPokemon);
};
