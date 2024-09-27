const generatePokemonName = function (aboutPokemonData, dataOfPokemon, i) {
  const pokemonName = document.createElement('h1');
  pokemonName.innerText = dataOfPokemon.results[i].name;
  pokemonName.setAttribute('class', 'pokemonName');
  aboutPokemonData.appendChild(pokemonName);
  return aboutPokemonData;
};

const generatePokemonImageId = function (aboutPokemonData, pokemonData) {
  const pokemonImageId = document.createElement('h2');
  pokemonImageId.innerText = pokemonData.id;
  pokemonImageId.setAttribute('class', 'pokemonImageId');
  aboutPokemonData.appendChild(pokemonImageId);
  return aboutPokemonData;
};

const generatePokemonImage = function (aboutPokemonData, pokemonData) {
  const Image = document.createElement('img');
  Image.src = pokemonData.sprites.front_default;
  Image.setAttribute('class', 'Image');
  aboutPokemonData.appendChild(Image);
  return aboutPokemonData;
};

const generatePokemonType = function (aboutPokemonData, pokemonData) {
  const pokemonType = document.createElement('p');
  pokemonType.innerText = pokemonData.types[0].type.name;
  pokemonType.setAttribute('class', 'pokemonType');
  aboutPokemonData.appendChild(pokemonType);
  return aboutPokemonData;
};

const searchingOfPokemon = function (dataOfPokemons) {
  const searchBarId = document.getElementById('searching');
  searchBarId.addEventListener('input', () => {
    for (let index = 0; index < dataOfPokemons.length; index++) {
      const data = dataOfPokemons[index];
      if (data.innerText.toLowerCase().includes(searchBarId.value)) {
        data.style.display = 'block';
      } else {
        data.style.display = 'none';
      }
    }
  });
};

const searching = function (pokemonContainer) {
  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.className = 'search';
  pokemonContainer.appendChild(searchBar);
  searchBar.placeholder = 'Enter id or name or type of pokemon';
  searchBar.id = 'searching';
  const dataOfPokemons = document.getElementsByClassName('pokemons');
  searchingOfPokemon(dataOfPokemons);
};

const generatePokemonData = function (
  aboutPokemonData,
  dataOfPokemon,
  i,
  pokemonData
) {
  generatePokemonName(aboutPokemonData, dataOfPokemon, i);
  generatePokemonImageId(aboutPokemonData, pokemonData);
  generatePokemonImage(aboutPokemonData, pokemonData);
  generatePokemonType(aboutPokemonData, pokemonData);
  aboutPokemonData.setAttribute('class', 'pokemons');
  pokemonContainer.appendChild(aboutPokemonData);
};

const render = async (pokemonContainer, apiOfPokemon) => {
  try {
    const response = await fetch(apiOfPokemon);
    const dataOfPokemon = await response.json();
    for (let i = 0; i < dataOfPokemon.results.length; i++) {
      const pokemonUrl = dataOfPokemon.results[i].url;
      const pokemonResponse = await fetch(pokemonUrl);
      const pokemonData = await pokemonResponse.json();
      const aboutPokemonData = document.createElement('div');
      generatePokemonData(aboutPokemonData, dataOfPokemon, i, pokemonData);
    }
  } catch (error) {
    console.error('error in fetch', error);
  }
};

const removeLoading = function (pokemonContainer, loading) {
  pokemonContainer.removeChild(loading);
};

window.onload = function () {
  const pokemonContainer = document.getElementById('pokemonContainer');
  const apiOfPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=359&offset=0';
  const loading = document.createElement('h1');
  loading.className = 'loading';
  loading.innerText = 'Loading...';
  pokemonContainer.appendChild(loading);
  setTimeout(() => {
    removeLoading(pokemonContainer, loading);
    render(pokemonContainer, apiOfPokemon);
    searching(pokemonContainer);
  }, 5000);
};
