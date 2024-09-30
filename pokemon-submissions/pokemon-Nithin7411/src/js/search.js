"use strict";

window.onload = function () {
  const inputValue = document.getElementById("SearchBox");

  inputValue.oninput = function () {
    const searchedValue = inputValue.value;
    const result = searchPokemon(searchedValue, allPokemons);
    displaySearchedPokemons(result, searchedValue);
  };
};

const searchPokemon = function (query, allPokemons) {
  query = query.toLowerCase();
  const matchingPokemons = [];
  return searchCondition(query, allPokemons, matchingPokemons);
};

const searchCondition = function (query, allPokemons, matchingPokemons) {
  for (let i = 0; i < allPokemons.length; i++) {
    let pokemon = allPokemons[i];
    let pokeName = pokemon.Name.toLowerCase();
    let pokeTypes = pokemon.Types.toLowerCase();
    let pokeId = pokemon.id.toString();
    if (
      pokeName.includes(query) ||
      pokeTypes.includes(query) ||
      pokeId.includes(query)
    ) {
      matchingPokemons.push(pokemon);
    }
  }
  return matchingPokemons;
};

const displaySearchedPokemons = function (result, searchedValue) {
  const container = document.getElementById("displaySearchedElements");
  container.innerHTML = "";
  document.getElementById("searchTitle").style.display = "block";
  document.getElementById("container").style.display = "none";
  result.forEach((pokemon) => {
    appendSearchedPokemon(pokemon);
  });
  if (!result || searchedValue === "") {
    container.innerHTML = "";
    document.getElementById("container").style.display = "flex";
    document.getElementById("searchTitle").style.display = "none";
  }
};

const appendSearchedPokemon = function (data) {
  const container = document.getElementById("displaySearchedElements");
  const pokemon = document.createElement("div");
  pokemon.className = "pokemon";
  appendPokeImage(data, pokemon);
  appendPokeId(data, pokemon);
  appendPokeName(data, pokemon);
  appendPokeType(data, pokemon);
  container.append(pokemon);
};
