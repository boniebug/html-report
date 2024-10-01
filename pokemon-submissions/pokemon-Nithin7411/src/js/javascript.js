"use strict";

const allPokemons = [];
const hideLoader = function () {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
};

const fetchPokeDetails = async function (allPokemons) {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100";
  await fetchAllPokemons(url, allPokemons);
  hideLoader();
  document.getElementById("container").style.display = "flex";
  document.getElementById("SearchBox").style.display = "block";
};

const fetchAllPokemons = async function (url, allPokemons) {
  while (url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      for (const pokemon of data.results) {
        await fetchPokeInfo(pokemon.url, allPokemons, data.count);
      }
      url = data.next;
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      break;
    }
  }
};

const fetchPokeInfo = async function (url, allPokemons, totalCount) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const weaknessTypes = await fetchWeaknessTypes(data);
    console.log(weaknessTypes);
    const pokeStatitics = pokeStats(data);
    const pokemonData = getData(data, weaknessTypes, pokeStatitics);
    allPokemons.push(pokemonData);

    textOnLoader(allPokemons.length, totalCount);
    displayPokemon(pokemonData);
  } catch (error) {
    console.error("Error fetching Pokemon info:", error);
  }
};

const displayPokemon = function (data) {
  const poke = document.createElement("div");
  poke.classList.add("poke");

  const pokemon = appendPokemon(data);
  const expander = appendExpander(data);
  poke.append(pokemon);
  poke.append(expander);

  document.getElementById("container").append(poke);
};
const appendPokemon = function (data) {
  const pokemon = document.createElement("div");
  pokemon.className = "pokemon";
  appendPokeImage(data, pokemon);
  appendPokeId(data, pokemon);
  appendPokeName(data, pokemon);
  appendPokeType(data, pokemon);
  return pokemon;
};

const getData = function (data, weaknessTypes, pokeStatitics) {
  return dataOfPoke(data, weaknessTypes, pokeStatitics);
};

const dataOfPoke = function (data, weaknessTypes, pokeStatitics) {
  return {
    ImgSrc: data.sprites.other["official-artwork"].front_default,
    id: data.id,
    Name: data.name,
    Types: data.types.map((type) => type.type.name).join(", "),
    height: data.height,
    weight: data.weight,
    EXP: data.base_experience,
    moves: data.moves.map((move) => move.move.name),
    abilities: data.abilities.map((ability) => ability.ability.name),
    stats: pokeStatitics,
    weaknessTypes: weaknessTypes,
  };
};

const pokeStats = function (data) {
  const stats = data.stats.map((stat) => ({
    name: stat.stat.name,
    base_stat: stat.base_stat,
  }));
  return stats;
};

const textOnLoader = function (pokeCount, totalCount) {
  const percent = ((pokeCount / totalCount) * 100).toFixed(2);
  const loaderText = document.getElementsByClassName("loadingText");
  loaderText[0].innerText = `${percent}% is done. Please wait`;
};

const displayDetails = function (data) {
  const detailsHolder = document.getElementById("detailsContainer");
  while (detailsHolder.firstChild) {
    detailsHolder.removeChild(detailsHolder.firstChild);
  }
  appendToDisplayDetails(data, detailsHolder);
};
const fetchWeaknessTypes = async function (data) {
  const weaknessTypes = [];
  const types = data.types.map((type) => type.type.url);
  for (const url of types) {
    try {
      const response = await fetch(url);
      const typeData = await response.json();
      const weaknesses = typeData.damage_relations["double_damage_from"].map(
        (type) => type.name
      );
      weaknessTypes.push(...weaknesses);
    } catch (error) {
      console.error("Error fetching type data:", error);
    }
  }

  return weaknessTypes;
};

fetchPokeDetails(allPokemons);
