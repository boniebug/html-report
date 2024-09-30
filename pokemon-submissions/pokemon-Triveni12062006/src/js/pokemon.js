const renderPokemonImages = async () => {
  try {
    const imageContainer = document.getElementById('pokemonImageContainer');
    const loadingPokemon = document.querySelector('.loadingImages');

    loadingPokemon.style.display = 'block';
    imageContainer.style.display = 'none';
    await new Promise(resolve => setTimeout(resolve, 500))

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const data = await response.json();

    await Promise.all(data.results.map(async (pokemon) => {
      try {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        const pokemonDiv = createPokemonElement(pokemonData);

        pokemonDiv.addEventListener('click', () => {
          imageContainer.style.display = 'none';
          pokemonDetailsContainer.style.display = 'block';
          dispalySinglePokemonDetails(pokemonData);
        });

        imageContainer.appendChild(pokemonDiv);
      }
      catch { }
    }));
    loadingPokemon.style.display = 'none';
    imageContainer.style.display = 'flex';

  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
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
  type.textContent = `Type: ${pokemonData.types.map(eachType => eachType.type.name).join(', ')}`;

  pokemonDiv.appendChild(name);
  pokemonDiv.appendChild(image);
  pokemonDiv.appendChild(id);
  pokemonDiv.appendChild(type);
  return pokemonDiv;

};
const dispalySinglePokemonDetails = (pokemonData) => {
  const detailsContainer = document.getElementById('pokemonDetailsContainer');
  detailsContainer.innerText = '';

  const name = document.createElement('h2');
  name.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

  const image = document.createElement('img');
  image.src = pokemonData.sprites.front_default;

  const id = document.createElement('p');
  id.textContent = `ID: ${pokemonData.id}`;

  const type = document.createElement('p');
  type.textContent = `Type: ${pokemonData.types.map(eachType => eachType.type.name).join(', ')}`;

  const height = document.createElement('p');
  height.textContent = `Height: ${pokemonData.height} m`;

  const weight = document.createElement('p');
  weight.textContent = `Weight: ${pokemonData.weight} kg`;

  const abilities = document.createElement('p');
  abilities.textContent = `Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}`;


  detailsContainer.appendChild(name);
  detailsContainer.appendChild(image);
  detailsContainer.appendChild(id);
  detailsContainer.appendChild(type);
  detailsContainer.appendChild(height);
  detailsContainer.appendChild(weight);
  detailsContainer.appendChild(abilities);
  
  detailsContainer.style.dispaly = 'block';

  detailsContainer.addEventListener('click', () => {
    if (detailsContainer.style.display === 'block') {
      detailsContainer.style.display = 'none';
      document.getElementById('pokemonImageContainer').style.display = 'flex';
    }
  });
};

const searchPokemons = () => {
  const searchBar = document.getElementById('searchBar');

  searchBar.addEventListener('input', (event) => {
    const searchPokemon = event.target.value.toLowerCase();
    filterPokemons(searchPokemon);
  });
};
const filterPokemons = (searchPokemon) => {
  const allPokemons = document.querySelectorAll('.newPokemonDiv');

  allPokemons.forEach(pokemonDiv => {
    const name = pokemonDiv.querySelector('h3').textContent.toLowerCase();
    const id = pokemonDiv.querySelector('p').textContent.toLowerCase();
    const types = pokemonDiv.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
    let matches = false;

    const matchName = name.includes(searchPokemon);
    const matchId = id.includes(searchPokemon);
    const matchType = types.includes(searchPokemon);

    if (matchName || matchId || matchType) {
      matches = true;
    }

    if (matches) {
      pokemonDiv.style.display = '';
    } else {
      pokemonDiv.style.display = 'none';
    }
  });
};

window.onload = function () {
  renderPokemonImages();
  searchPokemons();
};
