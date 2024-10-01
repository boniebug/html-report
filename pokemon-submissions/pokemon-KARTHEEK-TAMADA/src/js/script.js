let pokemonList = [];

let fetchPokemonList = async function () {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1032';
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

let fetchPokemonDetails = async function (pokemonUrl) {
  const response = await fetch(pokemonUrl);
  const data = await response.json();
  return data;
};

let fetchTypeWeaknesses = async function (typeUrl) {
  const response = await fetch(typeUrl);
  const data = await response.json();
  return data.damage_relations;
};

let initial = async function () {
  const pokemonContainer = document.getElementById('pokemon-container');
  const loadingMessage = document.createElement('div');
  loadingMessage.textContent = 'Pokemons are loading, please wait...';
  pokemonContainer.appendChild(loadingMessage);
  const pokemonListRaw = await fetchPokemonList();
  const promises = pokemonListRaw.map(async (pokemon) => {
    const details = await fetchPokemonDetails(pokemon.url);
    const weaknesses = await Promise.all(
      details.types.map((type) => fetchTypeWeaknesses(type.type.url))
    );
    const combinedWeaknesses = {};
    weaknesses.forEach((weakness) => {
      weakness.double_damage_from.forEach((type) => {
        combinedWeaknesses[type.name] = (combinedWeaknesses[type.name] || 0) + 1;
      });
    });
    details.weaknesses = Object.keys(combinedWeaknesses);
    return details;
  });
  pokemonList = await Promise.all(promises);
  pokemonList.forEach((details) => {
    const card = createPokemonCard(details);
    pokemonContainer.appendChild(card);
  });
  loadingMessage.remove();
  const searchInput = document.querySelector('.search');
  searchInput.addEventListener('input', filterPokemon);
};

let createPokemonCard = function (details) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  const img = document.createElement('img');
  img.src = details.sprites.front_default;
  img.alt = details.name;
  const nameDiv = document.createElement('div');
  nameDiv.className = 'pokemon-name';
  nameDiv.textContent = `${details.name}`;
  const idDiv = document.createElement('div');
  idDiv.className = 'pokemon-id';
  idDiv.textContent = `Id: ${details.id}`;
  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'More Details';
  detailsButton.onclick = () => showDetailsPopup(details);
  card.append(img, nameDiv, idDiv, detailsButton);
  return card;
};

let showDetailsPopup = function (details) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  const content = document.createElement('div');
  content.className = 'popup-content';
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.onclick = () => {
    document.body.removeChild(popup);
  };
  const nameHeader = document.createElement('h2');
  nameHeader.textContent = details.name;
  const idParagraph = document.createElement('p');
  idParagraph.textContent = `Id: ${details.id}`;
  const typesParagraph = document.createElement('p');
  typesParagraph.textContent = `Types: ${details.types
    .map((type) => type.type.name)
    .join(', ')}`;
  const heightParagraph = document.createElement('p');
  heightParagraph.textContent = `Height: ${details.height / 10} m`;
  const weightParagraph = document.createElement('p');
  weightParagraph.textContent = `Weight: ${details.weight / 10} kg`;
  const movesParagraph = document.createElement('p');
  movesParagraph.textContent = `Moves: ${
    details.moves
      .slice(0, 5)
      .map((move) => move.move.name)
      .join(', ') || 'None'
  }`;
  const abilitiesParagraph = document.createElement('p');
  abilitiesParagraph.textContent = `Abilities: ${
    details.abilities.map((ability) => ability.ability.name).join(', ') ||
    'None'
  }`;
  const statsParagraph = document.createElement('p');
  statsParagraph.textContent = `Statistics: ${details.stats
    .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
    .join(', ')}`;
  const weaknessesParagraph = document.createElement('p');
  weaknessesParagraph.textContent = `Weaknesses: ${
    details.weaknesses.join(', ') || 'None'
  }`;
  content.append(nameHeader, idParagraph, typesParagraph, heightParagraph, weightParagraph, movesParagraph, abilitiesParagraph, statsParagraph, weaknessesParagraph, closeButton);
  popup.appendChild(content);
  document.body.appendChild(popup);
};

let filterPokemon = function () {
  const searchTerm = this.value.toLowerCase();
  const pokemonContainer = document.getElementById('pokemon-container');
  pokemonContainer.innerHTML = '';
  const loadingMessage = document.createElement('div');
  loadingMessage.textContent = 'Filtering results...';
  pokemonContainer.appendChild(loadingMessage);
  const filteredPokemon = pokemonList.filter((details) => {
    const nameMatch = details.name.toLowerCase().includes(searchTerm);
    const idMatch = details.id.toString().includes(searchTerm);
    const typeMatch = details.types.some((type) =>
      type.type.name.toLowerCase().includes(searchTerm)
    );
    return nameMatch || idMatch || typeMatch;
  });
  filteredPokemon.forEach((details) => {
    const card = createPokemonCard(details);
    pokemonContainer.appendChild(card);
  });
  loadingMessage.remove();
};

window.onload = initial;
