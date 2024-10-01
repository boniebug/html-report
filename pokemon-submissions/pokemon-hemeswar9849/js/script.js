'use strict';

const getTheData = () => {
  return new Promise(async (resolve) => {
    try {
      const fetchedData = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1032`);
      const resultData = await fetchedData.json();
      resolve(resultData);
    } catch (error) {
      console.log(error);
    }
  });
};

const getTheDetails = (pokemonDetailsLink) => {
  return new Promise(async (resolve) => {
    try {
      const fetchedData = await fetch(pokemonDetailsLink);
      const pokemonDetails = await fetchedData.json();
      resolve(pokemonDetails);
    } catch (error) {
      console.log(error);
    }
  });
};

const captilisingTheFirstLetter = (string) => {
  const firstletter = string.charAt(0).toUpperCase();
  return string.replace(string[0], firstletter);
};

const createAPokemonContainer = () => {
  const pokemonContainer = document.createElement('div');
  pokemonContainer.setAttribute('onclick', 'getMoreDetails(this)');
  pokemonContainer.classList.add('aPokemon');
  return pokemonContainer;
};

const appendPokemonID = (pokemonContainer, pokemonDetails) => {
  const IDh3 = document.createElement('h3');
  IDh3.innerText = pokemonDetails.id;
  IDh3.classList.add('pokemonid', pokemonDetails.id);
  pokemonContainer.appendChild(IDh3);
};

const appendPokemonImage = (pokemonContainer, pokemonDetails) => {
  const pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemonImage');
  if (pokemonDetails.sprites.other.home.front_default !== null) {
    pokemonImage.src = pokemonDetails.sprites.other.home.front_default;
  }
  pokemonImage.alt = pokemonDetails.name;
  pokemonContainer.appendChild(pokemonImage);
};

const appendPokemonName = (pokemonContainer, pokemonDetails) => {
  const pokemonNameh3 = document.createElement('h3');
  pokemonNameh3.classList.add('pokemonName');
  const pokemonName = captilisingTheFirstLetter(pokemonDetails.name);
  pokemonNameh3.innerText = pokemonName;
  pokemonContainer.appendChild(pokemonNameh3);
};

const appendPokemonType = (pokemonContainer, pokemonDetails) => {
  const pokemonTypesh3 = document.createElement('h3');
  pokemonTypesh3.classList.add('pokemonTypes');
  pokemonDetails.types.forEach(type => {
    pokemonTypesh3.innerText = pokemonTypesh3.innerText + `  ${type.type.name}`;
  });
  pokemonContainer.appendChild(pokemonTypesh3);
};

const createAContainer = () => {
  const container = document.createElement('div');
  container.setAttribute('id', 'containers');
  return container;
};

const appendDetailsToPokemonContainer = (pokemon, callback) => {
  const pokemonContainer = callback();
  appendPokemonID(pokemonContainer, pokemon);
  appendPokemonName(pokemonContainer, pokemon);
  appendPokemonImage(pokemonContainer, pokemon);
  appendPokemonType(pokemonContainer, pokemon);

  return pokemonContainer;
};

const createAndAppendLoader = () => {
  const body = document.querySelector('body');
  const divTag = document.createElement('div');
  divTag.classList.add('loading');
  body.appendChild(divTag);
};

const slashremover = (data) => {
  return data.slice(0, data.length - 1);
};

const appendAllPokemonDetailsToDocument = (pokemonContainers) => {
  const main = document.querySelector('main');
  const container = createAContainer();
  pokemonContainers.forEach(pokemonContainer => {
    container.appendChild(pokemonContainer);
  });
  main.appendChild(container);
};

const allPokemonDetails = async () => {
  let pokemonContainers = [];
  const pokemons = await getTheData();
  for (const pokemon of pokemons.results) {
    const pokemonDetails = await getTheDetails(slashremover(pokemon.url));
    pokemonContainers.push(appendDetailsToPokemonContainer(pokemonDetails, createAPokemonContainer));
  }
  appendAllPokemonDetailsToDocument(pokemonContainers);
};

const appendAndRemoveWaitPopup = () => {
  const main = document.querySelector('main');
  const waitPopup = document.createElement('div');
  waitPopup.innerText = `Please wait sometime, while Pokémons are loading`;
  waitPopup.setAttribute('id', 'waitPopup');
  main.appendChild(waitPopup);
  setTimeout(() => {
    waitPopup.remove();
  }, 2000);
}

const searchBarFunctionality = () => {
  const allPokemons = document.querySelectorAll('.aPokemon');
  const searchBar = document.querySelector('#searchBar');
  if (document.querySelector('#containers')) {
    allPokemons.forEach((pokemon) => {
      if (!pokemon.innerText.toUpperCase().includes(searchBar.value.toUpperCase())) {
        pokemon.classList.add('hide');
      } else {
        pokemon.classList.remove('hide');
      }
    });
  } else {
    appendAndRemoveWaitPopup();
  }  
};

  const createSearchBar = () => {
    const searchBar = document.createElement('input');
    searchBar.placeholder = 'Search Here';
    searchBar.setAttribute('id', 'searchBar');

    return searchBar;
  };

  const createSearchButton = () => {
    const searchButton = document.createElement('button');
    searchButton.setAttribute('id', 'searchButton');
    searchButton.setAttribute('onclick', 'searchBarFunctionality()');
    searchButton.innerText = 'Search';

    return searchButton;
  };

  const appendSearchBarAndButton = (header) => {
    const searchBarContainer = document.createElement('div');
    searchBarContainer.setAttribute('id', 'search');
    const searchBar = createSearchBar();
    const searchButton = createSearchButton();

    searchBarContainer.append(searchBar, searchButton);
    header.appendChild(searchBarContainer);
  };

  const appendMainHeading = (header) => {
    const mainHeading = document.createElement('h1');
    mainHeading.innerText = 'Pokédex';
    mainHeading.setAttribute('id', 'mainHeading');
    header.appendChild(mainHeading);
  };

  const appendToHeaders = () => {
    const header = document.querySelector('header');
    appendMainHeading(header);
    appendSearchBarAndButton(header);
  };

  const main = async () => {
    createAndAppendLoader();
    const loader = document.querySelector('.loading');
    appendToHeaders();
    await allPokemonDetails();
    loader.remove();
  };

  window.onload = main;
