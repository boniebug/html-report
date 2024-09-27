'use strict';

const pokemonNotFound = (pokemonFound) => {
  const noPokemonFoundDiv = document.querySelector('.no-pokemon-found');
  if (pokemonFound) {
    if (noPokemonFoundDiv) {
      noPokemonFoundDiv.remove();
    }
  } else {
    if (!noPokemonFoundDiv) {
      const newNoPokemonFoundDiv = createElementWithClass('div', 'no-pokemon-found');
      const newNoPokemonFoundText = createElementWithClass('h2', '', 'No Pokemons found!!!');
      newNoPokemonFoundDiv.appendChild(newNoPokemonFoundText);
      document.body.appendChild(newNoPokemonFoundDiv);
    }
  }
}

const searchPokemons = () => {
  const searchInput = document.getElementById('searchBar');
  searchInput.addEventListener('click', () => {
    if (document.querySelector('.loading')) {
      const popupDiv = createElementWithClass('div', 'popup');
      const popupText = createElementWithClass('h3', '', 'Please wait while Pokemons are loading...!!!');
      popupDiv.appendChild(popupText);
      document.body.appendChild(popupDiv);

      setTimeout(() => {
        popupDiv.remove();
      }, 2000);
    }
  });

  searchInput.addEventListener('input', () => {
    if (document.querySelector('.loading')) {
      searchInput.value = '';
    } else {
      const searchTerm = searchInput.value.toLowerCase();
      const allPokemons = document.querySelectorAll('.pokemon');

      let pokemonFound = false;
      allPokemons.forEach(pokemon => {
        const pokemonName = pokemon.querySelector('.pokemon-name').innerText.toLowerCase();
        const pokemonId = pokemon.querySelector('.pokemon-id').innerText.toLowerCase();
        const pokemonType = pokemon.querySelector('.pokemon-type').innerText.toLowerCase();

        if (pokemonName.includes(searchTerm) || pokemonId.includes(searchTerm) || pokemonType.includes(searchTerm)) {
          pokemon.style.display = 'block';
          pokemonFound = true;
        } else {
          pokemon.style.display = 'none';
        }
      });
      pokemonNotFound(pokemonFound);
    }
  });
};

const createElementWithClass = (tag, className, textContent = '') => {
  const element = document.createElement(tag);
  element.className = className;
  element.innerText = textContent;
  return element;
};

const fetchPokemonName = (pokemonResults, i) => {
  const name = pokemonResults[i].name;
  return createElementWithClass('h1', 'pokemon-name', `Name: ${name}`);
};

const fetchPokemonImage = (pokemonsDetails) => {
  const pokemonImage = pokemonsDetails.sprites.front_default || 'src/images/pokemon-logo-black-transparent.png';
  const image = createElementWithClass('img', 'pokemon-images');
  image.src = pokemonImage;

  const imageDiv = createElementWithClass('div', 'pokemon-images-div');
  imageDiv.appendChild(image);
  return imageDiv;
};

const fetchPokemonId = (pokemonsDetails) => {
  return createElementWithClass('h3', 'pokemon-id', `Id: ${pokemonsDetails.id}`);
};

const fetchPokemonType = (pokemonsDetails) => {
  let types = '';
  pokemonsDetails.types.forEach((typeInfo, index) => {
    types += typeInfo.type.name;
    if (index < pokemonsDetails.types.length - 1) types += ', ';
  });
  return createElementWithClass('h3', 'pokemon-type', `Type: ${types}`);
};

const displayPokemons = async (pokemonResults) => {
  const main = document.querySelector('#main');
  for (let i = 0; i < pokemonResults.length; i++) {
    const pokemon = createElementWithClass('div', 'pokemon');

    try {
      const response = await fetch(pokemonResults[i].url);
      const pokemonsDetails = await response.json();

      const pokemonName = fetchPokemonName(pokemonResults, i);
      const pokemonType = fetchPokemonType(pokemonsDetails);
      const pokemonId = fetchPokemonId(pokemonsDetails);
      const pokemonImage = fetchPokemonImage(pokemonsDetails);

      pokemon.append(pokemonImage, pokemonName, pokemonId, pokemonType);
      main.appendChild(pokemon);
    } catch (error) {
      console.error(`Error fetching Pokemon details: ${error.message}`);
    }
  }
};

const showLoader = () => {
  const loading = createElementWithClass('div', 'loading');
  const loadingText = createElementWithClass('h1', '', 'Loading Pokemons');
  const loadAnimation = createElementWithClass('p', 'loadAnimation');

  loading.append(loadingText, loadAnimation);
  document.body.appendChild(loading);
};

const hideLoader = () => {
  const loading = document.querySelector('.loading');
  if (loading){
    loading.remove();
  } 
  document.querySelector('#main').style.display = 'flex';
};

const fetchPokemons = async () => {
  try {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    const response = await fetch(apiUrl);
    const pokemonList = await response.json();
    await displayPokemons(pokemonList.results);
  } catch (error) {
    console.error(`Error fetching Pokemon list: ${error.message}`);
  } finally {
    hideLoader();
  }
};

window.onload = () => {
  showLoader();
  fetchPokemons();
  searchPokemons();
};
