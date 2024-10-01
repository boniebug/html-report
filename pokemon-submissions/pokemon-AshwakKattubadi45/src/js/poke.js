let allPokemons = [];

const fetchPokemonData = async function (loader, pokemonList) {
  loader.style.display = 'block';
  try {
    const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
    allPokemons = await response.json();
    loader.style.display = 'none';
    displayPokemon(allPokemons, pokemonList);
  } catch (error) {
    console.log("Error fetching data:", error);
    loader.style.display = 'none';
    pokemonList.textContent = 'Failed to load Pokemon data. Please try again later.';
  }
};

const displayPokemon = function (pokemons, pokemonList) {
  pokemonList.innerHTML = '';
  pokemons.forEach((pokemon) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemonBox');

    const pokemonName = document.createElement('h3');
    pokemonName.textContent = pokemon.name;
    pokemonDiv.appendChild(pokemonName);

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.image;
    pokemonImage.alt = pokemon.name;
    pokemonDiv.appendChild(pokemonImage);

    const pokemonID = document.createElement('p');
    pokemonID.textContent = `ID: ${pokemon.id}`;
    pokemonDiv.appendChild(pokemonID);

    const pokemonTypes = document.createElement('p');
    let types = '';
    pokemon.apiTypes.forEach((typeInfo, index) => {
      types += typeInfo.name;
      if (index < pokemon.apiTypes.length - 1) {
        types += ', ';
      }
    });
    pokemonTypes.textContent = `Type: ${types}`;
    pokemonDiv.appendChild(pokemonTypes);
    
    pokemonList.appendChild(pokemonDiv);
  });
};

const searchPokemon = function (searchTerm, pokemonList) {
  const filteredPokemons = [];
  allPokemons.forEach((pokemon) => {
    let types = '';
    pokemon.apiTypes.forEach((typeInfo, index) => {
      types += typeInfo.name;
      if (index < pokemon.apiTypes.length - 1) {
        types += ', ';
      }
    });

    if (pokemon.name.toLowerCase().includes(searchTerm) || 
        pokemon.id.toString() === searchTerm || 
        types.toLowerCase().includes(searchTerm)) {
      filteredPokemons.push(pokemon);
    }
  });
  
  displayPokemon(filteredPokemons, pokemonList);
};

window.onload = () => {
  const loader = document.getElementById('loader');
  const pokemonList = document.getElementById('pokemonList');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  fetchPokemonData(loader, pokemonList);
  
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    searchPokemon(searchTerm, pokemonList);
  });
  
  searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    searchPokemon(searchTerm, pokemonList);
  });
};
