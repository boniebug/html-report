const fetchPokemonData = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
  const options = {
    method: 'GET'
  }
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    let details = {}, pokemonData = {}, array = [];
    for (let element of data.results) {
      details = await fetch(element.url);
      pokemonData = await details.json();
      const pokemonInfo = {
        id: pokemonData.id,
        name: pokemonData.name,
        type: pokemonData.types[0].type.name,
        image: pokemonData.sprites.front_default
      };
      array.push(pokemonInfo);
    }
    return array;
  }
  catch (error) {
    console.error('error at fetching data', error);
  }
};

const addImage = (addImage) => {
  const image = document.createElement('img');
  image.classList.add('image');
  image.src = addImage;
  return image;
};

const addDetial = (label, value) => {
  const pTag = document.createElement('p');
  const spanTag = document.createElement('span');
  pTag.classList.add('details');
  spanTag.classList.add('bold-text');
  spanTag.innerText = label;
  pTag.append(spanTag, value);
  return pTag;
};

const displayPokemonDetails = (pokemonObj) => {
  const container = document.createElement('div');
  container.classList.add('pokemon-details');
  container.id = pokemonObj['name'];

  const pokemonImage = addImage(pokemonObj['image']);
  const pokemonName = addDetial('Name: ', pokemonObj['name']);
  const pokemonType = addDetial('Type: ', pokemonObj['type']);
  const pokemonId = addDetial('Id: ', pokemonObj['id']);

  container.append(pokemonImage, pokemonName, pokemonType, pokemonId)
  return container;
};

const addDetialsToDom = async (pokemons) => {
  const pokemonContainer = document.getElementById('pokemon-container');
  for (const pokemon of pokemons) {
    const pokemonDetial = displayPokemonDetails(pokemon);
    pokemonContainer.appendChild(pokemonDetial);
  }
  return pokemonContainer;
};

const preloading = () => {
  const divForLoading = document.createElement('div');
  const pokemonContainer = document.getElementById('pokemon-container');
  divForLoading.classList.add('preload');
  divForLoading.innerHTML = 'Loading...';
  pokemonContainer.appendChild(divForLoading);
}

const displayPokemonOnSearch = (pokemons) => {
  const input = document.getElementById('search');
  const value = input.value.toLowerCase();
  for (let pokemon of pokemons) {
    const id = pokemon.id.toString();
    if (pokemon.name.includes(value) || pokemon.type.includes(value) || id.includes(value)) {
      const pokemonDetial = document.getElementById(pokemon.name);
      pokemonDetial.style.display = 'block';
    }
    else {
      const pokemonDetial = document.getElementById(pokemon.name);
      pokemonDetial.style.display = 'none';
    }
  }
};

const main = async () => {
  preloading();
  const pokemons = await fetchPokemonData();
  addDetialsToDom(pokemons);
  const preload = document.querySelector('.preload');
  preload.remove();
  const searchPokemon = document.getElementById('search');
  console.log(pokemons);
  searchPokemon.addEventListener('input', () => { displayPokemonOnSearch(pokemons) })
};

window.onload = main;
