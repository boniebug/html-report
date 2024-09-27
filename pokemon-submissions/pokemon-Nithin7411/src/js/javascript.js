"use strict";

const allPokemons = [];

const hideLoader = function () {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
};

const fetchPokeDetails = async function (allPokemons) {
  let url = "https://pokeapi.co/api/v2/pokemon?limit=100";

  await fetchAllPokemons(url, allPokemons);
  console.log(allPokemons);
};

const fetchAllPokemons = async function (url, allPokemons) {
  while (url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      for (let pokemon of data.results) {
        await fetchPokeInfo(pokemon.url, allPokemons);
      }
      url = data.next;
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      break;
    }
  }
    document.getElementById('SearchBox').style.display = 'block';
  hideLoader();
};

const fetchPokeInfo = async function (url, allPokemons) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    allPokemons.push(getData(data));

    displayPokemon(data);
  } catch (error) {
    console.error("Error fetching Pokémon info:", error);
  }
};

const displayPokemon = function (data) {
  const container = document.getElementById("container");
  const pokemon = document.createElement("div");
  pokemon.className = "pokemon";
  data = getData(data);
  appendPokeImage(data, pokemon);
  appendPokeId(data, pokemon);
  appendPokeName(data, pokemon);
  appendPokeType(data, pokemon);

  container.append(pokemon);
};

const getData = function (data) {
  return {
    ImgSrc: data.sprites.front_default,
    id: data.id,
    Name: data.name,
    Types: data.types.map((type) => type.type.name).join(", "),
  };
};

const appendPokeName = function (data, pokemon) {
  const name = document.createElement("div");
  name.innerText = "Name: " + data.Name;
  pokemon.append(name);
};

const appendPokeId = function (data, pokemon) {
  const pokeId = document.createElement("div");
  pokeId.innerText = `ID: ${data.id}`;
  pokemon.append(pokeId);
};

const appendPokeImage = function (data, pokemon) {
  const pokeImg = document.createElement("img");
  pokeImg.src = data.ImgSrc;
  pokemon.append(pokeImg);
};

const appendPokeType = function (data, pokemon) {
  const types = document.createElement("div");
  types.innerText = "Types: " + data.Types;
  pokemon.append(types);
};

fetchPokeDetails(allPokemons);
