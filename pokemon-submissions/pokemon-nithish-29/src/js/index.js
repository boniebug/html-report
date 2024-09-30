'use strict';

let allPokemonsData = [];

const onloadPokemons = (displayType) => {
  const loader = document.getElementById('loader');
  loader.style.display = displayType;
};

const insertData = (pokemonDiv, name, image, id, type, details, data) => {
 name.textContent = `${data.name}`;
 image.src = `${data.sprites.other.home.front_default}`;
 id.textContent = `ID: ${data.id}`;
 type.textContent = `TYPE: ${data.types.map(typeInfo => typeInfo.type.name)}`;
 details.textContent = `More`;
 pokemonDiv.appendChild(name);
 pokemonDiv.appendChild(image);
 pokemonDiv.appendChild(id);
 pokemonDiv.appendChild(type);
 pokemonDiv.appendChild(details);
 return pokemonDiv;
};

const createPokemonDiv = async (data) => {
  const container = document.getElementById('allpokemons');
  let pokemonDiv = document.createElement('div');
  const name = document.createElement('h1');
  const image = document.createElement('img');
  const id = document.createElement('h4');
  const type = document.createElement('h4');
  const details = document.createElement('button');
  details.onclick = () => showDetails(data);
  pokemonDiv.className = 'pokemon';
  const appendDiv = await insertData(pokemonDiv, name, image, id, type, details, data);
  container.appendChild(appendDiv);
};

const displayPokemon = async () => {
  for(const pokemon of allPokemonsData) {
    createPokemonDiv(pokemon);
  }
};

const renderPokemonData = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
  }
};

const fetchpokemonData = async (setofPokemons) => {
  const fetchResloved = [];
  for (const pokemon of setofPokemons) {
    const reslove = renderPokemonData(pokemon.name)
    .then(data => allPokemonsData.push(data));
    fetchResloved.push(reslove);
  }
  await Promise.all(fetchResloved);
};


const loadAllPokemonData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  await fetchpokemonData(data.results);
};

const loadPokimons = async () => {
  onloadPokemons('flex');
  await loadAllPokemonData(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1010`);
  await displayPokemon();
  onloadPokemons('none');
  document.getElementById('search').addEventListener('input', setupSearch);
};

window.onload = loadPokimons;
