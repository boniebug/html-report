let pokemonList = [];

let fetchPokemonList = async function () {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=448";
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

let fetchPokemonDetails = async function (pokemonUrl) {
  const response = await fetch(pokemonUrl);
  const data = await response.json();
  return data;
};

let initial = async function () {
  const pokemonContainer = document.getElementById("pokemon-container");
  const loadingMessage = document.createElement("div");
  loadingMessage.textContent = "Details are loading, please wait...";
  pokemonContainer.appendChild(loadingMessage);
  const pokemonListRaw = await fetchPokemonList();
  loadingMessage.remove();
  for (const pokemon of pokemonListRaw) {
    const details = await fetchPokemonDetails(pokemon.url);
    pokemonList.push(details);
    const card = createPokemonCard(details);
    pokemonContainer.appendChild(card);
  }
  const searchInput = document.querySelector(".search");
  searchInput.addEventListener("input", filterPokemon);
};

let createPokemonCard = function (details) {
  const card = document.createElement("div");
  card.className = "pokemon-card";
  const img = document.createElement("img");
  img.src = details.sprites.front_default;
  img.alt = details.name;
  const nameDiv = document.createElement("div");
  nameDiv.className = "pokemon-name";
  nameDiv.textContent = details.name;
  const idDiv = document.createElement("div");
  idDiv.className = "pokemon-id";
  idDiv.textContent = `Id:${details.id}`;
  const typeDiv = document.createElement("div");
  typeDiv.className = "pokemon-type";
  typeDiv.textContent = `Type: ${details.types.map((type) => type.type.name).join(", ")}`;
  card.append(img, nameDiv, idDiv, typeDiv);
  
  return card;
};

let filterPokemon = function () {
  const searchTerm = this.value.toLowerCase();
  const pokemonContainer = document.getElementById("pokemon-container");
  pokemonContainer.innerHTML = "";
  const loadingMessage = document.createElement("div");
  loadingMessage.textContent = "Filtering results...";
  pokemonContainer.appendChild(loadingMessage);
  const filteredPokemon = pokemonList.filter(details => {
    const nameMatch = details.name.toLowerCase().includes(searchTerm);
    const idMatch = details.id.toString().includes(searchTerm);
    const typeMatch = details.types.some(type => type.type.name.toLowerCase().includes(searchTerm));
    return nameMatch || idMatch || typeMatch;
  });
  filteredPokemon.forEach(details => {
    const card = createPokemonCard(details);
    pokemonContainer.appendChild(card);
  });
  loadingMessage.remove();
};

window.onload = initial;
