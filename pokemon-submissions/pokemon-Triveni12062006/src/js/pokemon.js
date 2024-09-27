const renderPokemonImages = async () => {
  try {
    const imageContainer = document.getElementById('pokemon-image-container');
    const loadingPokemon = document.querySelector('.loadingImages');

    loadingPokemon.style.display = 'block';
    imageContainer.style.display = 'none';
    await new Promise(resolve => setTimeout(resolve, 2000));


    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40');
    const data = await response.json();

    await Promise.all(data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      const pokemonDiv = createPokemonElement(pokemonData);
      imageContainer.appendChild(pokemonDiv);
    }));
    loadingPokemon.style.display = 'none';
    imageContainer.style.display = 'flex';

  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
};

const createPokemonElement = (pokemonData) => {
  const pokemonDiv = document.createElement('div');
  pokemonDiv.classList.add('newPokemonDiv');

  const name = document.createElement('h3');
  name.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

  const image = document.createElement('img');
  image.src = pokemonData.sprites.front_default;

  const id = document.createElement('p');
  id.textContent = `ID: ${pokemonData.id}`;

  const type = document.createElement('p');
  type.textContent = `Type: ${pokemonData.types.map(t => t.type.name).join(', ')}`;

  pokemonDiv.appendChild(name);
  pokemonDiv.appendChild(image);
  pokemonDiv.appendChild(id);
  pokemonDiv.appendChild(type);
  return pokemonDiv;
};
const searchNameIdType = () => {
  const searchInput = document.getElementById('search-bar').toLowerCase();
  const imageContainer = document.getElementById('pokemon-image-container');
  const pokemonDivs = imageContainer.children;
  for (let i = 0; i < pokemonDivs.length; i++) {
    const pokemonDiv = pokemonDivs[i];
    const name = pokemonDiv.querySelector('h3').textContent.toLowerCase();
    const id = pokemonDiv.querySelector('p').textContent.split(':')[1];
    const types = pokemonDiv.querySelector('p:last-of-type').textContent.toLowerCase();
    let matches = false;
    if (name === searchInput) {
      matches = true;
    }
    else if (id === searchInput) {
      matches = true;
    }
    else {
      const typeArray = types.split(', ');
      for (let j = 0; j < typeArray.length; j++) {
        if (typeArray[j] === searchInput) {
          matches = true;
        }
      }
    }
    if (matches) {
      pokemonDiv.style.display = '';
    } else {
      pokemonDiv.style.display = 'none';
    }
  }
};

window.onload = function () {
  renderPokemonImages();
  document.getElementById('search-bar').addEventListener('input', searchNameIdType);
}
