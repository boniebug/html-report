let allPokemons = [];

const fetchPokemonData = async function (loader, pokemonList) {
  loader.style.display = 'block';
  const limit = 100;
  const totalPokemon = 1010;
  let count = 0;
  try {
    while (count < totalPokemon) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${count}`);
      const data = await response.json();
      allPokemons = allPokemons.concat(data.results);
      count += limit;
    }
    const promises = [];
    allPokemons.forEach(pokemon => {
      promises.push(
        fetch(pokemon.url)
        .then(res => {
          return res.json();
        })
        .catch(error => {
          console.error(`Error fetching Pokemon details for ${pokemon.name}:`, error);
          return null;
        })
     );
    });
    const pokemons = await Promise.all(promises);
    const validPokemons = [];
    pokemons.forEach(pokemon => {
      if (pokemon !== null) {
        validPokemons.push(pokemon);
      }
    });
    allPokemons = validPokemons; 
    loader.style.display = 'none';
    displayPokemon(allPokemons, pokemonList);
  } catch (error) {
    console.log("Error fetching data:", error);
    loader.style.display = 'none';
    pokemonList.textContent = 'Failed to load Pokémon data. Please try again later.';
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
    pokemonImage.src = pokemon.sprites.other.home.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonDiv.appendChild(pokemonImage);
    const pokemonID = document.createElement('p');
    pokemonID.textContent = `ID: ${pokemon.id}`;
    pokemonDiv.appendChild(pokemonID);
    const pokemonTypes = document.createElement('p');
    let types = '';
    pokemon.types.forEach((typeInfo, index) => {
      types += typeInfo.type.name;
      if (index < pokemon.types.length - 1) {
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
    pokemon.types.forEach((typeInfo, index) => {
      types += typeInfo.type.name;
      if (index < pokemon.types.length - 1) {
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
