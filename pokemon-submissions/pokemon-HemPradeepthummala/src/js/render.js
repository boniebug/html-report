'use strict';

const displayData = (div) => {
  const main = document.getElementById('main-container');
  main.append(div)
};

const appendelementsToDiv = (object,div,elements) =>{
  elements[1].innerText = `Id : ${object.id}`;
  div.setAttribute('id', `poke${object.id}`);
  div.classList.add('div-container');
  div.appendChild(elements[0]);
  div.appendChild(elements[2]);
  div.appendChild(elements[3]);
  div.appendChild(elements[1]);
  displayData(div);
}

const createDiv = (object) => {
  const div = document.createElement('div');
  const image = document.createElement('img');
  image.src = object.image;
  const h3 = document.createElement('h3');
  const id = document.createElement('h4');
  const type = document.createElement('h4');
  type.innerText = 'Type :';
  for (let i of object.type) {
    type.innerText += `${i.toUpperCase()} `;
  }
  h3.innerText = object.name.toUpperCase();
  appendelementsToDiv(object,div,[h3,id,image,type]);
};

const addPokeDataToObject = async (pokemonData,pokeData) => {
  for (let i in pokeData.results) {
    const object = {};
    object.name = (pokeData.results[i].name);
    const pokemon = await (await fetch(pokeData.results[i].url)).json();
    object.id = pokemon.id;
    object.type = [];
    object.image = pokemon.sprites.front_default;
    for (const i of pokemon.types) {
      object.type.push(i.type.name);
    }
    pokemonData.push(object);
  }
}

const getPokeData = async () => {
  const pokemonData = [];
  const pokeData = (await 
  (await 
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
  ).json());
  await addPokeDataToObject(pokemonData,pokeData);
  return pokemonData;
};

const getSearchedDiv = (pokemon) => {
  const searchValue = document.getElementById('search-input').value;
  for (const i of pokemon) {
    for (const j of i.type) {
      if (
        i.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
        i.id == searchValue ||
        j.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      ) {
        document.getElementById(`poke${i.id}`).style.display = '';
        break;
      } else {
        document.getElementById(`poke${i.id}`).style.display = 'none';
      }
    }
  }
};

const load = async () => {
  const pokemon = await getPokeData();
  document.getElementById('load').remove();
  for (const poke in pokemon) {
    createDiv(pokemon[poke]);
  }
  document.getElementById('search-input')
    .addEventListener('input', () => getSearchedDiv(pokemon));
};

window.onload = load();