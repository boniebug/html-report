let allPokemons = [];
const fetchPokemonData = async function (loader, pokemonList) {
  loader.style.display = 'block';
  const limit = 100;
  const totalPokemon = 1302;
  let count = 0;
  try {
    while (count < totalPokemon) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${count}`);
      const data = await response.json();
      allPokemons = allPokemons.concat(data.results);
      count += limit;
    }
    const promises = allPokemons.map(async (pokemon) => {
      try {
        const res = await fetch(pokemon.url);        
        const pokeData = await res.json();
        return pokeData;
      } catch (error) {
        console.error(`Error fetching Pokémon details for ${pokemon.name}:`, error);
        return null;
      }
    });
    const pokemons = await Promise.all(promises);    
    const validPokemons = pokemons.filter(pokemon => pokemon !== null);
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
  pokemonList.textContent = '';
  pokemons.forEach((pokemon) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemonBox');
    const pokemonName = document.createElement('h3');
    pokemonName.textContent = pokemon.name;
    pokemonDiv.appendChild(pokemonName);
    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonDiv.appendChild(pokemonImage);
    const pokemonID = document.createElement('p');
    pokemonID.textContent = `ID: ${pokemon.id}`;
    pokemonDiv.appendChild(pokemonID);
    const pokemonTypes = document.createElement('p');
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    pokemonTypes.textContent = `Type: ${types}`;
    pokemonDiv.appendChild(pokemonTypes);

    pokemonList.appendChild(pokemonDiv);
  });
};

const searchPokemon = function (searchTerm, pokemonList) {
  const filteredPokemons = allPokemons.filter((pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    return pokemon.name.toLowerCase().includes(searchTerm) || 
           pokemon.id.toString() === searchTerm || 
           types.toLowerCase().includes(searchTerm);
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
