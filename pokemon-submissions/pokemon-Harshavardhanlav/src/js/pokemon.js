function fetchUrlData() {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1025';
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
    .then(pokemonData => {
      const types = pokemonData.types.map(eachType => eachType.type.url);
      const final = fetchWeaknessData(types,pokemonData);
    })
    .catch(error => console.error('Error fetching Pokémon details:', error));
}


function fetchWeaknessData(types,pokemonData) {
  const pokemondataOriginals = pokemonData;
  console.log(pokemondataOriginals);
  const typeFetches = types.map(typeUrl => {
    return fetch(typeUrl)
      .then(response => response.json())
      .then(typeData => {
        const weaknesses = typeData.damage_relations.double_damage_from.map(relation => relation.name);
        displayPokemon(weaknesses, pokemondataOriginals);
      });
  });
}

function displayPokemon(weaknesses,pokemondataOriginals) {
  console.log(pokemondataOriginals);
  const pokemonName = pokemondataOriginals.name;
  const pokemonImage = pokemondataOriginals.sprites.front_default;
  const pokemonId = pokemondataOriginals.id;
  const types = pokemondataOriginals.types.map(eachType => eachType.type.name);
  const height = pokemondataOriginals.height;
  const weight = pokemondataOriginals.weight;
  const abilities = pokemondataOriginals.abilities.map(ability => ability.ability.name);
  const stats = pokemondataOriginals.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
  const moves = pokemondataOriginals.moves.map(move => move.move.name).slice(0, 5).join(', ');
  const weakness = weaknesses;
  addingData(pokemonName, pokemonImage, pokemonId, types, height, weight, abilities, stats, moves, weakness);
}

const addingData = function (pokemonName, pokemonImage, pokemonId, types, height, weight, abilities, stats, moves, weakness) {
  const pokemonContainer = document.getElementById('pokemon-container');
  const existingPokemonDiv = document.querySelector(`.newPokemon[data-id='${pokemonId}']`);
  if (existingPokemonDiv) {
    console.log(`Pokemon with ID ${pokemonId} already exists.`);
    return;
  }
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
  newPokemonDiv.setAttribute('data-id', pokemonId);
  newPokemonDiv.pokemonTypes = types;
  newPokemonDiv.addEventListener('click', function () {
    displayPokemonAllDetails(weight, height, weakness, stats, moves, abilities, imageElement, nameElement, idElement, typesElement);
  });

  appendElements(imageElement, nameElement, idElement, typesElement, newPokemonDiv);
};


const displayPokemonAllDetails = function (weight, height, weakness, stats, moves, abilities, imageElement, nameElement, idElement, typesElement) {
  const detailContainer = document.getElementById('detail-container');
  detailContainer.innerHTML = '';
  const displayAllDetails = document.createElement('div');
  displayAllDetails.classList.add('pokemonBigContainer');
  const weightElement = document.createElement('p');
  const heightElement = document.createElement('p');
  const abilitiesElement = document.createElement('p');
  const statsElement = document.createElement('p');
  const movesElement = document.createElement('p');
  const weaknessElement = document.createElement('p');
  weightElement.innerText = `Weight: ${weight}`;
  heightElement.innerText = `Height: ${height}`;
  statsElement.innerText = `Statastics: ${stats}`;
  movesElement.innerText = `Moves: ${moves}`;
  abilitiesElement.innerText = `Abilities: ${abilities}`
  weaknessElement.innerText = `Weakness: ${weakness}`;
  displayAllDetails.appendChild(imageElement.cloneNode(true));
  displayAllDetails.appendChild(nameElement.cloneNode(true));
  displayAllDetails.appendChild(idElement.cloneNode(true));
  displayAllDetails.appendChild(typesElement.cloneNode(true));
  displayAllDetails.appendChild(abilitiesElement);
  displayAllDetails.appendChild(heightElement);
  displayAllDetails.appendChild(weightElement); 
  displayAllDetails.appendChild(statsElement);
  displayAllDetails.appendChild(movesElement);
  displayAllDetails.appendChild(weaknessElement);
  detailContainer.appendChild(displayAllDetails);
  detailContainer.style.display = 'block';
  const pokemonContainer = document.getElementById('pokemon-container');
  pokemonContainer.style.width = '80%';
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
