function fetchUrlData() {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=15';
  fetchPokemonList(apiUrl);
}

function fetchPokemonList(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const pokemonPromises = data.results.map(pokemon => fetchPokemonData(pokemon.url));
      return Promise.all(pokemonPromises);
    })
    .then(() => {
      const loading = document.getElementById('loadingLogo');
      loading.style.display = 'none';
    })
    .catch(error => handleFetchError(error));
}

function fetchPokemonData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(pokemonData => displayPokemon(pokemonData))
    .catch(error => console.error('Error fetching Pokémon details:', error));
}

function displayPokemon(pokemonData) {
  console.log(pokemonData)
  const pokemonName = pokemonData.name;
  const pokemonImage = pokemonData.sprites.front_default;
  const pokemonId = pokemonData.id;
  const types = pokemonData.types.map(eachType => eachType.type.name);
  const height = pokemonData.height;
  const weight = pokemonData.weight;
  const abilities = pokemonData.abilities.map(ability => ability.ability.name);
  const stats = pokemonData.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
  const moves = pokemonData.moves.map(move => move.move.name).slice(0, 5).join(', ');
  addingData(pokemonName, pokemonImage, pokemonId, types, height, weight, abilities, stats, moves);
}

const addingData = function (pokemonName, pokemonImage, pokemonId, types, height, weight, abilities, stats, moves) {
  const imageElement = document.createElement('img');
  const nameElement = document.createElement('h1');
  const idElement = document.createElement('p');
  const typesElement = document.createElement('p');

  imageElement.src = pokemonImage;
  nameElement.innerText = `Name: ${pokemonName}`;
  idElement.innerText = `Id: ${pokemonId}`;
  typesElement.innerText = `Type: ${types.join(', ')}`;

  const newPokemonDiv = document.createElement('div');
  newPokemonDiv.classList.add('newPokemon');
  newPokemonDiv.pokemonTypes = types;
  newPokemonDiv.addEventListener('click', function () {
    displayPokemonAllDetails(weight, height, stats, moves, abilities,imageElement, nameElement, idElement, typesElement);
  });

  appendElements(imageElement, nameElement, idElement, typesElement, newPokemonDiv);
};

const displayPokemonAllDetails = function (weight, height, stats, moves, abilities, imageElement, nameElement, idElement, typesElement) {
  const detailContainer = document.getElementById('detail-container');
  detailContainer.innerHTML = '';

  const displayAllDetails = document.createElement('div');
  displayAllDetails.classList.add('pokemonBigContainer');
  const weightElement = document.createElement('p');
  const heightElement = document.createElement('p');
  const abilitiesElement = document.createElement('p');
  const statsElement = document.createElement('p');
  const movesElement = document.createElement('p');
  weightElement.innerText = `Weight: ${weight}`;
  heightElement.innerText = `Height: ${height}`;
  statsElement.innerText = `Statastics: ${stats}`;
  movesElement.innerText = `Moves: ${moves}`;
  abilitiesElement.innerText = `Abilities: ${abilities}`;
  displayAllDetails.appendChild(imageElement.cloneNode(true));
  displayAllDetails.appendChild(nameElement.cloneNode(true));
  displayAllDetails.appendChild(idElement.cloneNode(true));
  displayAllDetails.appendChild(typesElement.cloneNode(true));
  displayAllDetails.appendChild(abilitiesElement);
  displayAllDetails.appendChild(heightElement);
  displayAllDetails.appendChild(weightElement); 
  displayAllDetails.appendChild(statsElement);
  displayAllDetails.appendChild(movesElement);

  detailContainer.appendChild(displayAllDetails);
  detailContainer.style.display = 'block';
  const pokemonContainer = document.getElementById('pokemon-container');
  pokemonContainer.style.filter = 'blur(2px)';
  detailContainer.addEventListener('click', function () {
    detailContainer.style.display = 'none';
    pokemonContainer.style.filter = 'none';
  });
};


const appendElements = function (imageElement, nameElement, idElement, typesElement, newPokemonDiv) {
  const pokemonContainer = document.getElementById('pokemon-container');
  newPokemonDiv.appendChild(imageElement);
  newPokemonDiv.appendChild(nameElement);
  newPokemonDiv.appendChild(idElement);
  newPokemonDiv.appendChild(typesElement);
  pokemonContainer.appendChild(newPokemonDiv);
};

function handleFetchError(error) {
  console.error('Error fetching Pokemon data:', error);
  const pokemonContainer = document.getElementById('pokemon-container');
  pokemonContainer.innerHTML = 'Failed to load data. Please try again later.';
}

const checkingTypes = function (types, searchValue) {
  for (let i = 0; i < types.length; i++) {
    if (types[i].includes(searchValue)) {
      return true;
    }
  }
  return false;
};

window.onload = function () {
  fetchUrlData();
};

const search = document.querySelector('.search-input');
search.addEventListener('input', function () {
  const searchValue = search.value.toLowerCase();
  const pokemonDivs = document.querySelectorAll('.newPokemon');
  pokemonDivs.forEach(pokemonDiv => {
    const pokemonName = pokemonDiv.querySelector('h1').innerText.toLowerCase();
    const pokemonId = pokemonDiv.querySelector('p').innerText.toLowerCase();
    const types = pokemonDiv.pokemonTypes;
    if (pokemonName.includes(searchValue) ||
      pokemonId.includes(`id: ${searchValue}`) ||
      checkingTypes(types, searchValue)) {
      pokemonDiv.style.display = 'block';
    } else {
      pokemonDiv.style.display = 'none';
    }
  });
});
